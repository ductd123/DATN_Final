import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PrivateRouter({
    component: Component,
    layout: Layout,
    ...rest
}) {
    const token = localStorage.getItem("access_token");
    const navigate = useNavigate();

    const dispatch = useDispatch();
    useEffect(() => {
        if (!token) {
            navigate("/learn");
        }
    }, [dispatch, token]);

    return (
        <Layout>
            <Component />
        </Layout>
    );
}
