import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateMessageInput = Pick<Prisma.MessageCreateArgs, "data">
export default async function createMessage({ data }: CreateMessageInput, ctx: Ctx) {
    ctx.session.$authorize()

    const message = await db.message.create({ data })

    return message
}
