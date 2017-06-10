import React, { Component } from 'react'
import { connect } from 'react-redux';
import styles from '../styles/Filters.scss'
import DurationSlider from './DurationSlider.js'
import PriceSlider from './PriceSlider.js'

const mapStateToProps = ({ durationFilter, priceFilter }) => ({ durationFilter, priceFilter })

const mapDispatchToProps = (dispatch) => ({
  changeDuration: (min, max) =>
    dispatch({ type: 'CHANGE_DURATION_FILTER', payload: { min, max } }),
  changePrice: (min, max) =>
    dispatch({ type: 'CHANGE_PRICE_FILTER', payload: { min, max } })
})

export default connect(mapStateToProps, mapDispatchToProps)(class extends Component {

  handleChangeDurationSlider = ({ max, min }) => {
    this.props.changeDuration(min, max)
  }
  handleChangePriceSlider = ({ max, min }) => {
    this.props.changePrice(min, max)
  }
  render() {
    return (
      <div className="root">

        <div className="section">
          <h3>Duración</h3>
          <DurationSlider value={this.props.durationFilter} onChange={this.handleChangeDurationSlider} />
        </div>

        <div className="section">
          <h3>Precio</h3>
          <PriceSlider value={this.props.priceFilter} onChange={this.handleChangePriceSlider} />
        </div>

        <div className="section">
          <h3>Categoria</h3>
          <div>Tag1(numero)</div>
          <div>Tag2(numero)</div>
          <div>Tag3(numero)</div>
          <div>Tag4(numero)</div>
          <div>Ver más +</div>
        </div>

        <style jsx>{styles}</style>
      </div>
    )
  }
})