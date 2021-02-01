import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateThreadInput = Pick<Prisma.ThreadUpdateArgs, "where" | "data">

export default async function updateThread({ where, data }: UpdateThreadInput, ctx: Ctx) {
    ctx.session.$authorize()

    const thread = await db.thread.update({ where, data })

    return thread
}
