import React, {Component, PropTypes} from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import IconReplay from 'material-ui/svg-icons/av/replay';
import {grey600 as grey} from 'material-ui/styles/colors';
import merge from 'lodash.merge';
import classPrefix from '../utils/classPrefix.js';

const defaultStyles = {
  fill: grey
};

class Reset extends Component {
  getChildContext() {
    /**
     * If muiTheme is defined somewhere in parents components merge it,
     * otherwise use only the default.
     */
    return {muiTheme: getMuiTheme(this.context.muiTheme)};
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {resetCounter, className, style, ...other} = this.props;
    const s = merge(defaultStyles, style);

    return (
      <IconButton
        {...other}
        iconStyle={s}
        className={className}
        onClick={resetCounter}
        tooltip="Reset"
        tooltipPosition="top-center">
        <IconReplay/>
      </IconButton>
   );
  }
}

Reset.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  resetCounter: PropTypes.func,
  theme: PropTypes.object
};

Reset.defaultProps = {
  className: `${classPrefix}__reset`
};

Reset.contextTypes = {
  muiTheme: PropTypes.object
};

Reset.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default Reset;
