
import type { SelectProps } from "../../types"

const Select = ({ options, value, name, className, onChange }: SelectProps,) => {

    return (
        <div className="select">
            <select
                value={value}
                name={name}
                onChange={onChange}
                className={`form-select ${className}`}
            >
                <option value="">Select option</option>
                {options.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                        {opt.name}
                    </option>
                ))}

            </select>
        </div>
    )
}
export default Select