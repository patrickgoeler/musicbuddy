import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetRequestsInput = Pick<Prisma.RequestFindManyArgs, "where" | "orderBy" | "skip" | "take">

export default async function getRequests(
    { where, orderBy, skip = 0, take }: GetRequestsInput,
    ctx: Ctx,
) {
    ctx.session.$authorize()

    const requests = await db.request.findMany({
        where: { ...where, toId: ctx.session.userId },
        orderBy,
        take,
        skip,
        include: { from: { select: { name: true, age: true } } },
    })

    const count = await db.request.count({ where: { toId: ctx.session.userId } })
    const hasMore = typeof take === "number" ? skip + take < count : false
    const nextPage = hasMore ? { take, skip: skip + take! } : null

    return {
        requests,
        nextPage,
        hasMore,
        count,
    }
}
