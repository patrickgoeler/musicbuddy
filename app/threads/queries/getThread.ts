import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetThreadInput = Pick<Prisma.ThreadFindFirstArgs, "where">

export default async function getThread({ where }: GetThreadInput, ctx: Ctx) {
    ctx.session.$authorize()

    const thread = await db.thread.findFirst({ where })

    if (!thread) throw new NotFoundError()

    return thread
}
