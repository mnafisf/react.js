import React from 'react';
import PropTypes from 'prop-types';
import { Card, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const TaskList = ({ tasks, deleteTask, showEditForm, toggleComplete }) => {
    const priorityClassMap = {
        High: 'priority-high',
        Medium: 'priority-medium',
        Low: 'priority-low',
    };

    const getPriorityColor = (priority) => priorityClassMap[priority] || 'priority-low';

    return (
        <div className="task-list">
            {tasks.length === 0 ? (
                <p className="text-muted text-center">No tasks available</p>
            ) : (
                tasks.map((task) => (
                    <Card className="task-card mb-3" key={task.id}>
                        <Card.Body className="task-card-body d-flex justify-content-between align-items-center">
                            <div className="task-details">
                                <div className="task-label">Task</div>
                                <div className="task-name">{task.name}</div>
                            </div>
                            <div className="task-priority">
                                <div className="task-label">Priority</div>
                                <div className={getPriorityColor(task.priority)}>{task.priority}</div>
                            </div>
                            <div className="task-status">
                                <span className={`status-badge ${task.status.toLowerCase().replace(' ', '-')}`}>
                                    {task.status}
                                </span>
                            </div>
                            <div className="task-complete">
                                <input
                                    type="checkbox"
                                    checked={task.status === 'Done'}
                                    onChange={() => toggleComplete(task.id)}
                                    aria-label={`Mark task "${task.name}" as complete`}
                                />
                            </div>
                            <div className="icon-buttons d-flex">
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Edit Task</Tooltip>}
                                >
                                    <FaEdit
                                        onClick={() => showEditForm(task)}
                                        className="edit-icon mx-2"
                                        aria-label="Edit task"
                                        role="button"
                                    />
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Delete Task</Tooltip>}
                                >
                                    <FaTrash
                                        onClick={() => deleteTask(task.id)}
                                        className="delete-icon mx-2"
                                        aria-label="Delete task"
                                        role="button"
                                    />
                                </OverlayTrigger>
                            </div>
                        </Card.Body>
                    </Card>
                ))
            )}
        </div>
    );
};

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
            priority: PropTypes.oneOf(['Low', 'Medium', 'High']).isRequired,
            status: PropTypes.oneOf(['To Do', 'In Progress', 'Done']).isRequired,
        })
    ).isRequired,
    deleteTask: PropTypes.func.isRequired,
    showEditForm: PropTypes.func.isRequired,
    toggleComplete: PropTypes.func.isRequired,
};

export default TaskList;
