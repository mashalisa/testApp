import type { MouseEvent } from "react";

type ButtonProps = {
  name: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) =>void
  disabled?: boolean
};

const Button = ({name, onClick, disabled}: ButtonProps) => {
    return (
        <>
            <button onClick={onClick} disabled = {disabled}>{name}</button>
        </>
    )
}

export default Button