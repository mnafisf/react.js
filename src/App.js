// src/App.js

import React, { useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPlus } from 'react-icons/fa';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const openFormToAdd = () => {
    setTaskToEdit(null); // Clear editing task
    setShowForm(true);
  };

  const openFormToEdit = (task) => {
    setTaskToEdit(task);
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, { ...task, id: Date.now() }]);
  };

  const editTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }
  };

  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: task.status === 'Done' ? 'To Do' : 'Done' } : task
      )
    );
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleFilterChange = (e) => setStatusFilter(e.target.value);

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
  };

  const filteredTasks = tasks.filter((task) =>
    (statusFilter === 'All' || task.status === statusFilter) &&
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="my-5">
      <h1 className="mb-4">Task List</h1>
      <Button variant="primary" onClick={openFormToAdd} className="add-task-btn">
        <FaPlus /> Add Task
      </Button>

      <Form.Control
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={handleSearch}
        className="mt-3"
      />

      <Form.Select
        onChange={handleFilterChange}
        className="mt-3"
        value={statusFilter}
      >
        <option value="All">All</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </Form.Select>

      <Button variant="secondary" onClick={resetFilters} className="mt-3">
        Reset Filters
      </Button>

      <div className="mt-4">
        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          showEditForm={openFormToEdit}
          toggleComplete={toggleComplete}
        />
        {showForm && (
          <TaskForm
            show={showForm}
            handleClose={closeForm}
            addTask={addTask}
            editTask={editTask}
            taskToEdit={taskToEdit}
          />
        )}
      </div>
    </Container>
  );
}

export default App;
