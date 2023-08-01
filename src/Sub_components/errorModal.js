import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ErrorMessage = ({isOpen, setIsOpen, title, body}) => {
    if (!isOpen) return null;
    return (
        <Modal show={isOpen} onHide={() => setIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
export default ErrorMessage;