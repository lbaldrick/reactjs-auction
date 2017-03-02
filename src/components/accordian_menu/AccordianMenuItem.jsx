import React from 'react';
import style from './AccordianMenuItem.scss';

export default class AccordianMenuItem extends React.Component {

	constructor() {
		super();
		this.state = {
			isSelected: false,
		}
	}

	onClick() {
		this.setState({
			isSelected: !this.state.isSelected,
		});
	}

	render() {
		return <li className="AccordianMenuItem">
			<button className="AccordianMenuItem_menu" onClick={ (event) => this.onClick(event)}>
				{ this.props.displayName }
			</button>
			<div className={ this.state.isSelected ? 'AccordianMenuItem_details AccordianMenuItem_details--visible' : 
			   'AccordianMenuItem_details AccordianMenuItem_details--hidden' }> { this.props.children } </div>
		</li>
	}
} 