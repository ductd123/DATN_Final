import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePageChat, Login, Register, HomePageAddFriends, HomePageForVolunteer, Contact, Room } from "../Containers";
import { MainLayout, BlankLayout } from "../Layout";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";

export default function Routers() {
    return (
        <Routes>
            <Route
                path="/"
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
                path="/home"
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
                path="/volunteers"
                element={
                    <PrivateRouter
                        component={HomePageForVolunteer}
                        layout={MainLayout}
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
