import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateMessageInput = Pick<Prisma.MessageUpdateArgs, "where" | "data">

export default async function updateMessage({ where, data }: UpdateMessageInput, ctx: Ctx) {
    ctx.session.$authorize()

    const message = await db.message.update({ where, data })

    return message
}
