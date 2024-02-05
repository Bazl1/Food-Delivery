import SingUpForm from "../../components/SingUpForm/SingUpForm";
import s from "./SignupPage.module.scss";
import banner from "../../assets/img/banner.png";
import logo from "../../assets/img/Logo.svg";
import { Link } from "react-router-dom";

const SignupPage = () => {
    return (
        <main className="main">
            <section className={s.signup}>
                <div className={`${s.signup__container} container`}>
                    <div className={s.signup__inner}>
                        <div className={s.signup__box}>
                            <div className={s.signup__columns}>
                                <h2 className={s.signup__title}>
                                    Welcome
                                    <br />
                                    register for further actions
                                </h2>
                                <SingUpForm />
                                <p className={s.signup__text}>
                                    Already have an account?
                                    <span>
                                        <Link to={"/authorization"}>Log in</Link>
                                    </span>
                                </p>
                            </div>
                            <div className={s.signup__columns}>
                                <img className={s.signup__banner} src={banner} alt="banner" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default SignupPage;
