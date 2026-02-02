import SubTitle from "../basic/SubTitle"
import Submit from '../form/Submit'

type StepSelectorType<T> = {
    title: string
    description: string
    availableTitle: string
    items: T[]
    selectedIds: string[]
    onSelect: (id: string) => void
    onSubmit: () => void
    isLoading?: boolean
    teacherItems: T[]
    name: string
}

function StepSelector<T extends { id: string; name: string }>({
    title,
    description,
    availableTitle,
    items,
    selectedIds,
    onSelect,
    onSubmit,
    isLoading,
    teacherItems,
    name
}: StepSelectorType<T>) {
    return (
        <>
            <SubTitle name={title} direction="text-center" />
            <p className="text-muted text-center mb-4">
                {description}
            </p>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <SubTitle name={availableTitle} direction="text-center" />
                    <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
                        <div className="list">
                            {items && items.map((item) => {
                                const isSelected = selectedIds.includes(item.id);
                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        className={`btn btn-sm rounded-pill px-3 py-2 fw-semibold ms-1 me-1 ${isSelected ? "btn-primary" : "btn-outline-secondary"
                                            }`}
                                        onClick={() => onSelect(item.id)}
                                    >
                                        {isSelected && <i className="bi bi-check2 me-1"></i>}
                                        {item.name}
                                    </button>
                                )


                            })}
                        </div>
                        {isLoading && (
                            <div className="text-center my-3">
                                <div className="spinner-border spinner-border-sm" />
                            </div>
                        )}
                    </div>

                    <div className="d-grid mb-4">
                        <Submit name={`set your ${name}`} onClick={onSubmit} />
                    </div>

                </div>




                <div className="col-md-6">
                    <SubTitle name={` your ${name}`} />
                    <ul className="list-group mb-4">
                        {teacherItems && teacherItems.map((teachItem) => (
                            <li
                                key={teachItem.id}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                {teachItem.name}
                                <span className="badge bg-success">Selected</span>
                            </li>
                        ))}
                    </ul>
                    {!teacherItems.length && (
                        <div className="text-muted text-center py-3">
                            No {name} selected yet
                        </div>
                    )}
                </div>

            </div>





        </>



    )
}

export default StepSelector