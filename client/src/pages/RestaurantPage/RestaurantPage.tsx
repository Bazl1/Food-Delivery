import { useEffect, useState } from "react";
import s from "./RestaurantPage.module.scss";
import { useQuery } from "@apollo/client";
import { ProductType } from "../../__generated__/graphql";
import { Link, useParams } from "react-router-dom";
import Search from "../../components/Search/Search";
import ProductItems from "../../components/ProductItems/ProductItems";
import { GET_RESTAURANT_BY_ID, RESTAURANT_PRODUCTS } from "../../graphql/GetRastaurantInfo.query";
import CatalogProductItems from "../../components/CatalogProductItems/CatalogProductItems";

const RestaurantPage = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [activePage, setActivePage] = useState<number>(0);
    const [pages, setPages] = useState<number>(0);
    const [userId, setUserId] = useState<string | null | undefined>(undefined);

    const { id = "" } = useParams<string>();

    const {
        loading: restaurantInfoLoading,
        data,
        refetch: restaurantInfoRefetch,
    } = useQuery(GET_RESTAURANT_BY_ID, {
        variables: {
            id: id.slice(1),
        },
        onCompleted(data) {
            setUserId(data.restaurantById?.id);
        },
    });

    const { loading: productLoading, refetch: productsRefetch } = useQuery(RESTAURANT_PRODUCTS, {
        variables: {
            page: activePage,
            limit: 4,
            restaurantId: userId,
        },
        onCompleted: (data) => {
            setProducts(data.search.products);
            setPages(data.search.pageCount);
        },
    });

    useEffect(() => {
        restaurantInfoRefetch();
        productsRefetch(); // разобраться
    }, []);

    return (
        <main className="main">
            <section className={s.restaurant}>
                <div className="container">
                    <div className={s.restaurant__inner}>
                        {!restaurantInfoLoading ? (
                            <div
                                className={
                                    data?.restaurantById?.bannerUrl === ""
                                        ? `${s.restaurant__box}`
                                        : `${s.restaurant__box} ${s.restaurant__box_banner}`
                                }
                            >
                                <h2 className={s.restaurant__title}>{data?.restaurantById?.name}</h2>
                                <h3 className={s.restaurant__subtitle}>
                                    Found <span>{products.length}</span> products
                                </h3>
                                <img
                                    className={s.restaurant__banner}
                                    src={data?.restaurantById?.bannerUrl || ""}
                                    alt="banner"
                                />
                                <div className={s.restaurant__overlay}></div>
                            </div>
                        ) : (
                            <div className={s.restaurant__banner_skeleton}></div>
                        )}
                        {!restaurantInfoLoading ? (
                            <div className={s.restaurant__panel}>
                                <Search
                                    setProducts={setProducts}
                                    setPages={setPages}
                                    userId={userId || null}
                                />
                            </div>
                        ) : (
                            <div className={s.restaurant__panel}>
                                <div className={s.restaurant__panel_skeleton_btn}></div>
                                <div className={s.restaurant__panel_skeleton_btn}></div>
                            </div>
                        )}
                        <CatalogProductItems
                            products={products}
                            pages={pages}
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
