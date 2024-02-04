import s from "./ProductItemSkeleton.module.scss";
const ProductItemSkeleton = () => {
    return (
        <div className={s.restaurant__skeleton}>
            <div className={s.restaurant__skeleton_img}></div>
            <div className={s.restaurant__skeleton_title}></div>
            <div className={s.restaurant__skeleton_price}></div>
            <div className={s.restaurant__skeleton_btn}></div>
        </div>
    );
};

export default ProductItemSkeleton;
