import { lucia } from "../../lib/auth"

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ locals }) => {
    if (!locals.session) {
		return new Response(null, { status: 401 });
	}

	await lucia.invalidateSession(locals.session.id);

    return new Response("", { status: 200 });
};