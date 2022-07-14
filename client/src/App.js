import { Container } from "react-bootstrap";
import "./App.css";
import AddForm from "./component/AddForm";
import ListArea from "./component/ListArea";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import {
  deleteServerTask,
  fetchTasks,
  postTask,
  switchServerTask,
} from "./helper/axiosHelper";

const wkly = 7 * 24;

function App() {
  const [taskList, setTaskList] = useState([]);
  const [ids, setIds] = useState([]);
  useEffect(() => {
    getTaskFromServer();
  }, []);

  const getTaskFromServer = async () => {
    const data = await fetchTasks();

    data.status === "success" && setTaskList(data.result);
  };

  const total = taskList.reduce((acc, item) => acc + +item.hr, 0);

  const addTask = async (task) => {
    if (total + +task.hr > wkly) {
      return alert("Sorry sir, You don't have enough hrs.");
    }
    // setTaskList([...taskList, task]); Before
    // Now send data to the server
    const result = await postTask(task);
    result.status === "success" && getTaskFromServer();
  };

  const switchTask = async (_id, type) => {
    const data = await switchServerTask({ _id, type });

    data.status === "success" && getTaskFromServer();
  };
  const handleOnCheck = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);
    // if ticked add all ides in ids ohterwise take them out
    if (value === "entry" || value === "bad") {
      let toDeleteIds = [];
      taskList.forEach((item) => {
        if (item.type === value) {
          toDeleteIds.push(item._id);
        }
      });
      if (checked) {
        // add all entry list ids,
        // you cannot use map map throws undefined if size differ and filter thors all the object value not just one value.
        // const entryids = taskList.filter((item) => {
        //   if (item.type == "entry") {
        //     return item.id;
        //   }
        // });

        setIds([...ids, ...toDeleteIds]);
        // console.log(entryids);
      } else {
        // remove all entry list ids
        // when you need to delete small array from big array, bigArray.filter(item), !smallArray.includes(eachBigItem);
        const tempArgs = ids.filter((_id) => !toDeleteIds.includes(_id));
        setIds(tempArgs);
      }
      return;
    }
    if (checked) {
      // add individual item id
      setIds([...ids, value]);
    } else {
      // remove individual item id
      const filterArg = ids.filter((_id) => _id !== value);
      setIds(filterArg);
    }
  };

  const handleOnDelete = async () => {
    if (!window.confirm("Are you sure you want to delete the selected item?")) {
      return;
    }

    const data = await deleteServerTask(ids);
    if (data.status === "success") {
      getTaskFromServer();
      setIds([]);
    }
  };

  return (
    <div className="wrapper">
      <Container>
        <h1 className="text-center py-5">My Not To Do List</h1>
        <AddForm addTask={addTask} />
        <hr />
        <ListArea
          ids={ids}
          taskList={taskList}
          switchTask={switchTask}
          total={total}
          handleOnCheck={handleOnCheck}
        />
        <div className="mt-2">
          {ids.length > 0 && (
            <Button variant="danger" onClick={handleOnDelete}>
              Delete selected task
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
}

export default App;
