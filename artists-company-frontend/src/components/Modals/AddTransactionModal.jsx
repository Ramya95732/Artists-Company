import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

const AddTransactionModal = ({ show, handleClose, handleSave, formData, handleFormChange }) => {
  useEffect(() => {
    if (show) {
      const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
      handleFormChange({ target: { name: 'date', value: today } });
    }
  }, [show, handleFormChange]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <FontAwesomeIcon icon={faPlus} /> Add Transaction
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-3'>
        <Form>
          <Form.Group controlId="formType" className='mb-3'>
            <Form.Label>Transaction Type</Form.Label>
            <Form.Control
              as="select"
              name="type"
              value={formData.type}
              onChange={handleFormChange}
            >
              <option value="">Select Type</option>
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formAmount" className='mb-3'>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleFormChange}
              min="0"
            />
            <Form.Text className="text-muted">
              Amount should be positive.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formDescription" className='mb-3'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
            />
          </Form.Group>
          {/* Date field removed */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} /> Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          <FontAwesomeIcon icon={faSave} /> Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTransactionModal;
