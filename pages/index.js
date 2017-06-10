import React, { Component } from 'react'
import Base from '../components/Base.js'
import VideosGrid from '../components/VideosGrid.js';
import NoSSR from 'react-no-ssr'
import LoadingAnim from 'react-loading-animation'
import Page from '../Page.js'

export default Page(

  class extends Component {
    render() {
      return (
        <Base>
          <NoSSR onSSR={<LoadingAnim style={{ marginTop: '20%' }} />}>
            <VideosGrid />
          </NoSSR>
        </Base>
      )
    }
  }

)
