import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetMessagesInput = Pick<Prisma.MessageFindManyArgs, "where" | "orderBy" | "skip" | "take">

export default async function getMessages(
    { where, orderBy, skip = 0, take }: GetMessagesInput,
    ctx: Ctx,
) {
    ctx.session.$authorize()

    const messages = await db.message.findMany({
        where: {
            ...where,
            OR: [{ recipient: ctx.session.userId }, { sender: ctx.session.userId }],
        },
        orderBy,
        take,
        skip,
    })

    const count = await db.message.count()
    const hasMore = typeof take === "number" ? skip + take < count : false
    const nextPage = hasMore ? { take, skip: skip + take! } : null

    return {
        messages,
        nextPage,
        hasMore,
        count,
    }
}
