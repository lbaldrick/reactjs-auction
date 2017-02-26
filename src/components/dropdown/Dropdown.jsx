import React from 'react';
import style from './Dropdown.scss';

const dropdown = ({ items, selectedId, onItemClicked }) => {
  return <div className="dropdown">
  	 <ul className="dropdown_list">
	   {
	      items.map((item) => {
	      	const id = item.get('id');
	      	return <li className={ selectedId === id ? 'dropdown_list_item dropdown_list_item--selected' : 'dropdown_list_item' } 
	      	onClick={ onItemClicked.bind(this, id) }>
	      	   { item.get('name') }
	      	</li>
	      })
	    }
     </ul>
  </div>
};

export default dropdown;