import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetThreadInput = Pick<Prisma.ThreadFindFirstArgs, "where">

export default async function getThread({ where }: GetThreadInput, ctx: Ctx) {
    ctx.session.$authorize()

    const thread = await db.thread.findFirst({
        where: {
            ...where,
            OR: [{ userOneId: ctx.session.userId }, { userTwoId: ctx.session.userId }],
        },
        include: { userOne: true, userTwo: true },
    })

    if (!thread) throw new NotFoundError()

    return thread
}
