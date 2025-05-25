import React, { useState } from 'react';
import { ListGroup, Form, Button, Badge } from 'react-bootstrap';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

const TaskItem = ({ task, onToggleComplete, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.text);
  const [editPriority, setEditPriority] = useState(task.priority || 'medium');

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(task.text);
    setEditPriority(task.priority || 'medium');
  };

  const handleSave = () => {
    if (editValue.trim() !== '') {
      onEdit(task.id, editValue, editPriority);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditValue(task.text);
    setEditPriority(task.priority || 'medium');
  };

  // Get the color for the priority badge
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  // Get the icon for the priority
  const getPriorityIcon = (priority) => {
    switch(priority) {
      case 'high': return 'bi-exclamation-triangle-fill';
      case 'medium': return 'bi-arrow-up-circle-fill';
      case 'low': return 'bi-arrow-down-circle-fill';
      default: return 'bi-arrow-up-circle-fill';
    }
  };

  // Format the creation date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <ListGroup.Item 
      className={`d-flex align-items-center todo-item ${task.completed ? 'completed-task' : ''}`}
    >
      {isEditing ? (
        <>
          <div className="d-flex flex-column flex-md-row w-100">
            <Form.Control 
              type="text" 
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-grow-1 me-md-2 mb-2 mb-md-0"
              autoFocus
            />
            <div className="d-flex">
              <Form.Select 
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                className="me-2 priority-select">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Form.Select>
              <Button 
                variant="success" 
                size="sm" 
                onClick={handleSave}
                className="me-1"
              >
                <FaCheck />
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={handleCancel}
              >
                <FaTimes />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <Form.Check 
            type="checkbox" 
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="me-3"
          />
          <div className="task-content flex-grow-1">
            <div className="d-flex align-items-center mb-1">
              <span className={task.completed ? 'completed-task' : ''}>{task.text}</span>
              <Badge 
                bg={getPriorityColor(task.priority)}
                className="ms-2 priority-badge"
              >
                <i className={`bi ${getPriorityIcon(task.priority)} me-1`}></i>
                {task.priority || 'medium'}
              </Badge>
            </div>
            {task.createdAt && (
              <small className="text-muted task-date">
                <i className="bi bi-calendar2 me-1"></i>
                {formatDate(task.createdAt)}
              </small>
            )}
          </div>
          <div className="todo-actions">
            <Button 
              variant="outline-primary" 
              size="sm" 
              onClick={handleEdit}
              className="me-1 action-button"
            >
              <FaEdit />
            </Button>
            <Button 
              variant="outline-danger" 
              size="sm" 
              onClick={() => onDelete(task.id)}
              className="action-button"
            >
              <FaTrash />
            </Button>
          </div>
        </>
      )}
    </ListGroup.Item>
  );
};

export default TaskItem;
