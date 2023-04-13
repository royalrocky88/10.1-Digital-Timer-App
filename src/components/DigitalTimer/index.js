// Write your code here

import './index.css'

import {Component} from 'react'

const startState = {isTimeRunning: false, startTimer: 25, isTimerLap: 0}

class DigitalTimer extends Component {
  state = startState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  getTimeFormat = () => {
    const {startTimer, isTimerLap} = this.state
    const totalSecond = startTimer * 60 - isTimerLap

    const minutes = Math.floor(totalSecond / 60)
    const seconds = Math.floor(totalSecond % 60)

    const stringMinute = minutes > 9 ? minutes : `0${minutes}`
    const stringSecond = seconds > 9 ? seconds : `0${seconds}`

    return `${stringMinute}:${stringSecond}`
  }

  onReset = () => {
    this.clearTimerInterval()
    this.setState(startState)
  }

  increaseTimeInSecond = () => {
    const {isTimerLap, startTimer} = this.state

    const isTimerComplete = isTimerLap === startTimer * 60

    if (isTimerComplete) {
      this.clearTimerInterval()
      this.setState({isTimeRunning: false})
    } else {
      this.setState(oldValue => ({
        isTimerLap: oldValue.isTimerLap + 1,
      }))
    }
  }

  onPlayPause = () => {
    const {isTimeRunning, startTimer, isTimerLap} = this.state

    const isTimerComplete = isTimerLap === startTimer * 60

    if (isTimerComplete) {
      this.setState({
        isTimerLap: 0,
      })
    }
    if (isTimeRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.increaseTimeInSecond, 1000)
    }
    this.setState(oldValue => ({
      isTimeRunning: !oldValue.isTimeRunning,
    }))
  }

  onIncrement = () => {
    this.setState(oldValue => ({
      startTimer: oldValue.startTimer + 1,
    }))
  }

  onDecrement = () => {
    const {startTimer} = this.state
    if (startTimer > 1) {
      this.setState(oldValue => ({
        startTimer: oldValue.startTimer - 1,
      }))
    }
  }

  render() {
    const {startTimer, isTimeRunning, isTimerLap} = this.state
    const startText = isTimeRunning ? 'Running' : 'Paused'
    const playAndPauseImg = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const playAndPauseAlt = isTimeRunning ? 'pause icon' : 'play icon'
    const startAndPauseTxt = isTimeRunning ? 'Pause' : 'Start'
    const disableBtn = isTimerLap > 0

    return (
      <div className="bg-container">
        <div className="card-container">
          <h1 className="heading-card">Digital Timer</h1>
          <div className="clock-card">
            <div className="timer-card">
              <div className="timer-circle">
                <h1 className="time-text">{this.getTimeFormat()}</h1>
                <p className="play-pause-text">{startText}</p>
              </div>
            </div>
            <div className="play-card">
              <div className="tab-card">
                <button
                  type="button"
                  className="btn-card"
                  onClick={this.onPlayPause}
                >
                  <img
                    src={playAndPauseImg}
                    alt={playAndPauseAlt}
                    className="img-card"
                  />
                  <p className="play-pause-card">{startAndPauseTxt}</p>
                </button>
                <button
                  type="button"
                  className="btn-card"
                  onClick={this.onReset}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="img-card"
                  />
                  <p className="play-pause-card">Reset</p>
                </button>
              </div>
              <div className="timer-limit-container">
                <p className="limit-text">Set Timer Limit</p>
                <div className="plus-minus-card">
                  <button
                    type="button"
                    className="minus-card"
                    onClick={this.onDecrement}
                    disabled={disableBtn}
                  >
                    -
                  </button>
                  <div className="time-increase-card">
                    <p className="time-limit-card">{startTimer}</p>
                  </div>
                  <button
                    type="button"
                    className="plus-card"
                    onClick={this.onIncrement}
                    disabled={disableBtn}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
