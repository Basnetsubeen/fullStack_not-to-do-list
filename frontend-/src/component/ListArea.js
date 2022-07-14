import React from "react";
import { Row, Col } from "react-bootstrap";
import TaskList from "./TaskList";

const ListArea = ({ taskList, switchTask, total, handleOnCheck, ids }) => {
  const entryList = taskList.filter((item) => item.type === "entry");
  const badList = taskList.filter((item) => item.type === "bad");
  const badHrs = badList.reduce((acc, item) => acc + +item.hr, 0);

  //   With destructuring we can write below code
  //   const badList = taskList.filter(({type}) => type === "bad");

  return (
    <div className="list-area">
      <Row>
        <Col>
          <TaskList
            title="Entry List"
            name="entry"
            arrow="right"
            entryList={entryList}
            switchTask={switchTask}
            handleOnCheck={handleOnCheck}
            ids={ids}
          />
        </Col>

        <Col>
          <TaskList
            title="Bad List"
            name="bad"
            entryList={badList}
            switchTask={switchTask}
            handleOnCheck={handleOnCheck}
            ids={ids}
          />
          <div className="text-end text-light fw-bold fs-5 ">
            You could have saved : {badHrs} hrs
          </div>
        </Col>
      </Row>

      <div className=" text-center mt-5 fw-bold fs-5">
        Total time allocated is : {total} hr/wk
      </div>
    </div>
  );
};

export default ListArea;
