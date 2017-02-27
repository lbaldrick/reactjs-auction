import styles from './TableHeaderRow.scss';
import TableHeaderCell from './TableHeaderCell.jsx';
import React from 'react';

const defaultColumnConfig = {
	width: '120px',
};

const TableHeaderRow = ({ headers, columnsConfig }) => {
	return <ul className="TableHeaderRow"> 
		{ 
	       headers.map(({ id, displayName }) => {
	        return <TableHeaderCell 
	          displayName={ displayName }
	          style={ columnsConfig ? columnsConfig.getIn([id, 'style']).toObject() : defaultColumnConfig }
	          />
	       }) 
	   
		}
		</ul>
};

export default TableHeaderRow;