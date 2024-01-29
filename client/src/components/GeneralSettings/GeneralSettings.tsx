import { useRef, useState } from "react";
import Input from "../Input/Input";
import s from "./GeneralSettings.module.scss";
import { useForm } from "react-hook-form";
import Textarea from "../Textarea/Textarea";
import toast, { Toaster } from "react-hot-toast";
import { BsImages } from "react-icons/bs";
import { useMutation, useQuery } from "@apollo/client";
import { GET_RESTAURANT_BANNER } from "../../graphql/GetRestaurantInfo.query";
import { CHANGE_GENERAL_SETTINGS } from "../../graphql/GeneralSettings.mutation";

interface IForm {
    name: string;
    description: string;
}

const GeneralSettings = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [imgUrl, setImgUrl] = useState<any>(undefined);

    const refImg = useRef<HTMLImageElement | null>(null);

    useQuery(GET_RESTAURANT_BANNER, {
        onCompleted(data) {
            setImgUrl(data.restaurantInfo?.bannerUrl);
        },
    });

    const [updateRestaurant] = useMutation(CHANGE_GENERAL_SETTINGS);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>({
        mode: "onBlur",
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

        const response = await fetch("http://localhost:5234/api/images", {
            method: "POST",
            body: formData,
        }).catch(() => {
            toast.error("Error loading image");
            throw new Error("Error loading image");
        });

        const responseData = await response.json();

        updateRestaurant({
            variables: {
                name: name,
                description: description,
                banner: "",
            },
        });
    };

    return (
        <>
            <div className={s.settings}>
                <h3 className={s.settings__title}>General settings</h3>
                <form className={s.settings__form} onSubmit={handleSubmit(Submit)}>
                    <label className={s.settings__input_file_upload}>
                        <input
                            className={s.settings__upload_input}
                            type="file"
                            onChange={readURL}
                            accept="image/png, image/jpeg"
                        />
                        {imgUrl === undefined || imgUrl === "" ? (
                            <div className={s.settings__skeleton}>
                                <BsImages />
                            </div>
                        ) : (
                            <img
                                ref={refImg}
                                id="file_upload"
                                src={imgUrl}
                                alt="banner"
                                className={s.settings__upload_img}
                            />
                        )}
                    </label>
                    <Input
                        text="Change your restaurant name"
                        type="text"
                        name="name"
                        value={name}
                        setValue={setName}
                        register={register}
                        errors={errors}
                        validationOptions={{
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
                        text="Change description"
                        name="description"
                        value={description}
                        setValue={setDescription}
                        register={register}
                        errors={errors}
                        validationOptions={{
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
                    <button className={`${s.settings__btn} btn-style-one`} type="submit">
                        Save changes
                    </button>
                </form>
            </div>
            <Toaster position="bottom-left" reverseOrder={false} />
        </>
    );
};

export default GeneralSettings;
