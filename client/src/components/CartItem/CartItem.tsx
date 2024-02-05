import s from "./CartItem.module.scss";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useCart } from "../../assets/hooks/useCart";

interface CartItemProps {
    id: string;
    picture: string;
    title: string;
    price: string;
    startCount: string;
    setLocalStorageCart: (value: any) => void;
}

const CartItem: React.FC<CartItemProps> = ({
    id,
    picture,
    title,
    price,
    startCount,
    setLocalStorageCart,
}) => {
    const [count, setCount] = useState<number>(1);
    const [countPrice, setCountPrice] = useState<number>(0);

    const handlePlus = () => {
        setCount((current) => current + 1);
        setCountPrice((current) => current + parseInt(price));
        useCart(id, true, true);
    };

    const handleMinus = () => {
        if (count >= 2) {
            setCount((current) => current - 1);
            setCountPrice((current) => current - parseInt(price));
            useCart(id, true, false);
        }
    };

    const handleDelete = () => {
        useCart(id, false);
        setLocalStorageCart(JSON.parse(localStorage.getItem("cart") || "[]"));
    };

    useEffect(() => {
        setCountPrice(parseInt(startCount) * parseInt(price));
        setCount(parseInt(startCount));
    }, []);

    return (
        <div className={s.cart}>
            <div className={s.cart__columns}>
                <img className={s.cart__img} src={picture} alt="img" />
            </div>
            <div className={s.cart__columns}>
                <h3 className={s.cart__title}>{title}</h3>
                <p className={s.cart__price}>{countPrice}$</p>
            </div>
            <div className={s.cart__columns}>
                <button onClick={handlePlus} className={s.cart__plus}>
                    <FiPlus />
                </button>
                <div className={s.cart__count}>{count}</div>
                <button onClick={handleMinus} className={s.cart__misun}>
                    <FiMinus />
                </button>
                <button onClick={handleDelete} className={s.cart__delete}>
                    <FiTrash2 />
                </button>
            </div>
        </div>
    );
};

export default CartItem;
