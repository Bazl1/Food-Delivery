import { useState } from "react";
import Input from "../Input/Input";
import s from "./SecuritySetting.module.scss";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import toast, { Toaster } from "react-hot-toast";
import { CHANGE_PASSWORD } from "../../graphql/ChangePassword.mutation";

interface IForm {
    password: string;
    confirmPassword: string;
}

const SecuritySetting = () => {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>({
        mode: "onBlur",
    });

    const [passwordChange] = useMutation(CHANGE_PASSWORD, {
        onCompleted() {
            toast.success("Password changed successfully");
        },
        onError(error) {
            toast.error(error.message);
        },
    });

    const Submit = async () => {
        if (password === confirmPassword) {
            await passwordChange({
                variables: {
                    oldPassword: oldPassword,
                    password: password,
                },
            });
        } else {
            toast.error("Password mismatch");
        }
    };

    return (
        <>
            <div className={s.settings}>
                <h3 className={s.settings__title}>Security settings</h3>
                <form className={s.settings__form} onSubmit={handleSubmit(Submit)}>
                    <Input
                        text="Enter your old password"
                        type="password"
                        name="oldpassword"
                        value={oldPassword}
                        setValue={setOldPassword}
                        register={register}
                        errors={errors}
                        validationOptions={{
                            required: "Required field",
                            minLength: {
                                value: 8,
                                message: "Minimum password length 8 characters",
                            },
                            maxLength: {
                                value: 21,
                                message: "Maximum password length 21 characters",
                            },
                        }}
                    />
                    <Input
                        text="Change your password"
                        type="password"
                        name="password"
                        value={password}
                        setValue={setPassword}
                        register={register}
                        errors={errors}
                        validationOptions={{
                            required: "Required field",
                            minLength: {
                                value: 8,
                                message: "Minimum password length 8 characters",
                            },
                            maxLength: {
                                value: 21,
                                message: "Maximum password length 21 characters",
                            },
                        }}
                    />
                    <Input
                        text="Confirm your password"
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        register={register}
                        errors={errors}
                        validationOptions={{
                            required: "Required field",
                            minLength: {
                                value: 8,
                                message: "Minimum password length 8 characters",
                            },
                            maxLength: {
                                value: 21,
                                message: "Maximum password length 21 characters",
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

export default SecuritySetting;
