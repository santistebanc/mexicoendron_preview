import React, { Component } from 'react'
import styles from '../styles/SearchBar.scss'

export default class extends Component {

  state = { value: '' }
  
  handleInput = (e) => {
    this.setState({ value: e.target.value })
    this.props.onChange(e.target.value)
  }
  handleSearch = (e) => {
    e.preventDefault()
    this.props.onRequestSearch(this.props.value || this.state.value);
  }

  render() {
    const value = this.props.value || this.state.value
    return (
      <div className={"root"}>

        <form onSubmit={this.handleSearch}>
          <input type="text" placeholder="Buscar" value={value} onChange={this.handleInput} />
        </form>
        <button><i className='fa fa-search' /></button>

        <style jsx>{styles}</style>
      </div>
    )
  }
}