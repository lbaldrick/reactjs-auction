import React from 'react';
import style from './ButtonList.scss';

const ButtonList = ({ buttonDetails=[], title, onButtonClick }) => {
  	return <div className="button-list"> 
      <div className="button-list_title"> { title } </div>
      <ul className="button-list_list"> 
        {
         	buttonDetails.map((buttonDetail) => {
           return <li className="button-list_list_item">
        			 <button className="button-list_list_item_button" onClick={() => onButtonClick(buttonDetail.key)}>
                { buttonDetail.displayName }
              </button>
            </li>
      		})
      	}
      </ul>
  	</div>
};

export default ButtonList;