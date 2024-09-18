import { lucia } from "../../lib/auth";
import { verify } from "@node-rs/argon2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import type { APIRoute } from "astro";

const usernamePattern = /^(?!.*__)(?!.*_$)(?!^_)[a-zA-Z0-9_]{3,20}(?<!_)$/;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    const formData = await request.formData();
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();

    // Checks to see if username and password are not empty
    if (!username || !password) {
        return new Response("", { status: 400 });
    }

    // Check if the user exists with given credentials
    const existingUser = await prisma.user.findUnique({
        where: {
            username: username,
        }
    });

    if (!existingUser) {
        return new Response("", { status: 400 });
    }

    const validPassword = await verify(existingUser.password_hash, password, {
		memoryCost: 19456,
		timeCost: 2,
		parallelism: 1
	});

	if (!validPassword) {
		return new Response("", { status: 400 })
	}

    // Sets up cookie for new account and authenticates their session
    const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return new Response("", { status: 200 });
};