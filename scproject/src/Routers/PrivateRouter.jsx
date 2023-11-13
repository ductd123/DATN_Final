import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "react-router-dom";
import { doCheckLogin } from "../Redux/actions";
import { ERROR } from "../Redux/constants";

export default function PrivateRouter({
    component: Component,
    layout: Layout,
    ...rest
}) {
    const token = localStorage.getItem("token");
    const reduxUserData = useSelector((state) => state.userData);
    // const navigate = useNavigate();

    const dispatch = useDispatch();
    useEffect(() => {
        if (token) {
            dispatch(doCheckLogin());
        }
    }, [dispatch, token]);

    if (!token || reduxUserData.type === ERROR) {
        redirect("/");
    }

    return (
        <Layout>
            <Component />
        </Layout>
    );
}