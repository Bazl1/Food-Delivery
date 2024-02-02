import { Link } from "react-router-dom";
import { ProductType } from "../../__generated__/graphql";
import s from "./ProductItems.module.scss";
import { useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useMutation } from "@apollo/client";
import { DELETE_PRODUCT } from "../../graphql/DeleteProduct.mutation";
import toast, { Toaster } from "react-hot-toast";

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
    const [deleteProduct] = useMutation(DELETE_PRODUCT, {
        onCompleted() {
            toast.success("Product removed successfully");
            productsRefetch();
        },
        onError(error) {
            toast.error(error.message);
        },
    });

    useEffect(() => {
        productsRefetch();
    }, [activePage]);

    const handleDelete = async (e: any, id: string) => {
        e.preventDefault();
        await deleteProduct({
            variables: {
                id: id,
            },
        });
    };

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
                                <img
                                    className={s.restaurant__item_img}
                                    src={product.picture || ""}
                                    alt="img"
                                />
                                <h4 className={s.restaurant__item_title}>{product.title}</h4>
                                <div className={s.restaurant__item_price}>{product.price}$</div>
                                <div className={s.restaurant__item_btns}>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                        }}
                                        className={`${s.restaurant__item_btn} btn-style-one`}
                                    >
                                        Add to cart
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            handleDelete(e, product.id || "");
                                        }}
                                        className={s.restaurant__item_delete}
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
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
                    pages !== 1 && (
                        <>
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
            <Toaster position="bottom-left" reverseOrder={false} />
        </>
    );
};

export default ProductItems;
