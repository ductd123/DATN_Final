import React from "react";
import "./StudyContainer.scss";
import { useLocation } from "react-router-dom";
import VolunteerSlider from "../VideoAI/VolunteerSlider";

export default function StudyContainer({ children }) {
    const location = useLocation();
    const pathName = location.pathname;

    return (
        <div>
            show learning
        </div>
    );
}
