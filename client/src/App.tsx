import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./assets/utils/ScrollToTop";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import SignupPage from "./pages/SignUpPage/SignupPage";

function App() {
    return (
        <div className="wrapper">
            <Router>
                <ScrollToTop />
                <Header />
                <Routes>
                    <Route path="/registration" element={<SignupPage />} />
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
