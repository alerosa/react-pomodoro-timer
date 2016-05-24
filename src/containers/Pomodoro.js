import React, {Component, PropTypes} from 'react';
import prettyTimer from '../utils/prettyTimer';
import classPrefix from '../utils/classPrefix.js';

class PomodoroContainer extends Component {
  static retriveSeconds(timeString) {
    return timeString.split(':')
    .reverse()
    .reduce((prevTimeUnit, currentTimeUnit, index) => {
      let multiplier = 1;
      if (index === 1) {
        multiplier = 60;
      } else if (index === 2) {
        multiplier = 3600;
      } else if (index > 2) {
        multiplier = 0;
      }
      return prevTimeUnit + currentTimeUnit * multiplier;
    }, 0);
  }

  static calcIterationTime(iterationNumber) {
    const inputInMinutes = this.props.inputTypes === 'minutes';

    if (iterationNumber && iterationNumber % 8 === 0) {
      return {
        type: 'long-break',
        time: inputInMinutes ? this.props.longBreak * 60 : this.props.longBreak
      };
    }

    if (iterationNumber && iterationNumber % 2 === 0 && iterationNumber % 8 !== 0) {
      return {
        type: 'short-break',
        time: inputInMinutes ? this.props.shortBreak * 60 : this.props.shortBreak
      };
    }
    return {
      type: 'pomodoro',
      time: inputInMinutes ? this.props.pomodoro * 60 : this.props.pomodoro
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      iterations: [],
      isRunning: false
    };

    this.togglePlay = this.togglePlay.bind(this);
    this.resetCounter = this.resetCounter.bind(this);
  }

  setNewIteration() {
    const iterationType = this.constructor.calcIterationTime.call(this, this.state.iterations.length + 1);
    const iterations = this.state.iterations.slice();

    this.setState({
      iterations: iterations.concat([{
        type: iterationType.type,
        totalTime: iterationType.time,
        remainingTime: iterationType.time
      }])
    });
  }

  startCounter() {
    const {iterations} = this.state;
    const {onStart, onUpdate} = this.props;

    const currentIteration = iterations.slice().pop();

    if (currentIteration.remainingTime === currentIteration.totalTime) {
      currentIteration.start = Date.now();
    }

    this.counter = setInterval(() => {
      if (currentIteration.remainingTime > 0) {
        const iterations = this.state.iterations.slice();
        iterations[iterations.length - 1].remainingTime--;
        this.setState({iterations}, () => onUpdate(this.state));
      } else {
        this.resetCounter();

        if (this.props.autoPlay) {
          this.startCounter();
        }
      }
    }, 1000);

    this.setState({isRunning: true}, () => onStart(this.state));
  }

  pauseCounter() {
    const {onPause} = this.props;

    this.stopCounter(() => {
      onPause(this.state);
    });
  }

  stopCounter(callback = () => {}) {
    clearInterval(this.counter);

    this.setState({isRunning: false}, () => callback());
  }

  togglePlay() {
    if (this.counter && this.state.isRunning) {
      this.pauseCounter();
      return;
    }
    this.startCounter();
  }

  resetCounter() {
    const {onReset} = this.props;
    const {iterations} = this.state;
    const currentIteration = iterations.slice().pop();

    if (currentIteration.remainingTime === currentIteration.totalTime) {
      return;
    }

    this.stopCounter(() => onReset(this.state));
    this.counter = null;
    this.setNewIteration();
  }

  componentWillMount() {
    this.setNewIteration();
  }

  componentWillUnmount() {
    this.resetCounter();
  }

  render() {
    const {iterations} = this.state;
    const totalTime = iterations.slice().pop().totalTime || 0;
    const remainingTime = iterations.slice().pop().remainingTime || 0;
    const timer = prettyTimer(remainingTime);

    // API for children components
    const props = Object.assign({
      togglePlay: this.togglePlay,
      resetCounter: this.resetCounter,
      totalTime,
      remainingTime,
      timer
    }, this.state);

    const children = React.Children.map(this.props.children, child => React.cloneElement(child, props));

    return (
      <div style={this.props.style} className={this.props.className}>{children}</div>
    );
  }
}

PomodoroContainer.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  pomodoro: PropTypes.number,
  shortBreak: PropTypes.number,
  longBreak: PropTypes.number,
  inputTypes: PropTypes.string,
  autoPlay: PropTypes.bool,
  children: PropTypes.any,
  onStart: PropTypes.func,
  onPause: PropTypes.func,
  onReset: PropTypes.func,
  onUpdate: PropTypes.func
};

PomodoroContainer.defaultProps = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  inputTypes: 'minutes',
  autoPlay: true,
  className: `${classPrefix}`,
  onStart: () => null,
  onPause: () => null,
  onReset: () => null,
  onUpdate: () => null
};

export default PomodoroContainer;
