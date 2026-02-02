
import type { InputProps } from "../../types";
const Input = ({ name, type, value, label_name, placeholder, onChange }: InputProps) => {
    if (type === "radio") {
        return (
            <div className="form-check mb-2">
                <input
                    className="form-check-input"
                    type="radio"
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    id={`${name}-${value}`}
                />
                <label
                    className="form-check-label"
                    htmlFor={`${name}-${value}`}
                >
                    {label_name}
                </label>
            </div>
        );
    }
    return (
        <div className="input-container text-start mb-3">
            <label htmlFor={name}>{label_name}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="form-control"
            ></input>
        </div>
    )
}

export default Input