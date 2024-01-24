import { Link } from "react-router-dom";
import logo from "../../assets/img/Logo.svg";
import s from "./LoginPage.module.scss";
import LoginForm from "../../components/LoginForm/LoginForm";
import banner from "../../assets/img/bannerLogin.jpg";

const LoginPage = () => {
    return (
        <main className="main">
            <section className={s.auth}>
                <div className={`${s.auth__container} container`}>
                    <div className={s.auth__inner}>
                        <div className={s.auth__box}>
                            <div className={s.auth__columns}>
                                <div className={s.auth__logo}>
                                    <Link className={s.auth__logo_link} to={"/"}>
                                        <img className={s.auth__logo_img} src={logo} alt="logo" />
                                    </Link>
                                </div>
                                <h2 className={s.auth__title}>
                                    Welcome
                                    <br /> log in for further actions
                                </h2>
                                <LoginForm />
                                <p className={s.auth__text}>
                                    Don't have an account yet?
                                    <span>
                                        <Link to={"/registration"}>Register</Link>
                                    </span>
                                </p>
                            </div>
                            <div className={s.auth__columns}>
                                <img className={s.auth__banner} src={banner} alt="banner" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default LoginPage;
