import React, { Component } from 'react'
import withRedux from "next-redux-wrapper";
import { makeStore } from './store.js'

export default (PageComponent) => withRedux(makeStore, (state) => ({ ...state }))(

  class Page extends Component {
    static async getInitialProps({ store, isServer, res, req }) {
      if (res) {
        const data = { videos: res.videos, tags: res.tags, stems: res.stems }
        store.dispatch({ type: 'SET_FETCHED_VIDEOS', payload: data })
      }
    }
    render() {
      return (
        <PageComponent {...this.props} />
      )
    }
  }

)