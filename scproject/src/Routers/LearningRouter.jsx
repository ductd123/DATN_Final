import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import { doCheckLogin } from "../Redux/actions";
import { ERROR } from "../Redux/constants";
import LearningLayout from "../Layout/LearningLayout/LearningLayout";

export default function LearningRouter({ layout: Layout }) {
    return (
        <Layout />
    );
}