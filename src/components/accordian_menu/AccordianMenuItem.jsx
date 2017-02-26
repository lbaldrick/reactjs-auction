import React from 'react';

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
		<li className={ this.state.isSelected ? 'AccordianMenuItem AccordianMenuItem--selected' : 'AccordianMenuItem' }>
			<span class="AccordianMenuItem_menu" onClick={ (event) => this.onClick(event)}>{ this.props.displayName }</span>
			<div class="AccordianMenuItem_details"> { props.details }</div>
		</li>
	}
} 