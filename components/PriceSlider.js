import React, { Component } from 'react'
import InputRange from 'react-input-range';

const toMoney = (value) => value * 5
const toSteps = (money) => money / 5

export default class extends Component {
  handleChangeRange = ({ max, min }) => {
    this.props.onChange && this.props.onChange({ max: toMoney(max), min: toMoney(min) });
  }
  render() {
    return (
      <div className={"green"} style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', top: -18, left: 0, color: '#333', fontSize: '0.8em' }}>{`${this.props.value.min} MXN`}</span>
        <span style={{ position: 'absolute', top: -18, right: 0, color: '#333', fontSize: '0.8em' }}>{`${this.props.value.max} MXN`}</span>
        <InputRange ref={input => this.range = input} maxValue={20} minValue={0}
          value={{ min: toSteps(this.props.value.min), max: toSteps(this.props.value.max) }}
          onChange={this.handleChangeRange} formatLabel={val => ``} />
      </div>
    )
  }
}