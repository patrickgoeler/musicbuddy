import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteMessageInput = Pick<Prisma.MessageDeleteArgs, "where">

export default async function deleteMessage({ where }: DeleteMessageInput, ctx: Ctx) {
    ctx.session.$authorize()

    const message = await db.message.delete({ where })

    return message
}
