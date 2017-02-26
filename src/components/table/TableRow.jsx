import style from './TableRow.scss';
import TableCell from './TableCell.jsx';
import React from 'react';

const TableRow = ({ rowId, cells, onRowClicked }) => {
	return <ul className="TableRow"
    onClick={ onRowClicked ? onRowClicked.bind(this, rowId) : null}
	> 
	{ 
       cells.map((cell) => {
        return <TableCell 
          displayName={ cell.displayName }
          style={ cell.style }
          />
       }) 
   
	}
	</ul>
};

export default TableRow;