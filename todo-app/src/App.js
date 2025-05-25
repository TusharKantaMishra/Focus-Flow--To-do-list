import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import AppNavbar from './components/Navbar';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilters from './components/TaskFilters';
import { getRandomQuote } from './utils/quotes';
import './App.css';
import './styles/select-fix.css';

function App() {
  // Main state for our todo app
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [quote, setQuote] = useState('');
  
  // Load saved tasks when app starts - with improved error handling
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem('focusflow_tasks');
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        if (Array.isArray(parsedTasks) && parsedTasks.length > 0) {
          console.log('Successfully loaded', parsedTasks.length, 'tasks from localStorage');
          setTasks(parsedTasks);
        } else {
          console.log('No tasks found in localStorage or empty array');
        }
      }
    } catch (error) {
      console.error('Failed to load tasks from localStorage:', error);
      // Attempt to recover from corrupted localStorage
      localStorage.removeItem('focusflow_tasks');
    }
    
    // Set a random quote
    setQuote(getRandomQuote());
  }, []);

  // Save tasks whenever they change - with better key name and verification
  useEffect(() => {
    try {
      if (tasks && tasks.length >= 0) {
        localStorage.setItem('focusflow_tasks', JSON.stringify(tasks));
        console.log('Saved', tasks.length, 'tasks to localStorage');
      }
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error);
    }
  }, [tasks]);

  // Task handling functions
  const handleAddTask = (text, priority = 'medium') => {
    const newTask = {
      id: uuidv4(),
      text,
      priority,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (id, newText, newPriority) => {
    setTasks(tasks.map(task => 
      task.id === id ? { 
        ...task, 
        text: newText,
        priority: newPriority || task.priority || 'medium'
      } : task
    ));
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  // Filter tasks based on current filter
  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default: // 'all'
        return tasks;
    }
  };

  // Task counts for display
  const activeCount = tasks.filter(task => !task.completed).length;
  const completedCount = tasks.filter(task => task.completed).length;
  
  // Get filtered tasks
  const filteredTasks = getFilteredTasks();

  return (
    <div className="task-app" id="top">
      <AppNavbar />
      
      {/* Main container */}
      <Container className="todo-container glassmorphism">
        <p className="welcome-text text-center mb-4">Your personal task management system</p>
        
        {/* Task input form */}
        <TaskForm onAddTask={handleAddTask} />
        
        {/* Filters and task counters */}
        <TaskFilters 
          filter={filter}
          setFilter={setFilter}
          activeCount={activeCount}
          completedCount={completedCount}
          onClearCompleted={handleClearCompleted}
        />
        
        {/* Task list section */}
        <section id="tasks" className="task-section">
          <h2 className="section-title">My Tasks</h2>
          <TaskList 
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        </section>
        
        <div className="section-divider"></div>
        
        {/* About section */}
        <section id="about" className="about-section">
          <h2 className="section-title">About Focus Flow</h2>
          <div className="about-content">
            <p>Focus Flow is a modern task management application designed to help you stay organized and productive. With features like task priorities, filtering, and a clean interface, you can focus on what matters most.</p>
            <div className="features-grid">
              <div className="feature-item">
                <i className="bi bi-check-circle-fill feature-icon"></i>
                <h5>Task Management</h5>
                <p>Create, edit, and complete tasks with ease</p>
              </div>
              <div className="feature-item">
                <i className="bi bi-funnel-fill feature-icon"></i>
                <h5>Smart Filtering</h5>
                <p>Filter tasks by status to focus on what's important</p>
              </div>
              <div className="feature-item">
                <i className="bi bi-lightning-fill feature-icon"></i>
                <h5>Priority Levels</h5>
                <p>Assign priority to tasks for better organization</p>
              </div>     
            </div>
          </div>
        </section>
        
        <div className="section-divider"></div>
        
        {/* Motivational Quote - Random on each refresh */}
        <div className="quote-container">
          <p className="quote-text">"{quote}"</p>
        </div>
        
        <div className="section-divider"></div>
        
        {/* Contact section */}
        <section id="contact" className="contact-section">
          <h2 className="section-title">Contact Me</h2>
          <div className="contact-content">
            <p>I'd love to hear your feedback or answer any questions you might have about Focus Flow.</p>
            <div className="contact-methods">
              <div className="contact-method">
                <i className="bi bi-envelope-fill contact-icon"></i>
                <h5>Email</h5>
                <p>sipunm26@gmail.com</p>
              </div>
              <div className="contact-method">
                <i className="bi bi-chat-fill contact-icon"></i>
                <h5>WhatsApp</h5>
                <p>8117054773</p>
              </div>
            </div>
          </div>
        </section>
      </Container>
      
      <footer className="app-footer">
        <p className="footer-text">© {new Date().getFullYear()} Focus Flow - Master your productivity</p>
      </footer>
    </div>
  );
}

export default App;
