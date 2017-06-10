import React, { Component } from 'react'
import Head from 'next/head'
import Filters from './Filters.js'
import MenuBar from './MenuBar.js'
import globalstyles from '../styles/Main.scss'
import styles from '../styles/Base.scss'

const menubarheight = 83;
const sidewidth = 200;

export default class extends Component {
  render() {
    return (
      <div className="root">

        <Head>
          <title>México en Dron</title>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <link rel="shortcut icon" href="/static/favicon.ico" type="image/x-icon" />
        </Head>

        <div className="menu">
          <MenuBar />
        </div>

        {!this.props.hideSide && <div className="side">
          <Filters />
        </div>}

        <div className={"content" + (this.props.hideSide ? " withoutside" : "")}>
          {this.props.children}
        </div>

        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css?family=Roboto');
          @import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
        `}</style>
        <style jsx global>{globalstyles}</style>
        <style jsx>{styles}</style>

      </div>
    )
  }
}