import React from 'react';
import style from './Feedback.scss';


export default class Feedback extends React.Component {

  render() {
  	const message = this.props.message;
    const classNames = message && message.length ? `feedback feedback--${this.props.type}` : 'feedback--hidden';

  	return <div className={classNames}>
      {this.props.message}
  	</div>
  }
};