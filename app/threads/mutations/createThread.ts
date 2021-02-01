import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateThreadInput = Pick<Prisma.ThreadCreateArgs, "data">
export default async function createThread({ data }: CreateThreadInput, ctx: Ctx) {
    ctx.session.$authorize()

    const thread = await db.thread.create({ data })

    return thread
}
