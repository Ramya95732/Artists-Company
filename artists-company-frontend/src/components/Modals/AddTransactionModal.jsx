import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

const AddTransactionModal = ({ show, handleClose, handleSave, formData, handleFormChange }) => (
  <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>
        <FontAwesomeIcon icon={faPlus} /> Add Transaction
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className='p-3'>
      <Form>
        <Form.Group controlId="formType">
          <Form.Label>Type</Form.Label>
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
        <Form.Group controlId="formAmount">
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
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleFormChange}
          />
        </Form.Group>
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

export default AddTransactionModal;
