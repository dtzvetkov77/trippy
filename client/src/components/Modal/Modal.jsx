import ReactDOM from 'react-dom';
import './Modal.css'

const Modal = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <div className='modal-header'>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
       
        </div> 
        <div className='modal-body'>{children}</div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;