import { Link } from "react-router-dom";
import s from "./CheckoutPage.module.scss";
import { useMutation } from "@apollo/client";
import { CREATE_ORDER } from "../../graphql/CreateOrder.mutation";
import { useEffect } from "react";
import { OrdersService_ProductType } from "../../__generated__/graphql";

const CheckoutPage = () => {
    const [createOrder, { data }] = useMutation(CREATE_ORDER, {
        onError(error) {
            console.log(error.message);
        },
    });

    useEffect(() => {
        const products = JSON.parse(localStorage.getItem("cart") || "[]");
        createOrder({
            variables: {
                items: products,
            },
        });
    }, []);

    return (
        <main className="main">
            <section className={s.checkout}>
                <div className="container">
                    <div className={s.checkout__inner}>
                        <h2 className={s.checkout__title}>Your checkout</h2>
                        <div className={s.checkout__row}>
                            <div className={s.checkout__columns}>
                                <h3 className={s.checkout__subtitle}>Your data</h3>
                                <p className={s.checkout__text}>{data?.createOrder?.customer?.email}</p>
                                <p className={s.checkout__text}>{data?.createOrder?.customer?.userName}</p>
                                <h3 className={s.checkout__subtitle}>Your products</h3>
                                <div className={s.checkout__items}>
                                    {data?.createOrder?.items?.map((item: OrdersService_ProductType) => {
                                        return (
                                            <div key={item.id} className={s.checkout__item}>
                                                <img
                                                    className={s.checkout__img}
                                                    src={item.picture || ""}
                                                    alt="img"
                                                />
                                                <h4 className={s.checkout__item_title}>{item.title}</h4>
                                                <p className={s.checkout__price}>
                                                    {item.price}$ x {item.count}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className={s.checkout__columns}>
                                <h3 className={s.checkout__subtitle}>Total cost</h3>
                                <p className={s.checkout__totalcount}>{data?.createOrder?.totalPrice}$</p>
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
