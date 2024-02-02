import SecuritySetting from "../../components/SecuritySetting/SecuritySetting";
import s from "./SettingsPage.module.scss";

const SettingsPage = () => {
    return (
        <main className="main">
            <section className={s.settings}>
                <div className="container">
                    <div className={s.settings__inner}>
                        <div className={s.settings__items}>
                            <div className={s.settings__item}>
                                <SecuritySetting />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default SettingsPage;
