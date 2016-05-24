# react-pomodoro-timer

**This work is still in early beta: still no `npm-install` available and docs are largely incomplete.**
**the build configuration for webpack can barely bundle the files together, at the moment nothing is compressed nor optimized**

React Pomodoro Timer is a React component based on the famous [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique) developed by Francesco Cirillo.

It is provided with a set of UI components based on [material-ui](http://www.material-ui.com), but it's possible to use it standalone if you want to create your own interface from scratch.

## Usage

### Simple example
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import PomodoroContainer, {Clock, Log, Play, Reset} from 'react-pomodoro-timer';

const MyPomodoro = () => {
  return (
    <PomodoroContainer>
      <Clock/>
      <Play/>
      <Reset/>
      <Log/>
    </PomodoroContainer>
  );
};

ReactDOM.render(<MyPomodoro/>, document.body);
```

Every child inside `<PomodoroContainer>` will automatically receive the following props:
- className *(String)*: the current classname of the component
- isRunning *(Boolean*): true if the timer is currently running
- iterations *(Array):* an array containing all the iterations, including the current
- remainingTime *(Number)*: the remaining time, expressed in seconds, of the current iteration
- totalTime *(Number)*: the total time in seconds, expressed in seconds, of the current iteration
- timer *(String)*: a formatted representation of the remaining time of the current iteration

**Be careful** that `props` are not passed using `context`, therefore only the direct children of the `<PomodoroContainer>` will receive them.

### More complex example

```javascript
//TODO
```

## API

### Configuration Props
```javascript
<PomodoroContainer
  inputTypes={String}
  autoPlay={Boolean}
  pomodoro={Number}
  shortBreak={Number}
  longBreak={Number}
  >
```
- inputTypes: accepts 'seconds' or 'minutes' *(default: 'minutes')*
- autoPlay: if `true` the timer will restart automatically after every iteration *(default: true)*
- pomodoro: number of minutes/seconds for the "pomodoro" iteration type *(default: 25)*
- shortBreak: number of minutes/seconds for the "short-break" iteration type *(default: 5)*
- longBreak: number of minutes/seconds for the "long-break" iteration type *(default: 15)*

### Callback Props
```javascript
<PomodoroContainer
  onStart={Function}
  onPause={Function}
  onReset={Function}
  onUpdate={Function}
  >
```
- onStart: called every time a new iteration starts
- onPause: called every time the current iteration goes in pause
- onReset: called every time the current iteration is "closed"
- onUpdate: called every time the timer updates its remaining time

## Development
```shell
git clone https://github.com/alerosa/react-pomodoro-timer.git
cd react-pomodoro-timer && npm install
npm install react react-dom material-ui
cd demo && npm install
cd ..
npm run dev
```
