import type { Modal } from "../../types"


const PopUp = ({ isOpen, onClose, children }: Modal) => {


  if (!isOpen) return null;
  return (

    <>
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
          <div className="modal-content">

        
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              />
            </div>

           
            <div className="modal-body">
              {children}
            </div>

          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={onClose} />
    </>


  )
}

export default PopUp