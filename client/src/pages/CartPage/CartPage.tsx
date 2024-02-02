import CartItem from "../../components/CartItem/CartItem";
import s from "./CartPage.module.scss";

const CartPage = () => {
    return (
        <main className="main">
            <section className={s.cart}>
                <div className="container">
                    <div className={s.cart__inner}>
                        <h2 className={s.cart__title}>Your cart</h2>
                        <div className={s.cart__items}>
                            <CartItem />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CartPage;
