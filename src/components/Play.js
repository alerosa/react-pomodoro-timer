import React, {Component, PropTypes} from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import IconPlay from 'material-ui/svg-icons/av/play-arrow';
import IconPause from 'material-ui/svg-icons/av/pause';
import {grey600 as grey} from 'material-ui/styles/colors';
import merge from 'lodash.merge';
import classPrefix from '../utils/classPrefix.js';

const defaultStyles = {
  fill: grey
};

class Play extends Component {
  getChildContext() {
    /**
     * If muiTheme is defined somewhere in parents components merge it,
     * otherwise use only the default.
     */
    return {muiTheme: getMuiTheme(this.context.muiTheme)};
  }

  shouldComponentUpdate(nextProps) {
    return this.props.isRunning !== nextProps.isRunning || this.props.totalTime !== nextProps.totalTime;
  }

  render() {
    const {isRunning, togglePlay, className, style, ...other} = this.props;
    const s = merge(defaultStyles, style);

    return (
      <IconButton
        {...other}
        iconStyle={s}
        className={className}
        tooltip={isRunning ? 'Stop' : 'Play'}
        tooltipPosition="top-center"
        onClick={togglePlay}>
        {isRunning ? <IconPause/> : <IconPlay/>}
      </IconButton>
   );
  }
}

Play.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  remainingTime: PropTypes.number,
  totalTime: PropTypes.number,
  isRunning: PropTypes.bool,
  togglePlay: PropTypes.func,
  theme: PropTypes.object
};

Play.defaultProps = {
  className: `${classPrefix}__play`
};

Play.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};

Play.contextTypes = {
  muiTheme: PropTypes.object
};

export default Play;
