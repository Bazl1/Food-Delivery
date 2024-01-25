import GeneralSettings from "../../components/GeneralSettings/GeneralSettings";
import s from "./SettingsRestaurantPage.module.scss";

const SettingsRestaurantPage = () => {
    return (
        <main className="main">
            <section className={s.settings}>
                <div className="container">
                    <div className={s.settings__inner}>
                        <div className={s.settings__items}>
                            <div className={s.settings__item}>
                                <GeneralSettings />
                            </div>
                            <div className={s.settings__item}>
                                <GeneralSettings />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default SettingsRestaurantPage;
