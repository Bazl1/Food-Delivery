import s from "./CartItem.module.scss";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import demo from "../../assets/img/bannerLogin.jpg";
import { useState } from "react";

const CartItem = () => {
    const [count, setCount] = useState<number>(1);

    const handlePlus = () => {
        setCount((current) => current + 1);
    };

    const handleMinus = () => {
        if (count >= 2) {
            setCount((current) => current - 1);
        }
    };

    return (
        <div className={s.cart}>
            <div className={s.cart__columns}>
                <img className={s.cart__img} src={demo} alt="img" />
            </div>
            <div className={s.cart__columns}>
                <h3 className={s.cart__title}>Title demo</h3>
                <p className={s.cart__price}>20$</p>
            </div>
            <div className={s.cart__columns}>
                <button onClick={handlePlus} className={s.cart__plus}>
                    <FiPlus />
                </button>
                <div className={s.cart__count}>{count}</div>
                <button onClick={handleMinus} className={s.cart__misun}>
                    <FiMinus />
                </button>
                <button className={s.cart__delete}>
                    <FiTrash2 />
                </button>
            </div>
        </div>
    );
};

export default CartItem;
