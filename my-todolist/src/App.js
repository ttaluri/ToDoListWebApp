import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Tab } from 'react-bootstrap';
import './App.css';

const staticTodoItems = [
  { title: 'Todo 1', description: `Hello There! If you're reading this, you've successfully completed most of your assignment.`, dueDate: '2024-10-16' },
  { title: 'Todo 2', description: `Hello. This is another task you need to do. Good luck with it.`, dueDate: '2024-10-13' },
  { title: 'Todo 3', description: `Hello There! Its me again. Task 3 Awaiting`, dueDate: '2024-10-11' },
  { title: 'Todo 4', description: `Okay Bye, It was fun. See ya. `, dueDate: '2024-11-04' },
];

function App() {
  const [todoItems, setTodoItems] = useState(staticTodoItems);
  const [newTitle, setNewTitle] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [activeItem, setActiveItem] = useState(null);

  
  const handleAddTodo = () => {
    if (newTitle && newDueDate) {
      setTodoItems([
        ...todoItems,
        { title: newTitle, description: 'Click to add description', dueDate: newDueDate },
      ]);
      setNewTitle('');
      setNewDueDate('');
    }
  };

  
  const getVariant = (dueDate) => {
    const daysLeft = (new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24);
    if (daysLeft < 2) return 'danger';
    if (daysLeft < 4) return 'warning';
    if (daysLeft < 7) return 'success';
    return 'primary';
  };

  return (
    <Container className="container my-4 mb-5">
      <h2 className="text-center mb-4">Assignment 2: Tejasree's ToDo List</h2>
      <Row>
      <Col sm={4}>
  <div className="todo-box"> { }
    <Form>
      <Form.Group controlId="formTitle">
        <Form.Label>ToDo Item</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter todo title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formDueDate">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          type="date"
          value={newDueDate}
          onChange={(e) => setNewDueDate(e.target.value)}
        />
      </Form.Group>

      <div className="d-grid gap-2 mt-3"> { }
        <Button variant="primary" onClick={handleAddTodo} className="text-center">
          Add ToDo
        </Button>
      </div>
    </Form>
  </div>
</Col>


        <Col sm={8}>
          <Tab.Container defaultActiveKey={0}>
            <Row>
              <Col sm={4}>
                <ListGroup>
                  {todoItems.map((item, index) => (
                    <ListGroup.Item
                      action
                      key={index}
                      eventKey={index}
                      variant={getVariant(item.dueDate)} // Applying the variant based on due date
                      onClick={() => setActiveItem(index)}
                    >
                      {item.title}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  {activeItem !== null && (
                    <Tab.Pane eventKey={activeItem}>
                      <h5>{todoItems[activeItem].title}</h5>
                      <Form.Control
                        as="textarea"
                        value={todoItems[activeItem].description}
                        onChange={(e) => {
                          const updatedItems = [...todoItems];
                          updatedItems[activeItem].description = e.target.value;
                          setTodoItems(updatedItems);
                        }}
                        contentEditable
                      />
                      <Form.Control
                        type="date"
                        value={todoItems[activeItem].dueDate}
                        onChange={(e) => {
                          const updatedItems = [...todoItems];
                          updatedItems[activeItem].dueDate = e.target.value;
                          setTodoItems(updatedItems);
                        }}
                      />
                    </Tab.Pane>
                  )}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
