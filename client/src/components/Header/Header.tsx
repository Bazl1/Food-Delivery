import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/img/Logo.svg";
import s from "./Header.module.scss";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ROLE } from "../../graphql/GetUserInfo.query";
import { IoBag } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { LOGOUT } from "../../graphql/Logout.mutatuin";

const Header = () => {
    const [userRole, setUserRole] = useState<string | undefined>(undefined);
    const [userId, setUserId] = useState<string | undefined>(undefined);

    const [signOut] = useMutation(LOGOUT, {
        onCompleted(data) {
            if (data.signOut) {
                localStorage.removeItem("token");
                navigate("/");
                refetch();
                setUserRole(undefined);
                setUserId(undefined);
            }
        },
    });

    const { refetch } = useQuery(GET_ROLE, {
        fetchPolicy: "cache-and-network",
        onCompleted(data) {
            setUserRole(data.accountInfo?.role || "");
            setUserId(data.accountInfo?.id || "");
        },
    });

    const navigate = useNavigate();
    const location = useLocation();
    const pathsWithoutHeader = ["/registration", "/registration-restaurant", "/authorization"];

    useEffect(() => {
        if (!pathsWithoutHeader.includes(location.pathname)) {
            refetch();
        }
    }, [location.pathname]);

    if (pathsWithoutHeader.includes(location.pathname)) {
        return null;
    }

    return (
        <header className={s.header}>
            <div className="container">
                <div className={s.header__inner}>
                    <div className={s.header__logo}>
                        <Link className={s.header__logo_link} to={"/"}>
                            <img className={s.header__logo_img} src={logo} alt="logo" />
                        </Link>
                    </div>
                    <nav className={s.header__menu}>
                        <ul className={s.header__list}>
                            <li className={s.header__item}>
                                <Link className={s.header__link} to={"/"}>
                                    Home
                                </Link>
                            </li>
                            <li className={s.header__item}>
                                <Link className={s.header__link} to={"/catalog"}>
                                    Catalog
                                </Link>
                            </li>
                            <li className={s.header__item}>
                                <Link className={s.header__link} to={"/restaurants"}>
                                    Restaurants
                                </Link>
                            </li>
                            {userRole === "Restaurant" && (
                                <Link
                                    className={`${s.header__btn_one} btn-style-one`}
                                    to={`/my-restaurant/:${userId}`}
                                >
                                    My Restaurant
                                </Link>
                            )}
                        </ul>
                    </nav>
                    {userRole !== undefined ? (
                        <div className={s.header__user_box}>
                            {userRole === "Customer" ? (
                                <Link to={"/settings"} className={s.header__small_btn}>
                                    <IoSettingsSharp />
                                </Link>
                            ) : (
                                <Link to={"/restaurant-settings"} className={s.header__small_btn}>
                                    <IoSettingsSharp />
                                </Link>
                            )}
                            <Link to={"/cart"} className={s.header__small_btn}>
                                <IoBag />
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className={`${s.header__logout_btn} btn-style-one`}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className={s.header__btns}>
                            <Link className={`${s.header__btn_two} btn-style-two`} to={"/authorization"}>
                                Sign In
                            </Link>
                            <Link className={`${s.header__btn_one} btn-style-one`} to={"/registration"}>
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
