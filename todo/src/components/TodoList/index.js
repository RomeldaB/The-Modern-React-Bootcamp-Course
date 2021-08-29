import React, { useState } from "react";
import NewTodoForm from "../NewTodoForm";
import Todo from "../Todo";
import "./index.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const create = (newTodo) => {
    setTodos(prev =>  [...prev, newTodo]);
  }

  const remove = (id) => {
    setTodos(prev =>  prev.filter(t => t.id !== id));
  }

  const update = (id, updatedTask) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  const toggleCompletion = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  const newTodos = todos.map(todo => {
    return (
      <CSSTransition key={todo.id} timeout={500} classNames='todo'>
        <Todo
          key={todo.id}
          id={todo.id}
          task={todo.task}
          completed={todo.completed}
          removeTodo={remove}
          updateTodo={update}
          toggleTodo={toggleCompletion}
        />
      </CSSTransition>
    );
  });
  
  return (
    <div className='TodoList'>
      <h1>
        Get To Work! <span>An Animated Todo List Made With React Hooks.</span>
      </h1>
      <NewTodoForm createTodo={create} />

      <ul>
        <TransitionGroup className='todo-list'>{newTodos}</TransitionGroup>
      </ul>
    </div>
  );
}
export default TodoList;
