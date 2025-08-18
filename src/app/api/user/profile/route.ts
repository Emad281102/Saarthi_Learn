import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

export async function PATCH(req: Request) {
	const session = await auth.api.getSession({ headers: req.headers });
	if (!session) {
		return new Response("Unauthorized", { status: 401 });
	}

	const { role, language } = await req.json();
	await prisma.user.update({
		where: { id: session.user.id },
		data: { role, language },
	});

	return new Response(null, { status: 204 });
}


