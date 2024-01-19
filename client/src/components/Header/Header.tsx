import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/img/Logo.svg";
import s from "./Header.module.scss";

const Header = () => {
    const location = useLocation();

    const pathsWithoutHeader = ["/registration"];

    // Если текущий путь в списке, не отображаем хедер
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
                    <Link className={`${s.header__btn} btn-style-one`} to={"/registration"}>
                        Sign Up
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
