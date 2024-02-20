import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePageChat, Login, Register, VolunteerSlider, Contact, Room } from "../Containers";
import { MainLayout, BlankLayout } from "../Layout";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";
import LearningRouter from "./LearningRouter";
import LearningLayout from "../Layout/LearningLayout/LearningLayout";
import Examlayout from "../Layout/ExamLayout/ExamLayout";
import AdminLayout from "../Layout/AdminLayout/AdminLayout";
import VolunterLayout from "../Layout/VolunteerLayout/VolunteerLayput";

export default function Routers() {
    return (
        <Routes>
            <Route
                path="/login"
                element={
                    <PublicRouter
                        component={Login}
                        layout={BlankLayout}
                    />
                }
            />
            <Route
                path="/register"
                element={
                    <PublicRouter
                        component={Register}
                        layout={BlankLayout}
                    />
                }
            />
            <Route
                path="/"
                element={
                    <PrivateRouter
                        component={HomePageChat}
                        layout={MainLayout}
                    />
                }
            />
            <Route
                path="/friend"
                element={
                    <PrivateRouter
                        component={Contact}
                        layout={MainLayout}
                    />
                }
            />
            <Route
                path="/group"
                element={
                    <PrivateRouter
                        component={Contact}
                        layout={MainLayout}
                    />
                }
            />
            <Route
                path="/add-request"
                element={
                    <PrivateRouter
                        component={Contact}
                        layout={MainLayout}
                    />
                }
            />
            <Route
                path="/learn"
                element={
                    <LearningRouter
                        layout={LearningLayout}
                    />
                }
            />
            <Route
                path="/volunteer"
                element={
                    <LearningRouter
                        layout={VolunterLayout}
                    />
                }
            />
            <Route
                path="/admin"
                element={
                    <LearningRouter
                        layout={AdminLayout}
                    />
                }
            />
            <Route
                path="/contact"
                element={
                    <PrivateRouter
                        component={Contact}
                        layout={MainLayout}
                    />
                }
            />
            <Route
                path="/exam"
                element={
                    <LearningRouter
                        layout={Examlayout}
                    />
                }
            />
            <Route
                path="/room/userId=:userId&&conversationId=:conversationId"
                element={
                    <PrivateRouter
                        component={Room}
                        layout={MainLayout}
                    />
                }
            />
            <Route
                path="/room/:id"
                element={
                    <PrivateRouter
                        component={Room}
                        layout={MainLayout}
                    />
                }
            />
        </Routes>
    );
}
