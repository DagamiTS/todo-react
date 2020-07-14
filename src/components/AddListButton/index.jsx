import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { List, Badge } from '../index';

import closeSVG from '../../assets/img/close.svg';
import './AddListButton.scss';

const AddList = ({ colors, onAdd }) => {
  const [ visiblePopup, setVisiblePopup ] = useState(false);
  const [ selectedColor, selectColor ] = useState(3);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ inputValue, setInputValue ] = useState('');

  useEffect(() => {
    if (Array.isArray(colors)) {
      selectColor(colors[0].id);
    }
  }, [ colors ]);

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    selectColor(colors[0].id);
  };

  const onAddList = () => {
    if (!inputValue) {
      alert('Enter list title');
      return;
    }
    setIsLoading(true);
    const color = colors.filter(c => c.id === selectedColor)[0];
    axios.post('https://todo-react-api.herokuapp.com/api/lists', { name: inputValue, colorId: selectedColor })
      .then(({ data }) => {
        const listObj = { ...data, color, tasks: [] };
        onAdd(listObj);
        onClose();
      })
      .catch(() => alert('Error during adding list!'))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            className: 'list__add-button',
            icon: <svg height="10pt" viewBox="0 0 426.66667 426.66667" width="10pt" xmlns="http://www.w3.org/2000/svg">
              <path
                d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0" />
            </svg>,
            name: 'Add new list',
          }
        ]}
      />
      {visiblePopup &&
      <div className="add-list__popup">
        <img onClick={onClose} src={closeSVG} alt="close button"
             className="add-list__popup-close-btn" />
        <input value={inputValue} onChange={e => setInputValue(e.target.value)} className="field" type="text"
               placeholder="List title" />
        <div className="add-list__popup-colors">
          {colors.map(color => (
            <Badge
              onClick={() => selectColor(color.id)}
              key={color.id}
              color={color.name}
              className={selectedColor === color.id && 'active'} />))}
        </div>
        <button onClick={onAddList} className="button">{isLoading ? 'Adding' : 'Add'}</button>
      </div>}
    </div>
  );
};

export default AddList;