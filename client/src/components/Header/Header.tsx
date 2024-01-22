import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/img/Logo.svg";
import s from "./Header.module.scss";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { USER_EMAIL } from "../../graphql/GetUserInfo";

const Header = () => {
    const [userName, setUserName] = useState<string | undefined>(undefined);

    const { data } = useQuery(USER_EMAIL, {
        fetchPolicy: "cache-and-network",
    });

    useEffect(() => {
        setUserName(data?.accountInfo?.email);
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
                        </ul>
                    </nav>
                    {userName !== undefined ? (
                        <div className={s.header__user_box}>
                            <div className={s.header__user}>
                                Welcome ~ Maxim<span>{userName}</span>
                            </div>
                            <div>Card Icon</div>
                            <button className={`${s.header__logout_btn} btn-style-one`}>Logout</button>
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
