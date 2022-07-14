import React from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

const TaskList = ({
  title,
  arrow,
  entryList = [],
  switchTask,
  handleOnCheck,
  name,
  ids,
}) => {
  return (
    <div className="mt-3">
      <h2 className="text-center">{title}</h2>
      <div className="table">
        <Table striped>
          <thead>
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  value={name}
                  onChange={handleOnCheck}
                />
              </th>
              <th>Task</th>
              <th>Hours</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {entryList.map((item, i) => (
              <tr>
                <td>
                  <Form.Check
                    value={item._id}
                    type="checkbox"
                    checked={ids.includes(item._id)}
                    onChange={handleOnCheck}
                  />
                </td>
                <td>{item.task}</td>
                <td>{item.hr}hrs</td>
                <td>
                  {arrow === "right" ? (
                    <Button
                      variant="success"
                      onClick={() => switchTask(item._id, "bad")}
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </Button>
                  ) : (
                    <Button
                      variant="danger"
                      onClick={() => switchTask(item._id, "entry")}
                    >
                      <i className="fa-solid fa-arrow-left"></i>
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TaskList;
