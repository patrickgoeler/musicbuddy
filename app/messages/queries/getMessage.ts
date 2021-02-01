import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetMessageInput = Pick<Prisma.MessageFindFirstArgs, "where">

export default async function getMessage({ where }: GetMessageInput, ctx: Ctx) {
    ctx.session.$authorize()

    const message = await db.message.findFirst({ where })

    if (!message) throw new NotFoundError()

    return message
}
