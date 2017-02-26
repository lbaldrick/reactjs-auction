import React from 'react';
import AccordianMenuItem from './AccordianMenuItem';

const AccordianMenu = ({ items }) => {
  	return <div className="AccordianMenu"> 
      <ul className="AccordianMenu_list"> 
        {
         	items.map((item) => {
      			return <AccordianMenuItem
      				displayName={ item.displayName }
      				details={ this.props.details }
      			/>
      		});
      	}
      </ul>
  	</div>
  }
};

export default AccordianMenu;