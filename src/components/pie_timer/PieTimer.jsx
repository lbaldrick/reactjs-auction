import React from 'react';
import style from './PieTimer.scss';

export default class PieTimer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            strokeDashOffset: 0,
            radius: 0,
            style: {
              animation: 0
            },
        }
    }

    componentWillReceiveProps(props) {
        const totalTime = props.totalTime;
        const radius = 7;
        const circumference = this.calculateCircumference(props.radius);
        const tickWidth = this.calculateTickWidth(circumference, totalTime);
        const strokeDashOffset = this.calculateStrokeDashOffset(totalTime, tickWidth);

        this.setState({
            strokeDashOffset,
            radius,
            style: {
                animation: 0,
            },
        });
    }

    componentDidUpdate() {
        const timeRemaining = this.props.timeRemaining || this.props.totalTime;
        const animationStyle = `draw ${timeRemaining}s linear`;
        this.setState({
            strokeDashOffset: this.state.strokeDashOffset,
            radius: this.state.radius,
            style: {
                animation: animationStyle,
            },
        });
    }

    startAnimation(timerElement, animationStyle) {
        timerElement.style.animation = animationStyle;
    }

    removeAnimation(timerElement) {
        timerElement.style.animation = '';
    }

    calculateStrokeDashOffset(timeRemaining, tickWidth) {
        return timeRemaining * tickWidth;
    }

    calculateTickWidth(circumference, totalTime) {
        return circumference / totalTime;
    }

    calculateCircumference(radius) {
        return 2 * Math.PI * radius;
    }


    render() {
        const radius = this.state.radius;

  	return <div className="pie-timer">
  	  <svg viewBox="-1 -1 34 30">
        <circle className="pie-timer_border" cx="14" cy="14" fill="black" r={radius * 2  + 1}/>
        <circle className="pie-timer_underlay" cx="14" cy="14" fill="red" r={radius * 2}/>
        <circle ref="timer" style={ this.state.style } className="pie-timer_timer" cx="14" cy="14" fill="transparent" r={radius}/>
      </svg>
    </div>
  }
}