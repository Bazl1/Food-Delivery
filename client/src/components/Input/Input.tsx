import s from "./Input.module.scss";

interface InputProps {
    text: string;
    type: string;
    name: string;
    value: string;
    setValue: (value: string) => void;
    register: any;
    errors: any;
    validationOptions?: any;
}

const Input: React.FC<InputProps> = ({
    text,
    type,
    name,
    value,
    setValue,
    register,
    errors,
    validationOptions,
}) => {
    return (
        <label className={s.input__label}>
            <input
                {...register(name, validationOptions)}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className={s.input}
                type={type}
                placeholder={text}
            />
            {errors[name] && <p className={s.input__error}>{errors[name]?.message}</p>}
        </label>
    );
};

export default Input;
