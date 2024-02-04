import { Link } from "react-router-dom";
import s from "./RestaurantsPage.module.scss";

const RestaurantsPage = () => {
    return (
        <main className="main">
            <section className={s.restaurants}>
                <div className="container">
                    <div className={s.restaurants__inner}>
                        <h2 className={s.restaurants__title}>List of all restaurants</h2>
                        <div className={s.restaurants__items}>
                            <Link to={`/restaurant/:id`} className={s.restaurants__item}>
                                <h3 className={s.restaurants__item_title}>Title</h3>
                                <p className={s.restaurants__text}>
                                    Found <span>0</span> products
                                </p>
                                <div className={s.restaurants__overlay}></div>
                                <img className={s.restaurant__banner} src={"#"} alt="banner" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default RestaurantsPage;
