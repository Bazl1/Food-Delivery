import CatalogProductItems from "../../components/CatalogProductItems/CatalogProductItems";
import s from "./Catalog.module.scss";

const Catalog = () => {
    return (
        <main className="main">
            <section className="catalog">
                <div className="container">
                    <div className="catalog__inner">
                        <CatalogProductItems />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Catalog;
