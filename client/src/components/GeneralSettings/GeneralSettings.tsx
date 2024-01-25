import { useRef, useState } from "react";
import Input from "../Input/Input";
import s from "./GeneralSettings.module.scss";
import { useForm } from "react-hook-form";
import Textarea from "../Textarea/Textarea";
import { BsImages } from "react-icons/bs";

interface IForm {
    name: string;
    description: string;
}

const GeneralSettings = () => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [imgUrl, setImgUrl] = useState<any>("");

    const load = true;
    const refImg = useRef<HTMLImageElement | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>({
        mode: "onBlur",
    });

    const Submit = async () => {};

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

    return (
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
                    {load ? (
                        <div className={s.settings__skeleton}>
                            <BsImages />
                        </div>
                    ) : (
                        <img
                            ref={refImg}
                            id="file_upload"
                            src=""
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
                    text="Change description"
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
    );
};

export default GeneralSettings;
