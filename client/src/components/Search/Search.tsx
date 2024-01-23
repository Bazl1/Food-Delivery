import { useForm } from "react-hook-form";
import { FaArrowRightLong } from "react-icons/fa6";
import s from "./Search.module.scss";
import { useState } from "react";

interface IForm {
    search: string;
}

const Search = () => {
    const [text, setText] = useState<string>("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>({
        mode: "onBlur",
    });

    const Submit = async () => {};

    return (
        <form className={s.search} onSubmit={handleSubmit(Submit)}>
            <div className={s.search__box}>
                <input
                    {...register("search", {
                        required: "Required field",
                        minLength: {
                            value: 2,
                            message: "Minimum password length 2 characters",
                        },
                        maxLength: {
                            value: 100,
                            message: "Maximum password length 100 characters",
                        },
                    })}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className={s.search__input}
                    type="text"
                    placeholder="Search..."
                />
                {errors.search && <p className={s.search__error}>{errors.search?.message}</p>}
            </div>
            <button className={s.search__btn} type="submit">
                <FaArrowRightLong />
            </button>
        </form>
    );
};

export default Search;
