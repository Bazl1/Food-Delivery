import { Link } from "react-router-dom";
import Search from "../../components/Search/Search";
import s from "./HomePage.module.scss";

import logo1 from "../../assets/img/logos/Burger_King.png";
import logo2 from "../../assets/img/logos/Coca-Cola.png";
import logo3 from "../../assets/img/logos/Dominos.png";
import logo4 from "../../assets/img/logos/KFC.png";
import logo5 from "../../assets/img/logos/McDonalds.png";
import logo6 from "../../assets/img/logos/Pepsi_logo.png";
import logo7 from "../../assets/img/logos/Pizza_Hut.png";
import logo8 from "../../assets/img/logos/Starbucks_Coffe.png";
import logo9 from "../../assets/img/logos/Subway.png";
import logo10 from "../../assets/img/logos/Wendys.png";

const HomePage = () => {
    return (
        <main className="main">
            <section className={s.hero}>
                <div className="container">
                    <div className={s.hero__inner}>
                        <h2 className={s.hero__title}>Many Restaurants in 1 order</h2>
                        <p className={s.hero__text}>
                            Order from different restaurants and get them all in one delivery.
                        </p>
                        <Search />
                    </div>
                </div>
            </section>
            <section className={s.partners}>
                <div className="container-fluid">
                    <div className={s.partners__inner}>
                        <h2 className={s.partners__title}>Our partners</h2>
                        <div className={s.partners__items_box}>
                            <div className={s.partners__items}>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo1} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo2} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo3} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo4} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo5} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo6} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo7} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo8} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo9} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo10} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo1} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo2} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo3} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo4} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo5} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo6} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo7} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo8} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo9} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo10} alt="img" />
                                </div>
                            </div>
                            <div className={s.partners__items} aria-hidden="true">
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo1} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo2} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo3} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo4} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo5} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo6} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo7} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo8} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo9} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo10} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo1} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo2} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo3} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo4} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo5} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo6} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo7} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo8} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo9} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo10} alt="img" />
                                </div>
                            </div>
                        </div>
                        <div className={s.partners__items_box}>
                            <div className={`${s.partners__items} ${s.partners__items_to}`}>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo1} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo2} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo3} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo4} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo5} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo6} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo7} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo8} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo9} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo10} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo1} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo2} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo3} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo4} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo5} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo6} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo7} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo8} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo9} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo10} alt="img" />
                                </div>
                            </div>
                            <div
                                className={`${s.partners__items} ${s.partners__items_to}`}
                                aria-hidden="true"
                            >
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo1} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo2} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo3} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo4} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo5} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo6} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo7} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo8} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo9} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo10} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo1} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo2} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo3} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo4} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo5} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo6} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo7} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo8} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo9} alt="img" />
                                </div>
                                <div className={s.partners__item}>
                                    <img className={s.partners__item_img} src={logo10} alt="img" />
                                </div>
                            </div>
                        </div>
                        <Link to={"/registration-restaurant"} className={`btn-style-one ${s.partners__btn}`}>
                            Register as a restaurant
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HomePage;
