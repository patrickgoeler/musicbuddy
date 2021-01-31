import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import Button from "app/core/components/Button"
import { Form, FORM_ERROR } from "app/core/components/Form"
import LabeledSelectField from "app/core/components/LabeledSelectField"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { useMutation, useRouter, useRouterQuery } from "blitz"
import { MusicNote } from "heroicons-react"
import { getAnalyzedTracks, getCompoundedTracks, getTopTracks } from "integrations/Spotify"
import React, { useEffect, useState } from "react"
import { FormSpy } from "react-final-form"

type SignupFormProps = {
    onSuccess?: () => void
}

function SignupForm(props: SignupFormProps) {
    const router = useRouter()
    const query = useRouterQuery()
    const [formState, setFormState] = useState("")
    const [mounted, setMounted] = useState(false)
    const [signupMutation] = useMutation(signup)
    let state = {} as any
    let code = ""
    if (query.state) {
        state = JSON.parse(query.state as string)
    }
    if (query.access_token) {
        code = query.access_token as string
    }

    console.log("query", router.query)

    useEffect(() => {
        setMounted(true)
        if (router.asPath.includes("#")) {
            router.replace(router.asPath.replace("#", "?"))
        }
    }, [router])

    return (
        <Form
            schema={Signup}
            className="space-y-6"
            initialValues={{
                email: state.email || "",
                password: "",
                gender: state.gender || "MALE",
                preference: state.preference || "FEMALE",
                name: (state.name || "").replace("+", " "),
                age: state.age ? Number(state.age) : undefined,
                token: code || "",
            }}
            onSubmit={async (values) => {
                try {
                    const tracks = await getTopTracks(values.token)
                    const analyzedTracks = await getAnalyzedTracks(values.token, tracks)
                    const compoundedTracks = getCompoundedTracks(tracks, analyzedTracks)
                    console.log(compoundedTracks)
                    await signupMutation({
                        ...values,
                        tracks: compoundedTracks.map((track) => ({
                            name: track.name,
                            album: track.album.name,
                            artist: track.artists[0].name,
                            cover: track.album.images[0].url,
                            acousticness: track.acousticness,
                            danceability: track.danceability,
                            energy: track.energy,
                            instrumentalness: track.instrumentalness,
                            liveness: track.liveness,
                            speechiness: track.speechiness,
                            valence: track.valence,
                            preview: track.preview_url,
                        })),
                    })
                    props.onSuccess?.()
                } catch (error) {
                    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                        // This error comes from Prisma
                        return { email: "This email is already being used" }
                    } else {
                        return { [FORM_ERROR]: error.toString() }
                    }
                }
            }}
        >
            <FormSpy
                subscription={{ values: true, valid: true }}
                onChange={(state) => {
                    if (mounted) {
                        const { values } = state
                        setFormState(JSON.stringify(values))
                    }
                }}
            />
            <LabeledTextField name="email" label="Email" placeholder="johndoe@mail.com" />
            <LabeledTextField name="name" label="Name" placeholder="John Doe" />
            <LabeledTextField name="age" label="Age" placeholder="69" type="number" />
            <LabeledSelectField name="gender" label="Gender" items={["MALE", "FEMALE"]} />
            <LabeledSelectField name="preference" label="Preference" items={["MALE", "FEMALE"]} />
            <LabeledTextField
                name="password"
                label="Password"
                placeholder="********"
                type="password"
            />
            <LabeledTextField
                value={code}
                readOnly
                name="code"
                label="Spotify Code"
                placeholder="Filled automatically"
            />
            {code ? (
                <Button fullWidth disabled>
                    <MusicNote className="h-4 w-4 mr-1" />
                    Connected
                </Button>
            ) : (
                <Button
                    onClick={() =>
                        router.push(
                            `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&show_dialog=true&response_type=token&redirect_uri=${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URL}&scope=user-read-private%20user-read-email%20user-top-read&state=${formState}`,
                        )
                    }
                    fullWidth
                >
                    <MusicNote className="h-4 w-4 mr-1" />
                    Connect to Spotify
                </Button>
            )}
            <Button fullWidth variant="primary" type="submit">
                Sign up
            </Button>
        </Form>
    )
}

export default SignupForm
