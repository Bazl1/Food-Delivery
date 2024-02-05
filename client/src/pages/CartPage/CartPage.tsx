import { useEffect, useState } from "react";
import CartItem from "../../components/CartItem/CartItem";
import s from "./CartPage.module.scss";
import { ProductType } from "../../__generated__/graphql";
import { useLazyQuery } from "@apollo/client";
import { GET_CART_PRODUCTS } from "../../graphql/Cart.query";
import { Link } from "react-router-dom";

const CartPage = () => {
    const [products, setProducts] = useState<ProductType[] | null | undefined>(undefined);
    const [localStorageCart, setLocalStorageCart] = useState<[{ id: string; count: string }] | undefined>(
        undefined,
    );

    const [productsByIds] = useLazyQuery(GET_CART_PRODUCTS, {
        onCompleted(data) {
            setProducts(data.productsByIds);
        },
    });

    useEffect(() => {
        setLocalStorageCart(JSON.parse(localStorage.getItem("cart") || "[]"));
    }, []);

    useEffect(() => {
        const ids = localStorageCart?.map((item: any) => item.id);

        if (ids !== undefined) {
            productsByIds({
                variables: {
                    ids: ids,
                },
            });
        }
    }, [localStorageCart]);

    return (
        <main className="main">
            <section className={s.cart}>
                <div className="container">
                    <div className={s.cart__inner}>
                        <h2 className={s.cart__title}>Your cart</h2>
                        <div className={s.cart__items}>
                            {localStorageCart && localStorageCart?.length > 0 ? (
                                localStorageCart?.map((localItem: any) => {
                                    return products?.map((item: ProductType) => {
                                        return localItem.id === item.id ? (
                                            <CartItem
                                                key={item.id}
                                                id={item.id || ""}
                                                picture={item.picture || ""}
                                                title={item.title || ""}
                                                price={item.price}
                                                startCount={localItem.count}
                                                setLocalStorageCart={setLocalStorageCart}
                                            />
                                        ) : null;
                                    });
                                })
                            ) : (
                                <div className={s.cart__text}>Your card is empty</div>
                            )}
                            <Link to={"/checkout"} className={`${s.cart__btn} btn-style-one`}>
                                Create order
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default CartPage;
