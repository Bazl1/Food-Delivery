import { useRef, useState } from "react";
import s from "./CreateProduct.module.scss";
import { BsImages } from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import Textarea from "../../components/Textarea/Textarea";
import Select from "react-select";
import { categorys } from "../../assets/utils/Categorys";
import "./Select.scss";
import { useMutation } from "@apollo/client";
import { CREATE_PRODUCT } from "../../graphql/CreateProduct.mutation";
// import { RESTAURANT_PRODUCTS } from "../../graphql/GetRastaurantInfo.query";

interface IForm {
    name: string;
}

const CreateProduct = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [category, setCategory] = useState<any>([]);
    const [price, setPrice] = useState<string>("");
    const [imgUrl, setImgUrl] = useState<any>(undefined);

    const refImg = useRef<HTMLImageElement | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>({
        mode: "onBlur",
    });

    const [createProduct] = useMutation(CREATE_PRODUCT, {
        onCompleted() {
            toast.success("Product successfully created");
            setName("");
            setDescription("");
            setCategory([]);
            setPrice("");
            setImgUrl(undefined);
        },
        onError(error) {
            toast.success(error.message);
        },
        // update(cache, { data: { createProduct } }: any) {
        //     const { search }: any = cache.readQuery({ query: RESTAURANT_PRODUCTS });

        //     cache.writeQuery({
        //         query: RESTAURANT_PRODUCTS,
        //         data: {
        //             search: [createProduct, ...search],
        //         },
        //     });
        // },
    });

    const readURL = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            setImgUrl(input.files[0]);
            reader.onload = function (e) {
                if (refImg.current) {
                    refImg.current.src = e.target?.result as string;
                }
            };
            reader.readAsDataURL(input.files[0]);
        }
    };

    const Submit = async () => {
        const formData = new FormData();
        formData.append("image", imgUrl);

        const response = await fetch("http://localhost:5075/api/images", {
            method: "POST",
            body: formData,
        }).catch(() => {
            toast.error("Error loading image");
            throw new Error("Error loading image");
        });
        const responseData = await response.json();

        const categoryOfStrings = category.map((obj: any) => obj.value);

        createProduct({
            variables: {
                title: name,
                description: description,
                picture: responseData.url,
                price: price,
                categories: categoryOfStrings,
            },
        });
    };

    return (
        <>
            <main className="main">
                <section className={s.create}>
                    <div className="container">
                        <div className={s.create__inner}>
                            <div className={s.create__box}>
                                <h2 className={s.create__title}>Add your product</h2>
                                <form className={s.create__form} onSubmit={handleSubmit(Submit)}>
                                    <label className={s.create__input_file_upload}>
                                        <input
                                            className={s.create__upload_input}
                                            type="file"
                                            onChange={readURL}
                                            accept="image/png, image/jpeg"
                                        />
                                        {imgUrl === undefined || imgUrl === "" ? (
                                            <div className={s.create__skeleton}>
                                                <BsImages />
                                            </div>
                                        ) : (
                                            <img
                                                ref={refImg}
                                                id="file_upload"
                                                src={imgUrl}
                                                alt="banner"
                                                className={s.create__upload_img}
                                            />
                                        )}
                                    </label>
                                    <Input
                                        text="Product name"
                                        name="title"
                                        type="text"
                                        value={name}
                                        setValue={setName}
                                        register={register}
                                        errors={errors}
                                        validationOptions={{
                                            required: "Required field",
                                            minLength: {
                                                value: 5,
                                                message: "Minimum length 5 characters",
                                            },
                                            maxLength: {
                                                value: 100,
                                                message: "Maximum length 100 characters",
                                            },
                                        }}
                                    />
                                    <Textarea
                                        text="Product description"
                                        name="description"
                                        value={description}
                                        setValue={setDescription}
                                        register={register}
                                        errors={errors}
                                        validationOptions={{
                                            required: "Required field",
                                            minLength: {
                                                value: 5,
                                                message: "Minimum length 5 characters",
                                            },
                                            maxLength: {
                                                value: 1000,
                                                message: "Maximum length 1000 characters",
                                            },
                                        }}
                                    />
                                    <Select
                                        isMulti
                                        name="categorys"
                                        options={categorys}
                                        value={category}
                                        onChange={(selectedOptions) => setCategory(selectedOptions)}
                                        className="basic-multi-select"
                                        classNamePrefix="category-select"
                                    />
                                    <Input
                                        text="Price in $"
                                        name="price"
                                        type="number"
                                        value={price}
                                        setValue={setPrice}
                                        register={register}
                                        errors={errors}
                                        validationOptions={{
                                            required: "Required field",
                                        }}
                                    />
                                    <button className={`${s.create__btn} btn-style-one`}>
                                        Create Product
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Toaster position="bottom-left" reverseOrder={false} />
        </>
    );
};

export default CreateProduct;
