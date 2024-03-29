import { useForm } from "react-hook-form";
import { FaArrowRightLong } from "react-icons/fa6";
import s from "./Search.module.scss";
import { useState } from "react";
import { ProductType } from "../../__generated__/graphql";
import { useLazyQuery } from "@apollo/client";
import { SEARCH } from "../../graphql/Search.query";
import { useNavigate } from "react-router-dom";

interface IForm {
    search: string;
}

interface SearchProps {
    setProducts?: (value: ProductType[]) => void;
    setPages?: (value: number) => void;
    userId?: string | null;
    redirect?: boolean;
}

const Search: React.FC<SearchProps> = ({ setProducts, setPages, userId = null, redirect = false }) => {
    const [text, setText] = useState<string>("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>({
        mode: "onBlur",
    });

    const navigate = useNavigate();

    const [searchOnRestaurant] = useLazyQuery(SEARCH, {
        onCompleted(data) {
            setProducts(data.search.products);
            setPages(data.search.pageCount);
        },
    });
    const Submit = async () => {
        if (redirect) {
            navigate(`/search/:${text}`);
        } else {
            searchOnRestaurant({
                variables: {
                    page: 0,
                    limit: -1,
                    restaurantId: userId,
                    predicate: text,
                },
            });
        }
    };

    return (
        <form className={s.search} onSubmit={handleSubmit(Submit)}>
            <div className={s.search__box}>
                <input
                    {...register("search", {
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
