import React from 'react';
import { Row, Col, Button, ButtonGroup, Badge } from 'react-bootstrap';

const TaskFilters = ({ 
  filter, 
  setFilter, 
  activeCount,
  completedCount, 
  onClearCompleted 
}) => {
  return (
    <div className="filters-container glassmorphism p-3 mb-4">
      <Row>
        <Col xs={12} md={6} className="mb-2 mb-md-0 d-flex align-items-center">
          <div className="task-stats d-flex align-items-center">
            <div className="me-3 task-count">
              <Badge bg="tertiary" pill className="badge-counter">
                {activeCount}
              </Badge> 
              <span className="ms-1">active</span>
            </div>
            <div className="me-3 task-count">
              <Badge bg="success" pill className="badge-counter">
                {completedCount}
              </Badge> 
              <span className="ms-1">completed</span>
            </div>
            {completedCount > 0 && (
              <Button 
                variant="outline-secondary" 
                size="sm" 
                onClick={onClearCompleted}
                className="clear-btn ms-auto ms-md-0"
              >
                <i className="bi bi-trash me-1"></i>
                Clear
              </Button>
            )}
          </div>
        </Col>
        <Col xs={12} md={6}>
          <ButtonGroup className="w-100 filter-buttons">
            <Button 
              variant={filter === 'all' ? 'tertiary' : 'outline-tertiary'}
              onClick={() => setFilter('all')}
              className="filter-btn"
            >
              <i className="bi bi-collection me-1"></i>
              All
            </Button>
            <Button 
              variant={filter === 'active' ? 'tertiary' : 'outline-tertiary'}
              onClick={() => setFilter('active')}
              className="filter-btn"
            >
              <i className="bi bi-check2-circle me-1"></i>
              Active
            </Button>
            <Button 
              variant={filter === 'completed' ? 'tertiary' : 'outline-tertiary'}
              onClick={() => setFilter('completed')}
              className="filter-btn"
            >
              <i className="bi bi-check2-all me-1"></i>
              Completed
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </div>
  );
};

export default TaskFilters;
