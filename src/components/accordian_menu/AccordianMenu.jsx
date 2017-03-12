import React from 'react';
import AccordianMenuItem from './AccordianMenuItem';
import style from './AccordianMenu.scss';

const AccordianMenu = ({ items=[], title }) => {
  	return <div className="accordian-menu"> 
      <div className="accordian-menu_title"> { title } </div>
      <ul className="accordian-menu_list"> 
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