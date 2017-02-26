import React from 'react';
import style from './CountdownTimer.scss';

const MILLISECONDS_IN_A_DAY = 86400000;

const MILLISECONDS_IN_AN_HOUR = 3600000;

const MILLISECONDS_IN_A_MINUTE = 60000;

const MILLISECONDS_IN_A_SECOND = 1000;

const HOURS_IN_A_DAY = 24;

export default class CountdownTimer extends React.Component {

	constructor(props) {
	  super(props);

	  this.endTimestamp = props.endTimestamp;
	  this.state = {
	  	daysLeft: 0,
	  	hoursLeft: 0,
        minutesLeft: 0,
        secondsLeft: 0,
	  };
	}

	componentDidMount() {
  	  this.startTimer(this.endTimestamp);
    }

	calculateTimeLeftProperties(endTimestamp=0) {
      const currentTimestamp = Date.now();
      const millisecondsLeft = endTimestamp - currentTimestamp;
      const daysLeft = Math.floor(millisecondsLeft / MILLISECONDS_IN_A_DAY);
      const hoursLeft = daysLeft ? Math.floor(millisecondsLeft / MILLISECONDS_IN_AN_HOUR) - (daysLeft * HOURS_IN_A_DAY) : Math.floor(millisecondsLeft / MILLISECONDS_IN_AN_HOUR);
      const minutesLeft = Math.floor((millisecondsLeft % MILLISECONDS_IN_AN_HOUR) / MILLISECONDS_IN_A_MINUTE);
      const secondsLeft = Math.floor((millisecondsLeft % MILLISECONDS_IN_A_MINUTE) / MILLISECONDS_IN_A_SECOND);

	  return {
        daysLeft, 
        hoursLeft,
        minutesLeft,
        secondsLeft,
      };
	}

	startTimer(endTimestamp) {
	  this.timer = setInterval(() => {
	  	const timeLeftProperties = this.calculateTimeLeftProperties(endTimestamp);

	  	if(timeLeftProperties.daysLeft <= 0 && timeLeftProperties.hoursLeft <= 0
	  		&& timeLeftProperties.minutesLeft <= 0 && timeLeftProperties.secondsLeft <= 0) {
	  		clearInterval(this.timer);
	  	}

	  	this.setState(timeLeftProperties);
	  });
	}

	endTimer() {
	  const timer = this.timer;

	  if(timer) {
        clearInterval(this.timer);
	  }
	}

	render() {
		return <div className='countdown-timer'>
			<div className='countdown-timer_days'> 
			  <div className='countdown-timer_days_title'>Days</div>
			  <div className='countdown-timer_days_value'>{ this.state.daysLeft }</div>
			</div>
			<div className='countdown-timer_hours'> 
			  <div className='countdown-timer_hours_title'>Hours</div>
              <div className='countdown-timer_hours_value'>{ this.state.hoursLeft }</div>
			</div>
			<div className='countdown-timer_minutes'>
			  <div className='countdown-timer_minutes_title'>Mins</div> 
              <div className='countdown-timer_minutes_value'>{ this.state.minutesLeft }</div>
			</div>
			<div className='countdown-timer_seconds'>
			  <div className='countdown-timer_seconds_title'>Secs</div> 
		      <div className='countdown-timer_seconds_value'>{ this.state.secondsLeft }</div>
			</div>
		</div>;
	}

};