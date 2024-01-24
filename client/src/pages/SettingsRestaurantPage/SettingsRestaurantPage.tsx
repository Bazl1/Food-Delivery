import GeneralSettings from "../../components/GeneralSettings/GeneralSettings";
import s from "./SettingsRestaurantPage.module.scss";

const SettingsRestaurantPage = () => {
    return (
        <main className="main">
            <section className="settings">
                <div className="container">
                    <div className="settings__inner">
                        <h2 className="settings__title">Settings</h2>
                        <div className="settings__btns">
                            <button className="settings__btn">General Settings</button>
                            <button className="settings__btn">Security Settings</button>
                        </div>

                        <div className="settings__item">
                            <GeneralSettings />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default SettingsRestaurantPage;
