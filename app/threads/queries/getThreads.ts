import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetThreadsInput = Pick<Prisma.ThreadFindManyArgs, "where" | "orderBy" | "skip" | "take">

export default async function getThreads(
    { where, orderBy, skip = 0, take }: GetThreadsInput,
    ctx: Ctx,
) {
    ctx.session.$authorize()

    const threads = await db.thread.findMany({
        where: {
            ...where,
            OR: [{ userOneId: ctx.session.userId }, { userTwoId: ctx.session.userId }],
        },
        include: { userOne: true, userTwo: true },
        orderBy,
        take,
        skip,
    })

    const count = await db.thread.count()
    const hasMore = typeof take === "number" ? skip + take < count : false
    const nextPage = hasMore ? { take, skip: skip + take! } : null

    return {
        threads,
        nextPage,
        hasMore,
        count,
    }
}
