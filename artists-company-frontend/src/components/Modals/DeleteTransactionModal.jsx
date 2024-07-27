// src/components/modals/DeleteTransactionModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const DeleteTransactionModal = ({ show, handleClose, handleDelete }) => (
  <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>
        <FontAwesomeIcon icon={faTrashAlt} /> Confirm Deletion
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Are you sure you want to delete this transaction?
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Cancel
      </Button>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
);

export default DeleteTransactionModal;
