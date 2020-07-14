import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import editSVG from '../../assets/img/edit.svg';  //DFDFDF

import './Tasks.scss';

import AddTaskForm from './AddTaskForm';
import Task from './Task';

const Tasks = ({ list, onEditTitle, onAddTask, onRemoveTask, onEditTask, onCompleteTask, withoutEmpty }) => {
  const editTitle = () => {
    const newTitle = window.prompt('List title', list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios.patch(`https://todo-react-api.herokuapp.com/api/lists/${list.id}`, {
        name: newTitle
      }).catch(() => console.log('Error during updating list title!'));
    }
  };

  return (
    <div className="tasks">
      <Link to={`/lists/${list.id}`}>
        <h2 style={{ color: list.color.hex }} className="tasks__title">
          {list.name}
          <img src={editSVG} alt="Edit icon" onClick={editTitle} />
        </h2>
      </Link>
      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
        {list.tasks && list.tasks.map(task => <Task key={task.id} list={list} onRemove={onRemoveTask}
                                                    onEdit={onEditTask} onComplete={onCompleteTask} {...task} />)}
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
}

export default Tasks;