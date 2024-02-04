import { useQuery } from "@apollo/client";
import CatalogProductItems from "../../components/CatalogProductItems/CatalogProductItems";
import s from "./Catalog.module.scss";
import "./Select.scss";
import { SEARCH } from "../../graphql/Search.query";
import { useEffect, useState } from "react";
import { ProductType } from "../../__generated__/graphql";
import Search from "../../components/Search/Search";
import Select from "react-select";
import { categorys } from "../../assets/utils/Categorys";

const Catalog = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [pages, setPages] = useState<number>(0);
    const [activePage, setActivePage] = useState<number>(0);
    const [category, setCategory] = useState<any>([]);
    const [priceFilter, setPriceFilter] = useState<any>(null);

    const { refetch, loading } = useQuery(SEARCH, {
        variables: {
            page: activePage,
            limit: 12,
            restaurantId: null,
            predicate: null,
            filtering: priceFilter?.value,
        },
        onCompleted(data) {
            setProducts(data.search.products);
            setPages(data.search.pageCount);
        },
    });

    useEffect(() => {
        refetch();
    }, []);

    return (
        <main className="main">
            <section className={s.catalog}>
                <div className="container">
                    <div className={s.catalog__inner}>
                        <div className={s.catalog__top}>
                            <Search setProducts={setProducts} setPages={setPages} userId={null} />
                            <Select
                                name="categorys"
                                options={[
                                    {
                                        value: "PriceLowestFirst",
                                        label: "Price lowers first",
                                    },
                                    {
                                        value: "PriceHighestFirst",
                                        label: "Price highest first",
                                    },
                                ]}
                                value={priceFilter}
                                onChange={(selectedOptions) => setPriceFilter(selectedOptions)}
                                className="basic-select"
                                classNamePrefix="select"
                            />
                            <Select
                                name="categorys"
                                options={categorys}
                                value={category}
                                onChange={(selectedOptions) => setCategory(selectedOptions)}
                                className="basic-select"
                                classNamePrefix="select"
                            />
                        </div>
                        <CatalogProductItems
                            products={products}
                            pages={pages}
                            activePage={activePage}
                            setActivePage={setActivePage}
                            loading={loading}
                            productsRefetch={refetch}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Catalog;
