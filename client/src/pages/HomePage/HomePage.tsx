import { Link } from "react-router-dom";
import Search from "../../components/Search/Search";
import s from "./HomePage.module.scss";

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
                                <div className={s.partners__item}>Convenience</div>
                                <div className={s.partners__item}>Speed</div>
                                <div className={s.partners__item}>Time-saving</div>
                                <div className={s.partners__item}>Variety</div>
                                <div className={s.partners__item}>Safety</div>
                                <div className={s.partners__item}>Comfort</div>
                                <div className={s.partners__item}>Contactless</div>
                                <div className={s.partners__item}>Flexibility</div>
                                <div className={s.partners__item}>Wide selection</div>
                                <div className={s.partners__item}>Order tracking</div>
                                <div className={s.partners__item}>Promotions</div>
                                <div className={s.partners__item}>Simplicity</div>
                                <div className={s.partners__item}>Saved effort</div>
                                <div className={s.partners__item}>Healthy options</div>
                                <div className={s.partners__item}>Support local restaurants</div>
                            </div>
                        </div>
                        <div className={s.partners__items_box}>
                            <div className={`${s.partners__items} ${s.partners__items_to}`}>
                                <div className={s.partners__item}>Stress-free</div>
                                <div className={s.partners__item}>Personalized choices</div>
                                <div className={s.partners__item}>Elimination of waiting</div>
                                <div className={s.partners__item}>Expense control</div>
                                <div className={s.partners__item}>Menu optimization</div>
                                <div className={s.partners__item}>Regular discounts</div>
                                <div className={s.partners__item}>Eco-friendly</div>
                                <div className={s.partners__item}>Pre-order option</div>
                                <div className={s.partners__item}>Informative reviews</div>
                                <div className={s.partners__item}>Freshness guarantee</div>
                                <div className={s.partners__item}>Online payment option</div>
                                <div className={s.partners__item}>No need to cook</div>
                                <div className={s.partners__item}>Privacy</div>
                                <div className={s.partners__item}>24/7 service</div>
                                <div className={s.partners__item}>Charity support option</div>
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
