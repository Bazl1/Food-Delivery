import s from "./SingleProduct.module.scss";
import demo from "../../assets/img/banner.png";

const SingleProduct = () => {
    return (
        <main className="main">
            <section className={s.product}>
                <div className="container">
                    <div className={s.product__inner}>
                        <div className={s.product__columns}>
                            <img className={s.product__img} src={demo} alt="img" />
                        </div>
                        <div className={s.product__columns}>
                            <h2 className={s.product__title}>Product titlte</h2>
                            <h4 className={s.product__price}>10$</h4>
                            <p className={s.product__text}>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus rerum
                                dolores reiciendis perferendis, molestias doloribus excepturi maiores! Est,
                                deserunt debitis fuga magni vero culpa illo explicabo quis dolore nisi labore.
                                Alias minus autem commodi, perspiciatis voluptas fugiat earum facilis eum
                                sunt! Vel illo eius error minima corrupti? Ratione quae earum enim numquam
                                sit. Perferendis saepe, debitis voluptas dicta cumque suscipit.
                            </p>
                            <button className={`${s.product__btn} btn-style-one`}>Add to cart</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default SingleProduct;
