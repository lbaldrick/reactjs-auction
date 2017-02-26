import styles from './TableHeaderRow.scss';
import TableHeaderCell from './TableHeaderCell.jsx';
import React from 'react';

const defaultColumnConfig = {
	width: '120px',
};

const TableHeaderRow = ({ headers, columnsConfig }) => {
	return <ul className="TableHeaderRow"> 
		{ 
	       headers.map((header) => {
	        return <TableHeaderCell 
	          displayName={ header.displayName }
	          style={ columnsConfig ? columnsConfig[header.id] : defaultColumnConfig }
	          />
	       }) 
	   
		}
		</ul>
};

export default TableHeaderRow;