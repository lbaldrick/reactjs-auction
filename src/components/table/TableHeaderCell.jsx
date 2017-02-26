import styles from './TableHeaderCell.scss';
import React from 'react';

const TableHeaderCell = ({ displayName, style }) => {
	return <li className="TableHeaderCell" style={style}> { displayName } </li>
};

export default TableHeaderCell;