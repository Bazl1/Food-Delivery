import { useEffect, useState } from "react";
import CatalogProductItems from "../../components/CatalogProductItems/CatalogProductItems";
import s from "./SearchPage.module.scss";
import { ProductType } from "../../__generated__/graphql";
import { useQuery } from "@apollo/client";
import { SEARCH } from "../../graphql/Search.query";
import { useParams } from "react-router-dom";
import Select from "react-select";

const SearchPage = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [pages, setPages] = useState<number>(0);
    const [priceFilter, setPriceFilter] = useState<any>(null);
    const [activePage, setActivePage] = useState<number>(0);

    const { search } = useParams();

    const { loading, refetch } = useQuery(SEARCH, {
        variables: {
            page: activePage,
            limit: 12,
            predicate: search?.slice(1),
            filtering: priceFilter?.value,
        },
        onCompleted(data) {
            setProducts(data.search.products);
            setPages(data.search.pageCount);
        },
    });

    useEffect(() => {
        refetch();
    });

    return (
        <main className="main">
            <section className={s.search}>
                <div className="container">
                    <div className={s.search__inner}>
                        <div className={s.search__top}>
                            <h2 className={s.search__title}>Your search query</h2>
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
                        </div>
                        <CatalogProductItems
                            products={products}
                            pages={pages}
                            setActivePage={setActivePage}
                            activePage={activePage}
                            loading={loading}
                            productsRefetch={refetch}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default SearchPage;
