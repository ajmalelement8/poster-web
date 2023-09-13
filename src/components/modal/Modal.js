import './Modal.scss'

const Modal = ({ children, showModal,hideModal,size }) => {
    return (
        <div className={`modal-container ${showModal && 'active'}`}>

            <div className={`modal ${size}`}>
                <div onClick={hideModal} className="modal-close">
                    <span className=''>X</span>
                </div>
                
                {children}
            </div>
        </div>
    )
}

export default Modal