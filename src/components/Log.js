import React, {Component, PropTypes} from 'react';
import Table from 'material-ui/table/Table';
import TableHeaderColumn from 'material-ui/table/TableHeaderColumn';
import TableRow from 'material-ui/table/TableRow';
import TableHeader from 'material-ui/table/TableHeader';
import TableRowColumn from 'material-ui/table/TableRowColumn';
import TableBody from 'material-ui/table/TableBody';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {red300 as red, green300 as green} from 'material-ui/styles/colors';
import Time from 'react-time';
import merge from 'lodash.merge';

import prettyTimer from '../utils/prettyTimer';
import classPrefix from '../utils/classPrefix.js';

const defaultStyles = {
  table: {},
  header: {
    row: {
      column: []
    }
  },
  body: {
    row: {
      column: []
    }
  }
};

class Log extends Component {
  getChildContext() {
    /**
     * If muiTheme is defined somewhere in parents components merge it,
     * otherwise use only the default.
     */
    return {muiTheme: getMuiTheme(this.context.muiTheme)};
  }

  render() {
    const {iterations, pomodoroColor, breakColor, className, style, ...other} = this.props;
    const s = merge(defaultStyles, style);

    const rows = iterations.map((iteration, index) => {
      const colorType = iteration.type === 'pomodoro' ? pomodoroColor : breakColor;
      const firstColumnStyle = merge({color: colorType}, s.body.row.column[0]);

      return (
        <TableRow key={index} style={s.body.row}>
          <TableRowColumn style={firstColumnStyle}>{iteration.type}</TableRowColumn>
          <TableRowColumn style={s.body.row.column[1]}>{prettyTimer(iteration.totalTime)}</TableRowColumn>
          <TableRowColumn style={s.body.row.column[2]}>{(iteration.start) ? <Time value={iteration.start} format="DD/MM/YYYY - HH:mm:ss"/> : '-'}</TableRowColumn>
          <TableRowColumn style={s.body.row.column[3]}>{prettyTimer(iteration.remainingTime)}</TableRowColumn>
        </TableRow>
      );
    });

    return (
      <div style={s} className={className}>
        <Table {...other} style={s.table} selectable={false}>
          <TableHeader style={s.header} adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow style={s.header.row}>
              <TableHeaderColumn style={s.header.row.column[0]}>Type</TableHeaderColumn>
              <TableHeaderColumn style={s.header.row.column[1]}>Length</TableHeaderColumn>
              <TableHeaderColumn style={s.header.row.column[2]}>Started</TableHeaderColumn>
              <TableHeaderColumn style={s.header.row.column[3]}>Remaining Time</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody style={s.body} displayRowCheckbox={false}>
            {rows}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Log.propTypes = {
  iterations: PropTypes.array,
  pomodoroColor: PropTypes.string,
  breakColor: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  theme: PropTypes.object
};

Log.defaultProps = {
  iterations: [],
  pomodoroColor: red,
  breakColor: green,
  className: `${classPrefix}__log-table`
};

Log.contextTypes = {
  muiTheme: PropTypes.object
};

Log.childContextTypes = {
  muiTheme: PropTypes.object.isRequired
};

export default Log;
