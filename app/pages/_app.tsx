import {
    AppProps,
    ErrorComponent,
    useRouter,
    AuthenticationError,
    AuthorizationError,
    ErrorFallbackProps,
} from "blitz"
import { ErrorBoundary } from "react-error-boundary"
import { queryCache } from "react-query"
import LoginForm from "app/auth/components/LoginForm"

import "app/core/styles/index.css"

export default function App({ Component, pageProps }: AppProps) {
    const getLayout = Component.getLayout || ((page) => page)
    const router = useRouter()

    return (
        <ErrorBoundary
            FallbackComponent={RootErrorFallback}
            resetKeys={[router.asPath]}
            onReset={() => {
                // This ensures the Blitz useQuery hooks will automatically refetch
                // data any time you reset the error boundary
                queryCache.resetErrorBoundaries()
            }}
        >
            {getLayout(<Component {...pageProps} />)}
        </ErrorBoundary>
    )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
    if (error instanceof AuthenticationError) {
        return <LoginForm onSuccess={resetErrorBoundary} />
    } else if (error instanceof AuthorizationError) {
        return (
            <ErrorComponent
                statusCode={(error as any).statusCode}
                title="Sorry, you are not authorized to access this"
            />
        )
    } else {
        return (
            <ErrorComponent
                statusCode={error.statusCode || 400}
                title={error.message || error.name}
            />
        )
    }
}
