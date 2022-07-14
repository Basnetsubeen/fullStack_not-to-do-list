import { Button } from "react-bootstrap";
import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";

const initialState = {
  task: " ",
  hr: " ",
  type: "entry",
};

const AddForm = ({ addTask }) => {
  const [form, setForm] = useState(initialState);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value }); // [] converts value
    // If we put square bracket it will helps us to inset the value only otherwise it
    // it will start adding after the spread operator
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addTask(form);
    e.target.reset();
  };

  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Row className="g-2">
          <Col md="7">
            <Form.Control
              onChange={handleOnChange}
              name="task"
              placeholder="Task Name"
              required
            />
          </Col>
          <Col md="3">
            <Form.Control
              onChange={handleOnChange}
              name="hr"
              placeholder="10"
              type="number"
              required
            />
          </Col>
          <Col md="2">
            <Button variant="success" type="submit">
              Add Task
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddForm;
