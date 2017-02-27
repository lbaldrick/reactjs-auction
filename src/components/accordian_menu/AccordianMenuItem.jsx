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
		return <li className={ this.state.isSelected ? 'AccordianMenuItem AccordianMenuItem--selected' : 'AccordianMenuItem' }>
			<span className="AccordianMenuItem_menu" onClick={ (event) => this.onClick(event)}>
				{ this.props.displayName }
			</span>
			<div className="AccordianMenuItem_details"> { this.props.children } </div>
		</li>
	}
} 