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
        </main>
    );
};

export default HomePage;
