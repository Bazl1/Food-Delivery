import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/img/Logo.svg";
import s from "./Header.module.scss";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { USER_EMAIL } from "../../graphql/GetUserInfo.query";
import { IoBag } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
// import { LOGOUT } from "../../graphql/Logout.mutatuin";

const Header = () => {
    const [userName, setUserName] = useState<string | undefined>(undefined);
    const [userRole, setUserRole] = useState<string | undefined>(undefined);
    const [data, setData] = useState<any>(null);

    // const [signOut] = useMutation(LOGOUT);

    const fetchData = async () => {
        const { data } = await useQuery(USER_EMAIL, {
            fetchPolicy: "cache-and-network",
        });
        setData(data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setUserName(data?.accountInfo?.email);
        setUserRole(data?.accountInfo?.role);
    }, [data]);

    const location = useLocation();
    const pathsWithoutHeader = ["/registration", "/registration-restaurant", "/authorization"];

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
                                <Link className={s.header__link} to={"#"}>
                                    Home
                                </Link>
                            </li>
                            <li className={s.header__item}>
                                <Link className={s.header__link} to={"#"}>
                                    Catalog
                                </Link>
                            </li>
                            {userRole === "Restaurant" && (
                                <Link className={`${s.header__btn_one} btn-style-one`} to={"/"}>
                                    My Restaurant
                                </Link>
                            )}
                        </ul>
                    </nav>
                    {userName !== undefined ? (
                        <div className={s.header__user_box}>
                            {userRole === "Customer" ? (
                                ""
                            ) : (
                                <Link to={"#"} className={s.header__small_btn}>
                                    <IoSettingsSharp />
                                </Link>
                            )}
                            <Link to={"#"} className={s.header__small_btn}>
                                <IoBag />
                            </Link>
                            <button onClick={() => {}} className={`${s.header__logout_btn} btn-style-one`}>
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
