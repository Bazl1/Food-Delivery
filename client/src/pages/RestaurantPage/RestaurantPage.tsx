import { useState } from "react";
import ProductItems from "../../components/ProductItems/ProductItems";
import s from "./RestaurantPage.module.scss";
import { ProductType } from "../../__generated__/graphql";

const RestaurantPage = () => {
    const [products, setProducts] = useState<ProductType[]>([]);

    return (
        <main className="main">
            <section className={s.restaurant}>
                <div className="container">
                    <div className={s.restaurant__inner}>
                        <div className={s.restaurant__box}>
                            <h2 className={s.restaurant__title}>Title</h2>
                            <h3 className={s.restaurant__subtitle}>
                                Found <span>10</span> products
                            </h3>
                            <img className={s.restaurant__banner} src={""} alt="banner" />
                        </div>
                        <ProductItems products={products} />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default RestaurantPage;
