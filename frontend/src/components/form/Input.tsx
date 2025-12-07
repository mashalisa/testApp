import type  { ChangeEvent } from "react";
type InputProps = {
  name: string;
  type: string;
  value: string;
  label_name: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
const Input = ({ name, type, value, label_name, placeholder, onChange }: InputProps) => {
    return (
        <div className="input-container">
            <label htmlFor={name}>{label_name}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            ></input>
        </div>
    )
}

export default Input