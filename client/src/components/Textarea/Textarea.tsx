import s from "./Textarea.module.scss";

interface InputProps {
    text: string;
    name: string;
    value: string;
    setValue: (value: string) => void;
    register: any;
    errors: any;
    validationOptions?: any;
}
const Textarea: React.FC<InputProps> = ({
    text,
    name,
    value,
    setValue,
    register,
    errors,
    validationOptions,
}) => {
    return (
        <label className={s.input__label}>
            <textarea
                {...register(name, validationOptions)}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={s.input}
                placeholder={text}
                rows="5"
            ></textarea>
            {errors[name] && <p className={s.input__error}>{errors[name]?.message}</p>}
        </label>
    );
};

export default Textarea;
