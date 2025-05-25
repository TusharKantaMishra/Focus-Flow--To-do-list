import React, { useState, useRef, useEffect } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';

const TaskForm = ({ onAddTask }) => {
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState('medium');
  const inputRef = useRef(null);

  // Focus the input field when component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      // Pass both the text and priority to the parent
      onAddTask(inputValue, priority);
      setInputValue('');
      setPriority('medium');
      // Refocus the input after submit
      inputRef.current.focus();
    }
  };

  const getPriorityClass = () => {
    switch(priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  return (
    <div className="task-form-container glassmorphism p-4 mb-4">
      <h5 className="mb-3">Add New Task</h5>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} lg={9}>
            <InputGroup className="mb-3">
              <InputGroup.Text className={`priority-indicator ${getPriorityClass()}`}>
                <i className="bi bi-list-task text-white"></i>
              </InputGroup.Text>
              <Form.Control 
                ref={inputRef}
                type="text" 
                placeholder="What needs to be done?" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="shadow-sm"
              />
            </InputGroup>
          </Col>
          <Col xs={12} lg={3}>
            <div className="d-flex h-100">
              <Form.Select 
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="me-2 shadow-sm">
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Form.Select>
              <Button 
                variant="tertiary" 
                type="submit" 
                className="shadow-sm flex-grow-1 add-button"
                disabled={inputValue.trim() === ''}
              >
                <i className="bi bi-plus-lg me-1"></i>
                Add
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TaskForm;
