import React, {useState} from "react";
import "./index.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function Todo(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(props.task);

  const handleRemove = () => {
    props.removeTodo(props.id);
  }

  const toggleForm = () => {
    setIsEditing(prev => !prev);
  }

  const handleUpdate = (evt) => {
    evt.preventDefault();
    props.updateTodo(props.id, task);
    setIsEditing(false);
  }

  const handleChange = (evt) => {
    setTask(evt.target.value);
  }

  const handleToggle = (evt) => {
    props.toggleTodo(props.id);
  }

  let result;
  if (isEditing) {
    result = (
      <CSSTransition key='editing' timeout={500} classNames='form'>
        <form className='Todo-edit-form' onSubmit={handleUpdate}>
          <input
            type='text'
            value={task}
            name='task'
            onChange={handleChange}
          />
          <button>Save</button>
        </form>
      </CSSTransition>
    );
  } else {
    result = (
      <CSSTransition key='normal' timeout={500} classNames='task-text'>
        <li className='Todo-task' onClick={handleToggle}>
          {props.task}
        </li>
      </CSSTransition>
    );
  }
  return (
    <TransitionGroup
      className={props.completed ? "Todo completed" : "Todo"}
    >
      {result}
      <div className='Todo-buttons'>
        <button onClick={toggleForm}>
          <i class='fas fa-pen' />
        </button>
        <button onClick={handleRemove}>
          <i class='fas fa-trash' />
        </button>
      </div>
    </TransitionGroup>
  );
}
export default Todo;
