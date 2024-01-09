import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ERROR } from "../Redux/constants";

export default function PublicRouter({
    component: Component,
    layout: Layout,
    ...rest
}) {
    const token = localStorage.getItem("access_token");
    const navigate = useNavigate();

    const dispatch = useDispatch();
    useEffect(() => {
        if (token) {
            navigate("/home");
        }
        
    }, [dispatch, token]);
    return (
        <Layout>
            <Component />
        </Layout>
    );
}
