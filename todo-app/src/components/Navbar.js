import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Badge } from 'react-bootstrap';

const AppNavbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  // Update the time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Set greeting based on time of day
  useEffect(() => {
    const hours = currentTime.getHours();
    let newGreeting = '';

    if (hours < 12) {
      newGreeting = 'Good Morning';
    } else if (hours < 17) {
      newGreeting = 'Good Afternoon';
    } else {
      newGreeting = 'Good Evening';
    }

    setGreeting(newGreeting);
  }, [currentTime]);

  // Format time as HH:MM AM/PM
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Navbar expand="lg" className="mb-4 py-2 navbar-glass custom-navbar" variant="dark" bg="custom-primary">
      <Container>
        <Navbar.Brand href="#top" className="d-flex align-items-center">
          <i className="bi bi-hourglass-split me-2 fs-4 pulse"></i>
          <span className="brand-text">Focus Flow</span>
          <Badge bg="light" text="dark" pill className="ms-2 px-2 py-1 shadow-sm">
            Pro
          </Badge>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="#top" className="nav-link-custom">Home</Nav.Link>
            <Nav.Link href="#tasks" className="nav-link-custom">My Tasks</Nav.Link>
            <Nav.Link href="#about" className="nav-link-custom">About</Nav.Link>
            <Nav.Link href="#contact" className="nav-link-custom">Contact</Nav.Link>
            <Nav.Link href="https://github.com/TusharKantaMishra" target="_blank" className="nav-link-custom">
              <i className="bi bi-github me-1"></i> GitHub
            </Nav.Link>
          </Nav>
          <div className="ms-lg-auto text-light d-flex align-items-center">
            <div className="me-3 d-none d-md-block">
              <div className="greeting-text">{greeting}!</div>
              <div className="current-time">{formattedTime}</div>
            </div>
            <div className="user-icon">
              <i className="bi bi-person-circle fs-4"></i>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
