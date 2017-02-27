import React from 'react';
import { connect } from 'react-redux';
import Table from '../table/Table.jsx';
import style from './SearchResults.scss';

class SearchResults extends React.Component {
	render() {
		return <Table 
			records={ this.props.records }
			headers={ this.props.headers }
			columnsConfig={ this.props.columnsConfig }
		/>

	}
}

const mapStateToProps = (state) => {
  return {
    records: state.getIn(['search', 'results']),
    headers: state.getIn(['search', 'headers']),
    columnsConfig: state.getIn(['search', 'columnsConfig']),
  }
};

export default connect(mapStateToProps)(SearchResults);