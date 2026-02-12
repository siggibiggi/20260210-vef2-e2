import type { PropsWithChildren } from "hono/jsx";
import { Layout } from "./Layout.js";

export function ErrorPage({ children }: PropsWithChildren) {
    return (
        <section>
            <p>
                <a href="/">Til baka á forsíðu</a>
            </p>
            <Layout title="villa kom upp">{children}</Layout>
        </section>
        
    )
}