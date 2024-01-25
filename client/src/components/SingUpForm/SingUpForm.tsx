import { useForm } from "react-hook-form";
import Input from "../Input/Input";
import s from "./SingUpForm.module.scss";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGN_UP_AS_CUSTOMER } from "../../graphql/RegistrationCustomer.mutation";

interface IForm {
    email: string;
    name: string;
    password: string;
}

const SingUpForm = () => {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [signUpAsCustomer, { error }] = useMutation(SIGN_UP_AS_CUSTOMER, {
        onCompleted: (data) => {
            if (
                data.signUpAsCustomer?.accessToken !== null &&
                data.signUpAsCustomer?.accessToken !== undefined
            ) {
                localStorage.setItem("token", data.signUpAsCustomer?.accessToken);
            }
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
        await signUpAsCustomer({
            variables: {
                email: email,
                password: password,
                userName: name,
            },
        });
        if (error) {
            throw new Error(error.message);
        }
    };

    return (
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
                text="Your name"
                type="text"
                name="name"
                value={name}
                setValue={setName}
                register={register}
                errors={errors}
                validationOptions={{
                    required: "Required field",
                    minLength: {
                        value: 2,
                        message: "Minimum 2 characters",
                    },
                    maxLength: {
                        value: 32,
                        message: "Maximum number of characters 32",
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
                        message: "Maximum password length 21 characters",
                    },
                }}
            />
            <button className={`${s.form__btn} btn-style-one`} type="submit">
                Register
            </button>
        </form>
    );
};

export default SingUpForm;
