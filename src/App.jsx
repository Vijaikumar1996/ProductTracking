import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import UploadShipment from "./pages/UploadShipment/UploadShipment";

import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import GlobalLoader from "./components/loader/GlobalLoader";
import Home from "./pages/Dashboard/Home";

import PrivateRoute from "./PrivateRoute";
import Orders from "./pages/Orders/Orders";
import Users from "./pages/Users/Users";
import MISReport from "./pages/Reports/MISReport";
import ViewOrder from "./pages/Orders/ViewOrder";

export default function App() {
    const isFetching = useIsFetching();
    const isMutating = useIsMutating();
    const isLoading = isFetching || isMutating;

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        check();

        window.addEventListener("resize", check);

        return () => {
            window.removeEventListener("resize", check);
        };
    }, []);

    return (
        <>
            {isLoading ? <GlobalLoader /> : null}

            <Router>
                <ScrollToTop />

                <Toaster
                    position={
                        isMobile
                            ? "bottom-center"
                            : "top-center"
                    }
                    reverseOrder={false}
                    gutter={8}
                    containerStyle={
                        isMobile
                            ? { bottom: 20 }
                            : { top: 20 }
                    }
                    toastOptions={{
                        duration: 3000,
                        style: {
                            fontSize: "14px",
                            zIndex: 999999,
                            borderRadius: "8px",
                            padding: "12px 16px",
                        },
                    }}
                />

                <Routes>
                    {/* =========================================
                        Protected Routes
                       ========================================= */}

                    <Route element={<PrivateRoute />}>
                        <Route element={<AppLayout />}>

                            {/* Home */}
                            <Route
                                path="/home"
                                element={<Home />}
                            />

                            {/* Profile */}
                            <Route
                                path="/profile"
                                element={<UserProfiles />}
                            />

                            {/* Upload Shipment
                                Only WEB_ADMIN and WEB_USER */}
                            <Route
                                element={
                                    <PrivateRoute
                                        allowedRoles={[
                                            "WEB_ADMIN",
                                            "WEB_USER",
                                        ]}
                                    />
                                }
                            >
                                <Route
                                    path="/uploadshipment"
                                    element={<UploadShipment />}
                                />
                            </Route>

                            {/* Users */}
                            <Route
                                path="/users"
                                element={<Users />}
                            />

                            {/* Orders */}
                            <Route
                                path="/orders"
                                element={<Orders />}
                            />

                            {/* View Order */}
                            <Route
                                path="/orders/:id"
                                element={<ViewOrder />}
                            />

                            {/* MIS Reports */}
                            <Route
                                path="/misreports"
                                element={<MISReport />}
                            />

                        </Route>
                    </Route>

                    {/* =========================================
                        Login
                       ========================================= */}

                    <Route
                        path="/"
                        element={<SignIn />}
                    />

                    {/* =========================================
                        Fallback
                       ========================================= */}

                    <Route
                        path="*"
                        element={<NotFound />}
                    />
                </Routes>
            </Router>
        </>
    );
}