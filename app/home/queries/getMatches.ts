import { Ctx } from "blitz"
import db from "db"

export default async function matches(_ = null, ctx: Ctx) {
    ctx.session.$authorize()

    // TODO: Matching algorithm
    const matches = await db.user.findMany({
        select: { name: true, age: true, id: true },
        where: { NOT: { id: ctx.session.userId } },
    })

    return matches
}
