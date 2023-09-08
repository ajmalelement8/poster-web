import './Modal.scss'

const Modal = ({ children, showModal,hideModal }) => {
    return (
        <div className={`modal-container ${showModal && 'active'}`}>

            <div className="modal">
                <div className="modal-close">
                    <span onClick={hideModal} className=''>X</span>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal