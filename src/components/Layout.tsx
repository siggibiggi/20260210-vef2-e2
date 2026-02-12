import type { PropsWithChildren } from 'hono/jsx';

type Props = {
    title: string;
};

export function Layout({ title, children }: PropsWithChildren<Props>) {
    return (
        <html>
            <head>
                <title>{title}</title>
                <link rel="stylesheet" href="./static/styles.css" />
            </head>
            <body>{children}</body>
        </html>
    );
}