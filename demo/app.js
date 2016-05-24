import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import PomodoroContainer, {Clock, Log, Play, Reset} from '../index.js';
import DocumentTitle from 'react-document-title';
import Toggle from 'material-ui/Toggle';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
const NotificationSystem = require('react-notification-system');

class PrettyStandardPomodoro extends Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h2>Default Pomodoro with React Material UI</h2>
        <Clock {...this.props}/>
        <div>
          <Play {...this.props}/>
          <Reset {...this.props}/>
        </div>
        <Log {...this.props} style={{maxWidth: '800px', margin: '0 auto'}}/>
      </div>
    );
  }
}

class UglyCustomPomodoro extends Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleToggle() {
    this.props.togglePlay();
  }

  handleReset() {
    this.props.resetCounter();
  }

  render() {
    return (
      <div style={{textAlign: 'center', marginTop: '60px'}}>
        <h2>Custom Pomodoro without styles</h2>
        <div>
          <button onClick={this.handleToggle}>TOGGLE PLAY</button>
          <button onClick={this.handleReset}>RESET</button>
        </div>
        <ul style={{listStyle: 'none', margin: '20px 0', padding: 0}}>
          {this.props.iterations.map( (it) => <li>{it.type} - {it.remainingTime} seconds</li>)}
        </ul>
      </div>
    );
  }
}

class DocTitle extends Component {
  render() {
    return <DocumentTitle title={this.props.timer}/>;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this._notificationSystem = null;
    this._notifyStart = this._notifyStart.bind(this);
    this._notifyPause = this._notifyPause.bind(this);
    this._notifyReset = this._notifyReset.bind(this);
    this._notifyUpdate = this._notifyUpdate.bind(this);
    this._toggleNotifications = this._toggleNotifications.bind(this);
  }

  getChildContext() {
    return {muiTheme: getMuiTheme(baseTheme)};
  }

  _notifyStart() {
    this._notificationSystem && this._notificationSystem.addNotification({
      message: 'Let\'s Go',
      level: 'success',
      position: 'tl'
    });
  }

  _notifyPause() {
    this._notificationSystem && this._notificationSystem.addNotification({
      message: 'Now waiting...',
      level: 'warning',
      position: 'tl'
    });
  }

  _notifyReset() {
    this._notificationSystem && this._notificationSystem.addNotification({
      message: 'Reeewind!',
      level: 'error',
      position: 'tl'
    });
  }

  _notifyUpdate() {
    this._notificationSystem && this._notificationSystem.addNotification({
      message: 'I\'m ticking...',
      level: 'info',
      position: 'tl'
    });
  }

  _toggleNotifications() {
    if (this._notificationSystem) {
      this._notificationSystem = null;
    } else {
      this._notificationSystem = this.refs.notificationSystem;
    }
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>React Pomodoro Timer</h1>
        <PomodoroContainer
          inputTypes="minutes"
          autoPlay
          pomodoro={25}
          shortBreak={5}
          longBreak={15}
          onStart={this._notifyStart}
          onPause={this._notifyPause}
          onReset={this._notifyReset}
          onUpdate={this._notifyUpdate}
          >
          <DocTitle/>
          <NotificationSystem ref="notificationSystem"/>
          <PrettyStandardPomodoro/>
          <Toggle
            style={{
              width: 'auto',
              position: 'fixed',
              left: 0,
              bottom: 0,
              padding: '30px',
              backgroundColor: '#fff'
            }}
            label="Toggle notifications made with callback calls"
            labelPosition="right"
            onToggle={this._toggleNotifications}
            defaultToggled={this._notificationSystem}
            />
          {/*<UglyCustomPomodoro/>*/}
        </PomodoroContainer>
      </div>
    );
  }
}

App.childContextTypes = {
  muiTheme: PropTypes.object
};

ReactDOM.render(<App></App>, document.getElementById('app'));
