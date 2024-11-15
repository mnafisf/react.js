import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';

const defaultTask = { name: '', priority: 'Medium', status: 'To Do' };

const TaskForm = ({ show, handleClose, addTask, editTask, taskToEdit }) => {
    const [task, setTask] = useState(defaultTask);
    const [error, setError] = useState('');

    useEffect(() => {
        if (taskToEdit) {
            setTask(taskToEdit);
        } else {
            setTask(defaultTask); // Reset form on close
            setError(''); // Reset error on close
        }
    }, [taskToEdit]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (!task.name.trim()) {
            setError('Task name cannot be empty.');
            return;
        }
        taskToEdit ? editTask(task) : addTask(task);
        setTask(defaultTask);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>{taskToEdit ? 'Edit Task' : 'Add Task'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="taskName">
                        <Form.Label>Task</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={task.name}
                            onChange={handleChange}
                            placeholder="Enter task name"
                            isInvalid={!!error}
                        />
                        <Form.Control.Feedback type="invalid">
                            {error}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="taskPriority">
                        <Form.Label>Priority</Form.Label>
                        <Form.Control as="select" name="priority" value={task.priority} onChange={handleChange}>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="taskStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" name="status" value={task.status} onChange={handleChange}>
                            <option>To Do</option>
                            <option>In Progress</option>
                            <option>Done</option>
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button 
                    variant="primary" 
                    onClick={handleSubmit} 
                    disabled={!task.name.trim()}
                >
                    {taskToEdit ? 'Update Task' : 'Add Task'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

TaskForm.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
    taskToEdit: PropTypes.object
};

TaskForm.defaultProps = {
    taskToEdit: null
};

export default TaskForm;
