import React from 'react';
import AccordianMenuItem from './AccordianMenuItem';
import style from './AccordianMenu.scss';

const AccordianMenu = ({ items=[], title }) => {
  	return <div className="AccordianMenu"> 
      <div className="AccordianMenu_Title"> { title } </div>
      <ul className="AccordianMenu_list"> 
        {
         	items.map((item) => {
      			return <AccordianMenuItem
      				displayName={ item.displayName }
      			>

              { item.details }

            </AccordianMenuItem>
      		})
      	}
      </ul>
  	</div>
};

export default AccordianMenu;