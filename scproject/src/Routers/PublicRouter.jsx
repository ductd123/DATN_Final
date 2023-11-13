import React from "react";

export default function PublicRouter({
    component: Component,
    layout: Layout,
    ...rest
}) {
    return (
        <Layout>
            <Component />
        </Layout>
    );
}
