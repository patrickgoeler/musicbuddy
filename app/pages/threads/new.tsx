import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import createThread from "app/threads/mutations/createThread"
import ThreadForm from "app/threads/components/ThreadForm"

const NewThreadPage: BlitzPage = () => {
    const router = useRouter()
    const [createThreadMutation] = useMutation(createThread)

    return (
        <div>
            <h1>Create New Thread</h1>

            <ThreadForm
                initialValues={{}}
                onSubmit={async () => {
                    try {
                        const thread = await createThreadMutation({ data: { name: "MyName" } })
                        alert("Success!" + JSON.stringify(thread))
                        router.push(`/threads/${thread.id}`)
                    } catch (error) {
                        alert("Error creating thread " + JSON.stringify(error, null, 2))
                    }
                }}
            />

            <p>
                <Link href="/threads">
                    <a>Threads</a>
                </Link>
            </p>
        </div>
    )
}

NewThreadPage.getLayout = (page) => <Layout title={"Create New Thread"}>{page}</Layout>

export default NewThreadPage
