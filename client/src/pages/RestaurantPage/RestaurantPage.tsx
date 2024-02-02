import { useEffect, useState } from "react";
import ProductItems from "../../components/ProductItems/ProductItems";
import s from "./RestaurantPage.module.scss";
import { ProductType } from "../../__generated__/graphql";
import { useQuery } from "@apollo/client";
import { RESTAURANT_INFO, RESTAURANT_PRODUCTS } from "../../graphql/GetRastaurantInfo.query";
import { Link } from "react-router-dom";
import Search from "../../components/Search/Search";

const RestaurantPage = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [activePage, setActivePage] = useState<number>(0);
    const [userId, setUserId] = useState<string | undefined>(undefined);

    const {
        loading: restaurantInfoLoading,
        data,
        refetch,
    } = useQuery(RESTAURANT_INFO, {
        onCompleted(data) {
            setUserId(data.restaurantInfo?.id);
        },
    });

    const { loading: productLoading, refetch: productsRefetch } = useQuery(RESTAURANT_PRODUCTS, {
        variables: {
            page: activePage,
            limit: 2,
            restaurantId: userId,
        },
        onCompleted: (data) => {
            setProducts(data.search);
        },
    });

    useEffect(() => {
        refetch();
    }, []);

    return (
        <main className="main">
            <section className={s.restaurant}>
                <div className="container">
                    <div className={s.restaurant__inner}>
                        {!restaurantInfoLoading ? (
                            <div
                                className={
                                    data?.restaurantInfo?.bannerUrl === ""
                                        ? `${s.restaurant__box}`
                                        : `${s.restaurant__box} ${s.restaurant__box_banner}`
                                }
                            >
                                <h2 className={s.restaurant__title}>{data?.restaurantInfo?.name}</h2>
                                <h3 className={s.restaurant__subtitle}>
                                    Found <span>{products.length}</span> products
                                </h3>
                                <img
                                    className={s.restaurant__banner}
                                    src={data?.restaurantInfo?.bannerUrl}
                                    alt="banner"
                                />
                                <div className={s.restaurant__overlay}></div>
                            </div>
                        ) : (
                            <div className={s.restaurant__banner_skeleton}></div>
                        )}
                        {!restaurantInfoLoading ? (
                            <div className={s.restaurant__panel}>
                                <Link
                                    to={"/create-product"}
                                    className={`${s.restaurant__panel_create} btn-style-one`}
                                >
                                    Create product
                                </Link>
                                <Search />
                            </div>
                        ) : (
                            <div className={s.restaurant__panel}>
                                <div className={s.restaurant__panel_skeleton_btn}></div>
                                <div className={s.restaurant__panel_skeleton_btn}></div>
                            </div>
                        )}
                        <ProductItems
                            products={products}
                            pages={2}
                            loading={productLoading}
                            setActivePage={setActivePage}
                            activePage={activePage}
                            productsRefetch={productsRefetch}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default RestaurantPage;
