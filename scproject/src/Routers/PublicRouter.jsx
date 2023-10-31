import React from "react";
import { Route, Outlet, Routes } from "react-router-dom";

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
