import { Link } from "react-router-dom";
import { ProductType } from "../../__generated__/graphql";
import s from "./ProductItems.module.scss";
import { useEffect, useState } from "react";

interface ProductItemsProps {
    products: ProductType[];
    pages: number;
    loading: boolean;
    setActivePage: (value: number) => void;
    activePage: number;
    productsRefetch: any;
}
const ProductItems: React.FC<ProductItemsProps> = ({
    products,
    pages,
    loading,
    setActivePage,
    activePage,
    productsRefetch,
}) => {
    useEffect(() => {
        productsRefetch();
    }, [activePage]);

    return (
        <>
            <div className={s.restaurant__items}>
                {!loading ? (
                    products &&
                    products.map((product) => {
                        return (
                            <Link
                                key={product.id}
                                to={`/product/:${product.id}`}
                                className={s.restaurant__item}
                            >
                                <img className={s.restaurant__item_img} src={product.picture} alt="img" />
                                <h4 className={s.restaurant__item_title}>{product.title}</h4>
                                <div className={s.restaurant__item_price}>{product.price}$</div>
                                <button className={`${s.restaurant__item_btn} btn-style-one`}>
                                    Add to cart
                                </button>
                            </Link>
                        );
                    })
                ) : (
                    <>
                        <div className={s.restaurant__skeleton}>
                            <div className={s.restaurant__skeleton_img}></div>
                            <div className={s.restaurant__skeleton_title}></div>
                            <div className={s.restaurant__skeleton_price}></div>
                            <div className={s.restaurant__skeleton_btn}></div>
                        </div>
                        <div className={s.restaurant__skeleton}>
                            <div className={s.restaurant__skeleton_img}></div>
                            <div className={s.restaurant__skeleton_title}></div>
                            <div className={s.restaurant__skeleton_price}></div>
                            <div className={s.restaurant__skeleton_btn}></div>
                        </div>
                        <div className={s.restaurant__skeleton}>
                            <div className={s.restaurant__skeleton_img}></div>
                            <div className={s.restaurant__skeleton_title}></div>
                            <div className={s.restaurant__skeleton_price}></div>
                            <div className={s.restaurant__skeleton_btn}></div>
                        </div>
                        <div className={s.restaurant__skeleton}>
                            <div className={s.restaurant__skeleton_img}></div>
                            <div className={s.restaurant__skeleton_title}></div>
                            <div className={s.restaurant__skeleton_price}></div>
                            <div className={s.restaurant__skeleton_btn}></div>
                        </div>
                    </>
                )}
            </div>
            <div className={s.restaurant__pagination}>
                {!loading ? (
                    pages && (
                        <>
                            <div onClick={() => setActivePage(0)} className={s.restaurant__pagination_item}>
                                0
                            </div>
                            {Array.from({ length: pages }, (_, index) => (
                                <div
                                    key={index}
                                    onClick={() => setActivePage(index + 1)}
                                    className={s.restaurant__pagination_item}
                                >
                                    {index + 1}
                                </div>
                            ))}
                        </>
                    )
                ) : (
                    <>
                        <div className={s.restaurant__pagination_skeleton}></div>
                        <div className={s.restaurant__pagination_skeleton}></div>
                        <div className={s.restaurant__pagination_skeleton}></div>
                        <div className={s.restaurant__pagination_skeleton}></div>
                    </>
                )}
            </div>
        </>
    );
};

export default ProductItems;
