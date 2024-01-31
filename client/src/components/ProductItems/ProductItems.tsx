import { Link } from "react-router-dom";
import { ProductType } from "../../__generated__/graphql";
import s from "./ProductItems.module.scss";

interface ProductItemsProps {
    products: ProductType[];
}
const ProductItems: React.FC<ProductItemsProps> = ({ products }) => {
    return (
        <div className={s.restaurant__items}>
            {products &&
                products.map((product) => {
                    return (
                        <Link key={product.id} to={`/product/:${product.id}`} className={s.restaurant__item}>
                            <img className={s.restaurant__item_img} src="#" alt="img" />
                            <h4 className={s.restaurant__item_title}>Product Titlte</h4>
                            <div className={s.restaurant__item_price}>10$</div>
                            <button className={`${s.restaurant__item_btn} btn-style-one`}>Add to cart</button>
                        </Link>
                    );
                })}
        </div>
    );
};

export default ProductItems;
