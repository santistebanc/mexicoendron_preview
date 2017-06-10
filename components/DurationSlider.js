import React, { Component } from 'react'
import InputRange from 'react-input-range';

const toSeconds = (value) => value < 10 ? value : value < 20 ? (10 + (value - 10) * 5) : (60 + (parseInt(value) - 20) * 10)
const toSteps = (seconds) => seconds < 10 ? seconds : seconds < 60 ? (10 + (seconds - 10) / 5) : parseInt((seconds - 60) / 10 + 20)

export default class extends Component {
  handleChangeRange = ({ max, min }) => {
    this.props.onChange && this.props.onChange({ max: toSeconds(max), min: toSeconds(min) });
  }
  render() {
    const getLabel = (val) => {
      const minut = parseInt(val / 60)
      const sec = parseInt(val % 60)
      return `${minut}:${sec < 10 ? "0" + sec : sec}`
    }
    return (
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', top: -18, left: 0, color: '#333', fontSize: '0.8em' }}>{getLabel(this.props.value.min)}</span>
        <span style={{ position: 'absolute', top: -18, right: 0, color: '#333', fontSize: '0.8em' }}>{getLabel(this.props.value.max)}</span>
        <InputRange ref={input => this.range = input} maxValue={32} minValue={0}
          value={{ min: toSteps(this.props.value.min), max: toSteps(this.props.value.max) }}
          onChange={this.handleChangeRange} formatLabel={val => ``} />
      </div>
    )
  }
}