import React from 'react';
import style from './Table.scss';
import TableHeaderRow from './TableHeaderRow.jsx';
import TableBody from './TableBody.jsx';

export default class Table extends React.Component {

	render() {
		return <div className="table">
			<TableHeaderRow 
			headers={ this.props.headers }
			columnsConfig={ this.props.columnsConfig }
			/>
			<TableBody
			columnsConfig={ this.props.columnsConfig }
		    records={ this.props.records }
		    onRowClick={ this.props.onRowClick }
		    columnOrder={ this.props.headers.map((column) => column.id) }
		    />
		</div>
	}
}