import React from 'react';
import { ListGroup } from 'react-bootstrap';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleComplete, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center p-4 border rounded">
        <p className="text-muted mb-0">
          No tasks to display. Add a task to get started!
        </p>
      </div>
    );
  }

  return (
    <ListGroup className="shadow-sm task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ListGroup>
  );
};

export default TaskList;
