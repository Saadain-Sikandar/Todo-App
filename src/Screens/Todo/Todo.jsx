import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Card, Container, InputGroup, ListGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';
import styles from './Todo.module.css';

function Todo() {

const [task,setTask] = useState('');
const [records,Setrecords] = useState([]);

const Addtask = () => {
if(task){
  Setrecords([...records,task]);
  setTask('');
  Swal.fire({
  title: "Task Added!",
  icon: "success",
  draggable: true
});
}
else{
  Swal.fire("No task entered!");
  }
};

const DeleteTask = (index) => {
  const deleted = records.filter((_,i) => i !== index );
  Setrecords(deleted);
    Swal.fire("Task Deleted!");
};

const EditTask = (index) => {

let editedval = prompt("Edit task:",records[index] )

if(editedval){
  const Updated = records.map((e,i) => {
     return i == index ? editedval : e
      })
      Setrecords(Updated);
       Swal.fire({
      title: "Task updated!",
      icon: "success",
      draggable: true
      });  
    }
    else{
       Swal.fire("Task not updated.");
    }
};

const DeleteAll = () => {
 if(records.length > 0){
   Setrecords([]);
   Swal.fire({
  title: "All Task Deleted!",
  icon: "success",
  draggable: true
});
 }
 else{
Swal.fire({
  title: "No task to delete!",
  icon: "question"
}) }
};


  return (
    <Container className="py-5 d-flex justify-content-center"  >
      <Card  className={`shadow rounded-4 p-2 w-100 ${styles.card} `} style={{maxWidth:`600px`}} >
        <Card.Body className='text-center' >
        <h2 className={`text-center mb-4 ${styles.h2} `} >📝 ToDo App</h2>

        {/* Input + Add Task */}
        <InputGroup className="mb-3 shadow-sm  ">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a task..."
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
          <Button onClick={Addtask} variant="primary ms-2 border rounded " >Add Task</Button>
        </InputGroup>

        {/* Task List*/}
        <ListGroup className="shadow-sm">
            {records.map((e,i)=> (
             <ListGroup.Item 
             key={i}
             className="d-flex justify-content-between align-items-center">
             {i+1} <span>{e}</span>  
            <div>
             <Button  onClick={()=>DeleteTask(i)} variant="outline-danger">
              Delete
            </Button>
             <Button onClick={() => EditTask(i)} variant="outline-success ms-2 ">
                Edit
             </Button>
            </div>
          </ListGroup.Item>
      ))}
        </ListGroup>
        <div className='mt-4'> 
        <Button onClick={DeleteAll} className='btn btn-danger ms-2 border rounded' >Delete All</Button>
      </div>
      </Card.Body>
      </Card>
    </Container>
  );
}

export default Todo;
