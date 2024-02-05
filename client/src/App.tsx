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
import CreateProduct from "./pages/CreateProduct/CreateProduct";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import CartPage from "./pages/CartPage/CartPage";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import MyRestaurantPage from "./pages/MyRestaurantPage/MyRestaurantPage";
import RestaurantPage from "./pages/RestaurantPage/RestaurantPage";
import Catalog from "./pages/Catalog/Catalog";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

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
                    {/* <Route element={<PrivateRoute protectedRole="Customer" />}> */}
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    {/* </Route> */}

                    {/* <Route element={<PrivateRoute protectedRole="Restaurant" />}> */}
                    <Route path="/my-restaurant/:id" element={<MyRestaurantPage />} />
                    <Route path="/restaurant-settings" element={<SettingsRestaurantPage />} />
                    <Route path="/create-product" element={<CreateProduct />} />
                    {/* </Route> */}

                    <Route path="/authorization" element={<LoginPage />} />
                    <Route path="/registration" element={<SignupPage />} />
                    <Route path="/registration-restaurant" element={<SignupPageRestaurant />} />

                    <Route path="/search/:search" element={<SearchPage />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/product/:id" element={<SingleProduct />} />
                    <Route path="/restaurant/:id" element={<RestaurantPage />} />
                    <Route path="/restaurants" element={<RestaurantsPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="*" element={<HomePage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
