import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetRequestInput = Pick<Prisma.RequestFindFirstArgs, "where">

export default async function getRequest({ where }: GetRequestInput, ctx: Ctx) {
    ctx.session.$authorize()

    const request = await db.request.findFirst({ where })

    if (!request) throw new NotFoundError()

    return request
}
