import s from "./SingleProduct.module.scss";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_ID } from "../../graphql/GetProductById.query";
import { useCart } from "../../assets/hooks/useCart";

const SingleProduct = () => {
    const { id = "" } = useParams<string>();

    const { data, loading } = useQuery(GET_PRODUCT_BY_ID, {
        variables: {
            id: id.slice(1),
        },
    });

    return (
        <main className="main">
            <section className={s.product}>
                <div className="container">
                    <div className={s.product__inner}>
                        {!loading ? (
                            <>
                                <div className={s.product__columns}>
                                    <img
                                        className={s.product__img}
                                        src={data?.productById?.picture || ""}
                                        alt="img"
                                    />
                                </div>
                                <div className={s.product__columns}>
                                    <h2 className={s.product__title}>{data?.productById?.title}</h2>
                                    <h4 className={s.product__price}>{data?.productById?.price}$</h4>
                                    <p className={s.product__text}>{data?.productById?.description}</p>
                                    <button
                                        onClick={() => useCart(data?.productById?.id || "", true)}
                                        className={`${s.product__btn} btn-style-one`}
                                    >
                                        Add to cart
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={s.product__columns}>
                                    <div className={s.product__skeleton_img}></div>
                                </div>
                                <div className={s.product__columns}>
                                    <div className={s.product__skeleton_title}></div>
                                    <div className={s.product__skeleton_price}></div>
                                    <div className={s.product__skeleton_description}></div>
                                    <div className={s.product__skeleton_btn}></div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default SingleProduct;
