import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateRequestInput = Pick<Prisma.RequestCreateArgs, "data">
export default async function createRequest({ data }: CreateRequestInput, ctx: Ctx) {
    ctx.session.$authorize()

    const request = await db.request.create({ data })

    return request
}
