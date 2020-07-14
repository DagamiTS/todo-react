import React, { useState } from 'react';
import axios from 'axios';

import addSVG from '../../assets/img/add.svg'; //B4B4B4

const AddTaskForm = ({ list, onAddTask }) => {
  const [ formVisibility, setFormVisibility ] = useState(false);
  const [ inputValue, setInputValue ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisibility(!formVisibility);
    setInputValue('');
  };

  const addTask = () => {
    setIsLoading(true);
    const obj = {
      'listId': list.id,
      'text': inputValue,
      'completed': false,
    };
    axios.post(`https://todo-react-api.herokuapp.com/api/tasks`, obj)
      .then(({ data }) => {
        onAddTask(list.id, data);
        toggleFormVisibility();
      })
      .catch(() => alert('Error during adding task!'))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="tasks__form">
      {
        !formVisibility ?
          <div onClick={toggleFormVisibility} className="tasks__form-new">
            <img src={addSVG} alt="Add icon" />
            <span>Add new task</span>
          </div>
          :
          <div className="tasks__form-block">
            <input className="field" type="text" placeholder="Task text" value={inputValue}
                   onChange={e => setInputValue(e.target.value)} />
            <button disabled={isLoading} className="button" onClick={addTask}>
              {!isLoading ? 'Add task' : 'Adding'}
            </button>
            <button className="button button--grey" onClick={toggleFormVisibility}>Cancel</button>
          </div>
      }
    </div>
  );
};

export default AddTaskForm;