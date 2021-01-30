import Button from "app/core/components/Button"
import Layout from "app/core/layouts/Layout"

function Home() {
    return (
        <div className="h-full flex items-center justify-center">
            <Button variant="primary">Let's Play</Button>
        </div>
    )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
