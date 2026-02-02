import type { MouseEvent } from "react";

type ButtonProps = {
    name: string;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean,
    className?: string;
};

const Button = ({ name, onClick, disabled, className = "btn-primary" }: ButtonProps) => {
    return (
        <>
            <button type="button" className={`btn w-100 mb-3 ${className}`}
                onClick={onClick} disabled={disabled}>{name}
            </button>
        </>
    )
}

export default Button