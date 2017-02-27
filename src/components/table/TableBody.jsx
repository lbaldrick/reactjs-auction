import style from './TableBody';
import TableRow from './TableRow';
import React from 'react';

const defaultColumnConfig = {
	width: '120px',
};

const TableBody = ({ records, columnsConfig, columnOrder, onRowClicked }) => {
	return <div className="TableBody">
		{
			records.map((record) => {
				return <TableRow
				rowId={ record.id }
				onRowClicked={ onRowClicked }
				cells={ columnOrder.map((key) => {
							return { 
								displayName: record[key],
								style: columnsConfig ? columnsConfig.getIn([key, 'style']).toObject() : defaultColumnConfig,
							};
								
						})
					}
				/>
			})     
		}
	</div>
}

export default TableBody;