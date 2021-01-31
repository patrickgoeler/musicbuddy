import { resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"

export default resolver.pipe(
    resolver.zod(Signup),
    async ({ email, password, name, age, gender, preference, tracks }, ctx) => {
        const hashedPassword = await SecurePassword.hash(password)
        const user = await db.user.create({
            data: {
                email: email.toLowerCase(),
                hashedPassword,
                role: "user",
                name,
                age,
                gender,
                preference,
                tracks,
            },
            select: { id: true, name: true, email: true, role: true },
        })

        await ctx.session.$create({ userId: user.id, roles: [user.role] })
        return user
    },
)
