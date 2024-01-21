import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./assets/utils/ScrollToTop";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import SignupPage from "./pages/SignUpPage/SignupPage";
import SignupPageRestaurant from "./pages/SignUpPageRestaurant/SignUpPageRestaurant";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
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
