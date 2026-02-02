import type { ReactNode } from "react"
type CardProps = {
    children: ReactNode;
    className?: string
    width?: string
};
const Card = ({ children, className, width }: CardProps) => {
    if (!width) {
        width = 'col-md-6 col-lg-6'

    }
    return (

        <div className={` ${width} mb-4 ${className}`}>
            <div className="card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                    {children}
                </div>
            </div>
        </div>


    )
}

export default Card