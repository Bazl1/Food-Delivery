import { Link } from "react-router-dom";
import s from "./CheckoutPage.module.scss";

const CheckoutPage = () => {
    return (
        <main className="main">
            <section className={s.checkout}>
                <div className="container">
                    <div className={s.checkout__inner}>
                        <h2 className={s.checkout__title}>Your checkout</h2>
                        <div className={s.checkout__row}>
                            <div className={s.checkout__columns}>
                                <h3 className={s.checkout__subtitle}>Your data</h3>
                                <p className={s.checkout__text}>test@gmail.com</p>
                                <p className={s.checkout__text}>Maxim</p>
                                <h3 className={s.checkout__subtitle}>Your products</h3>
                                <div className={s.checkout__items}>
                                    <div className={s.checkout__item}>
                                        <img className={s.checkout__img} src="" alt="img" />
                                        <h4 className={s.checkout__item_title}></h4>
                                        <p className={s.checkout__price}></p>
                                    </div>
                                </div>
                            </div>
                            <div className={s.checkout__columns}>
                                <h3 className={s.checkout__subtitle}>Total cost</h3>
                                <p className={s.checkout__totalcount}>123$</p>
                                <Link to={"/"} className={`${s.checkout__btn} btn-style-one`}>
                                    Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CheckoutPage;
