import style from './TableCell.scss';
import React from 'react';

const TableCell = ({ displayName, style }) => {
	return <li className="TableCell" style={style}> { displayName } </li>
};

export default TableCell;