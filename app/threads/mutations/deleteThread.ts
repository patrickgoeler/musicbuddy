import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteThreadInput = Pick<Prisma.ThreadDeleteArgs, "where">

export default async function deleteThread({ where }: DeleteThreadInput, ctx: Ctx) {
    ctx.session.$authorize()

    const thread = await db.thread.delete({ where })

    return thread
}
