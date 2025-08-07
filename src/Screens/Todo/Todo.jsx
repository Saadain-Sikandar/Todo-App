import "bootstrap/dist/css/bootstrap.min.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { db } from "../../Config/Firebase";
import styles from "./Todo.module.css";

function Todo() {
  const [task, setTask] = useState("");
  const [records, setrecords] = useState([]);
  const [refresh, setRefresh] = useState(false);

  //ADDING TASK IN FIREBASE

  const Addtask = async () => {
    try {
      let taskobj = {
        Task: task,
      };

      if (task) {
        const addtask = await addDoc(collection(db, "ToDo List"), taskobj);
        console.log(addtask);
        setRefresh(!refresh);

        setTask("");
        Swal.fire({
          title: "Task Added!",
          icon: "success",
          draggable: true,
        });
      } else {
        Swal.fire("No task entered!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //  GETTING DATA FROM FIREBASE

  useEffect(() => {
    getData();
  }, [refresh]);

  const getData = async () => {
    try {
      const tasks = await getDocs(collection(db, "ToDo List"));

      const taskArray = tasks.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setrecords(taskArray);
    } catch (error) {
      console.log(error);
    }
  };

  //DELETING DATA FROM FIREBASE

  const DeleteTask = async (taskid) => {
    try {
      const deleted = await deleteDoc(doc(db, "ToDo List", taskid));
      setrecords(records.filter((Task) => Task.id == taskid));
      console.log(deleted);
      setRefresh(!refresh);

      Swal.fire("Task Deleted!");
    } catch (error) {
      console.log(error);
    }
  };

  // UPDATING DATA IN FIREBASE
  const EditTask = async (taskid) => {
    try {
      let editedval = prompt("Edit task:", records[taskid]);

      if (editedval) {
        const updated = await updateDoc(doc(db, "ToDo List", taskid), {
          Task: editedval,
        });
        console.log(updated);
        setRefresh(!refresh);
        Swal.fire({
          title: "Task updated!",
          icon: "success",
          draggable: true,
        });
      } else {
        Swal.fire("Task not updated.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // DELETING ALL DATA FROM FIRBASE

  const DeleteAll = async () => {
    try {
      if (records.length > 0) {
        const data = await getDocs(collection(db, "ToDo List"));

        const deleteall = data.docs.map((task) =>
          deleteDoc(doc(db, "ToDo List", task.id))
        );
        await Promise.all(deleteall); // wait for all deletions
        setrecords([]);
        console.log(deleteall);

        Swal.fire({
          title: "All Task Deleted!",
          icon: "success",
          draggable: true,
        });
      } else {
        Swal.fire({
          title: "No task to delete!",
          icon: "question",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="py-5 d-flex justify-content-center">
      <Card
        className={`shadow rounded-4 p-2 w-100 ${styles.card} `}
        style={{ maxWidth: `600px` }}
      >
        <Card.Body className="text-center">
          <h2 className={`text-center mb-4 ${styles.h2} `}>📝 ToDo App</h2>

          {/* Input + Add Task */}
          <InputGroup className="mb-3 shadow-sm  ">
            <input
              type="text"
              className="form-control"
              placeholder="Enter a task..."
              onChange={(e) => setTask(e.target.value)}
              value={task}
            />
            <Button onClick={Addtask} variant="primary ms-2 border rounded ">
              Add Task
            </Button>
          </InputGroup>

          {/* Task List*/}
          <ListGroup className="shadow-sm">
            {records.map((e, i) => (
              <ListGroup.Item
                key={i}
                className="d-flex justify-content-between align-items-center"
              >
                {i + 1} <span>{e.Task}</span>
                <div>
                  <Button
                    onClick={() => DeleteTask(e.id)}
                    variant="outline-danger"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => EditTask(e.id)}
                    variant="outline-success ms-2 "
                  >
                    Edit
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="mt-4">
            <Button
              onClick={DeleteAll}
              className="btn btn-danger ms-2 border rounded"
            >
              Delete All
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Todo;
