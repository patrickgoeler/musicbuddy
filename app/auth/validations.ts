import * as z from "zod"

const password = z.string().min(10).max(100)

export const Signup = z.object({
    email: z.string().email(),
    name: z.string().min(3),
    age: z.number().min(18),
    gender: z.enum(["MALE", "FEMALE"]),
    preference: z.enum(["MALE", "FEMALE"]),
    token: z.string(),
    tracks: z
        .array(
            z.object({
                name: z.string(),
                album: z.string(),
                artist: z.string(),
                cover: z.string(),
                acousticness: z.number(),
                danceability: z.number(),
                energy: z.number(),
                instrumentalness: z.number(),
                liveness: z.number(),
                speechiness: z.number(),
                valence: z.number(),
                preview: z.string(),
            }),
        )
        .optional(),
    password,
})

export const Login = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const ForgotPassword = z.object({
    email: z.string().email(),
})

export const ResetPassword = z
    .object({
        password: password,
        passwordConfirmation: password,
        token: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords don't match",
        path: ["passwordConfirmation"], // set the path of the error
    })

export const ChangePassword = z.object({
    currentPassword: z.string(),
    newPassword: password,
})
