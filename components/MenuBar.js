import React, { Component } from 'react'
import Link from 'next/link'
import SearchBar from './SearchBar.js'
import LoginForm from './LoginForm.js'
import styles from '../styles/MenuBar.scss'

export default class extends Component {
  state = {showloginform: false}
  handleRequestSearch = (query) => {
    console.log("search ", query)
  }
  handleChangeSearch = (algo) => {
    //cada vez que el usuario cambia un caracter
  }
  handleLogin = () => {
    this.setState({showloginform: !this.state.showloginform})
  }
  render() {
    return (
      <div className="root">

        <div className="logo-section">
           <Link prefetch href='/'><div className="logo">
            <img src="https://s3-us-west-2.amazonaws.com/mexicoendron/MexicoEnDron.png" />
          </div></Link>
        </div>

        <div className="search">
          <SearchBar onRequestSearch={this.handleRequestSearch} onChange={this.handleChangeSearch} />
        </div>
      

        <div className="nav">
           <button onClick={this.handleLogin}>Iniciar Sesión</button>
           <div className={"logincontainer "+(this.state.showloginform?'show':'')}><div className="loginform"><LoginForm/></div></div>
        </div>

        <style jsx>{styles}</style>
      </div>
    );
  }
}