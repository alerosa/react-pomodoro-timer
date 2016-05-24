import React, {Component, PropTypes} from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {red300 as red, green300 as green, grey600 as grey} from 'material-ui/styles/colors';
import merge from 'lodash.merge';

import classPrefix from '../utils/classPrefix.js';

const defaultStyles = {
  container: {
    display: 'inline-flex',
    position: 'relative'
  },
  circle: {},
  timer: {
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto'
    },
    text: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 300,
      fontSize: '42px',
      color: grey
    }
  }
};

class Clock extends Component {
  getChildContext() {
    /**
     * If muiTheme is defined somewhere in parents components merge it,
     * otherwise use only the default.
     */
    return {muiTheme: getMuiTheme(this.context.muiTheme)};
  }

  render() {
    const {remainingTime, totalTime, timer, iterations, pomodoroColor, breakColor, className, style, ...other} = this.props;
    const s = merge(defaultStyles, style);

    const percentage = remainingTime / totalTime * 100;
    const color = iterations.slice().pop().type === 'pomodoro' ? pomodoroColor : breakColor;

    return (
      <div style={s} className={className}>
        <div style={s.container}>
          <CircularProgress {...other} style={s.circle} color={color} mode="determinate" value={percentage} size={3}/>
          <div style={s.timer.wrapper}>
            <span style={s.timer.text}>{timer}</span>
          </div>
        </div>
      </div>
    );
  }
}

Clock.propTypes = {
  totalTime: PropTypes.number,
  remainingTime: PropTypes.number,
  timer: PropTypes.string,
  iterations: PropTypes.array,
  pomodoroColor: PropTypes.string,
  breakColor: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  theme: PropTypes.object
};

Clock.defaultProps = {
  totalTime: 0,
  remainingTime: 0,
  pomodoroColor: red,
  breakColor: green,
  className: `${classPrefix}__clock`
};

Clock.contextTypes = {
  muiTheme: PropTypes.object
};

Clock.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default Clock;
