import { lucia } from "../../lib/auth"
import { hash } from "@node-rs/argon2"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import type { APIRoute } from "astro";
import { generateIdFromEntropySize } from "lucia";

const usernamePattern = /^(?!.*__)(?!.*_$)(?!^_)[a-zA-Z0-9_]{3,20}(?<!_)$/;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    const formData = await request.formData();
    const username = formData.get("username")?.toString();
    const password= formData.get("password")?.toString();

    // Checks to see if username and password are not empty
    if (!username || !password) {
        return new Response("Missing username or password.", { status: 400 });
    } 

    // Runs the username against the required parameters
    if (!usernamePattern.test(username)) {
        return new Response("Invalid username.", { status: 400 });
    }

    // Checks to see if the password meets requirements
    if ((password.length < 6) || (password.length > 200)) {
        return new Response("Invalid password.", { status: 400 });
    }
    
    // Check if the username already exists
    const existingUser = await prisma.user.findUnique({
        where: {
            username: username,
        }
    });
    
    if (existingUser) {
        return new Response("Invalid username.", { status: 400 });
    }
    
    const userId = generateIdFromEntropySize(10);
    const passwordHash = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        parallelism: 1
    });

    const error = await prisma.user.create({
		data: {
            id: userId,
		    username: username,
		    password_hash: passwordHash
        }
	});

    if (error) {
        return new Response("An unknown error occured.", { status: 500 });
        console.log("unknown error")
    }

    // Sets up cookie for new account and authenticates their session
    const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    console.log("Account registered.")

    return new Response("Account registered.", { status: 201 });
};