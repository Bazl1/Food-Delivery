import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./assets/utils/ScrollToTop";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import SignupPage from "./pages/SignUpPage/SignupPage";
import SignupPageRestaurant from "./pages/SignUpPageRestaurant/SignUpPageRestaurant";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useEffect } from "react";
import { REFRESH_TOKEN } from "./graphql/Refresh.mutation";
import { useMutation } from "@apollo/client";
import SettingsRestaurantPage from "./pages/SettingsRestaurantPage/SettingsRestaurantPage";
import RestaurantsPage from "./pages/RestaurantsPage/RestaurantsPage";

function App() {
    const [refreshToken] = useMutation(REFRESH_TOKEN, {
        onCompleted: (data) => {
            if (data.refreshToken?.accessToken !== null && data.refreshToken?.accessToken !== undefined) {
                localStorage.setItem("token", data.refreshToken?.accessToken);
            }
        },
    });

    useEffect(() => {
        refreshToken();
    }, []);

    return (
        <div className="wrapper">
            <Router>
                <ScrollToTop />
                <Header />
                <Routes>
                    <Route path="/restaurant-settings" element={<SettingsRestaurantPage />} />

                    <Route path="/authorization" element={<LoginPage />} />
                    <Route path="/registration" element={<SignupPage />} />
                    <Route path="/registration-restaurant" element={<SignupPageRestaurant />} />

                    <Route path="/restaurants" element={<RestaurantsPage />} />
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
