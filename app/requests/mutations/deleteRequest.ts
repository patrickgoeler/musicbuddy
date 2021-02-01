import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteRequestInput = Pick<Prisma.RequestDeleteArgs, "where">

export default async function deleteRequest({ where }: DeleteRequestInput, ctx: Ctx) {
    ctx.session.$authorize()

    const request = await db.request.delete({ where })

    return request
}
