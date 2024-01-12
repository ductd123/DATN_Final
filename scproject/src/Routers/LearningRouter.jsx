import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { doCheckLogin } from "../Redux/actions";
import { ERROR } from "../Redux/constants";
import LearningLayout from "../Layout/LearningLayout/LearningLayout";

export default function LearningRouter({
    layout: Layout
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
        <Layout/>
    );
}