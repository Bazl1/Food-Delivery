import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./assets/utils/ScrollToTop";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import SignupPage from "./pages/SignUpPage/SignupPage";
import SignupPageRestaurant from "./pages/SignUpPageRestaurant/SignUpPageRestaurant";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useEffect } from "react";
import { REFRESH_TOKEN } from "./graphql/Refresh";
import { useMutation } from "@apollo/client";

function App() {
    const [refreshToken, { data }] = useMutation(REFRESH_TOKEN);

    const handleRefreshToken = async () => {
        await refreshToken();
        const token = data?.refreshToken?.accessToken;
        localStorage.setItem("token", token);
    };

    useEffect(() => {
        handleRefreshToken();
    }, []);

    return (
        <div className="wrapper">
            <Router>
                <ScrollToTop />
                <Header />
                <Routes>
                    <Route path="/authorization" element={<LoginPage />} />
                    <Route path="/registration" element={<SignupPage />} />
                    <Route path="/registration-restaurant" element={<SignupPageRestaurant />} />
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
