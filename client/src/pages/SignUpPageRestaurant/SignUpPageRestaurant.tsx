import s from "./SignUpPageRestaurant.module.scss";
import banner from "../../assets/img/banner.png";
import logo from "../../assets/img/Logo.svg";
import { Link } from "react-router-dom";
import SingUpFormRestaurant from "../../components/SingUpFormRestaurant/SingUpFormRestaurant";

const SignupPageRestaurant = () => {
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
                                    Register your restaurant
                                </h2>
                                <SingUpFormRestaurant />
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

export default SignupPageRestaurant;
