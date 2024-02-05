import { Link } from "react-router-dom";
import s from "./RestaurantsPage.module.scss";
import { useQuery } from "@apollo/client";
import { GET_ALL_RESTAURANT } from "../../graphql/GetAllRestaurant.query";
import { useEffect, useState } from "react";
import { RestaurantType } from "../../__generated__/graphql";

const RestaurantsPage = () => {
    const [restaurant, setRestaurant] = useState<RestaurantType[] | undefined>(undefined);
    const { refetch } = useQuery(GET_ALL_RESTAURANT, {
        onCompleted(data) {
            setRestaurant(data.restaurants);
        },
    });

    useEffect(() => {
        refetch();
    }, []);
    return (
        <main className="main">
            <section className={s.restaurants}>
                <div className="container">
                    <div className={s.restaurants__inner}>
                        <h2 className={s.restaurants__title}>List of all restaurants</h2>
                        <div className={s.restaurants__items}>
                            {restaurant &&
                                restaurant.map((rest) => {
                                    return (
                                        <Link
                                            key={rest.id}
                                            to={`/restaurant/:${rest.id}`}
                                            className={
                                                rest.bannerUrl === ""
                                                    ? `${s.restaurants__item}`
                                                    : `${s.restaurants__item} ${s.restaurants__item_banner}`
                                            }
                                        >
                                            <h3 className={s.restaurants__item_title}>{rest.name}</h3>
                                            <p className={s.restaurants__text}>{rest.description}</p>
                                            <div className={s.restaurants__overlay}></div>
                                            <img
                                                className={s.restaurants__banner}
                                                src={rest.bannerUrl || ""}
                                                alt="banner"
                                            />
                                        </Link>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default RestaurantsPage;
