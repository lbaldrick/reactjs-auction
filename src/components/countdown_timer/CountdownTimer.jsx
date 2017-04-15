import React from 'react';
import style from './CountdownTimer.scss';
import moment from 'moment';

const MILLISECONDS_IN_A_DAY = 86400000;

const MILLISECONDS_IN_AN_HOUR = 3600000;

const MILLISECONDS_IN_A_MINUTE = 60000;

const MILLISECONDS_IN_A_SECOND = 1000;

const HOURS_IN_A_DAY = 24;

export default class CountdownTimer extends React.Component {

	constructor(props) {
	  super(props);
	  this.state = {
	  	daysLeft: 0,
	  	hoursLeft: 0,
        minutesLeft: 0,
        secondsLeft: 0,
	  };
	}

	componentDidMount() {
      this.startTimer(this.props.endTimestamp);
    }

    componentWillReceiveProps(props) {
      this.endTimer();
      this.startTimer(props.endTimestamp)
    }

    componentWillUnmount() {
      this.endTimer();
    }

	calculateTimeLeftProperties(endTimestamp=0) {
      const currentTimestamp = Date.now();
      const millisecondsLeft = endTimestamp > 0 ? endTimestamp - currentTimestamp : 0;
      const daysLeft = Math.floor(millisecondsLeft / MILLISECONDS_IN_A_DAY);
      const hoursLeft = daysLeft > 0 ? Math.floor(millisecondsLeft / MILLISECONDS_IN_AN_HOUR) - (daysLeft * HOURS_IN_A_DAY) : Math.floor(millisecondsLeft / MILLISECONDS_IN_AN_HOUR);
      const minutesLeft = Math.floor((millisecondsLeft % MILLISECONDS_IN_AN_HOUR) / MILLISECONDS_IN_A_MINUTE);
      const secondsLeft = Math.floor((millisecondsLeft % MILLISECONDS_IN_A_MINUTE) / MILLISECONDS_IN_A_SECOND);

	  return {
        daysLeft: daysLeft > 0 ? daysLeft : 0, 
        hoursLeft: hoursLeft > 0? hoursLeft : 0,
        minutesLeft: minutesLeft > 0 ? minutesLeft : 0,
        secondsLeft: secondsLeft > 0 ? secondsLeft : 0,
      };
	}

	startTimer(endTimestamp) {
	  if(endTimestamp < Date.now()) {
        return;
	  }
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