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
		return <li className="accordian-menu-item">
			<button className="accordian-menu-item_menu" onClick={ (event) => this.onClick(event)}>
				{ this.props.displayName }
			</button>
			<div className={ this.state.isSelected ? 'accordian-menu-item_details accordian-menu-item_details--visible' : 
			   'accordian-menu-item_details accordian-menu-item_details--hidden' }> { this.props.children } </div>
		</li>
	}
} 