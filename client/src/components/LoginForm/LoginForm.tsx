import { useState } from "react";
import s from "./LoginForm.module.scss";
import Input from "../Input/Input";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { AUTH } from "../../graphql/Authorization.mutation.ts";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface IForm {
    email: string;
    password: string;
}

const LoginForm = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    const [signIn] = useMutation(AUTH, {
        onCompleted: (data) => {
            if (data.signIn?.accessToken !== null && data.signIn?.accessToken !== undefined) {
                localStorage.setItem("token", data.signIn?.accessToken);
            }
        },
        onError(error) {
            toast.error(error.message);
            throw new Error(error.message);
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>({
        mode: "onBlur",
    });

    const Submit = async () => {
        await signIn({
            variables: {
                email: email,
                password: password,
            },
        });
        navigate("/");
    };
    return (
        <>
            <form className={s.form} onSubmit={handleSubmit(Submit)}>
                <Input
                    text="Your email"
                    type="email"
                    name="email"
                    value={email}
                    setValue={setEmail}
                    register={register}
                    errors={errors}
                    validationOptions={{
                        required: "Required field",
                        pattern: {
                            value: /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
                            message: "Enter a valid email",
                        },
                    }}
                />
                <Input
                    text="Your password"
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
                            message: "Maximum password length 8 characters",
                        },
                    }}
                />
                <button className={`${s.form__btn} btn-style-one`} type="submit">
                    Login
                </button>
            </form>
            <Toaster position="bottom-left" reverseOrder={false} />
        </>
    );
};

export default LoginForm;
