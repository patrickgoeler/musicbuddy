import { AuthorizationError, Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteRequestInput = Pick<Prisma.RequestDeleteArgs, "where">

export default async function deleteRequest({ where }: DeleteRequestInput, ctx: Ctx) {
    ctx.session.$authorize()

    // only allow deletion of request that are made to the issueing user
    if (where.fromId_toId?.toId !== ctx.session.userId) {
        throw new AuthorizationError()
    }

    const request = await db.request.delete({
        where,
    })
    return request
}
