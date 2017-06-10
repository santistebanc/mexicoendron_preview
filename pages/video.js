import React, { Component } from 'react'
import Base from '../components/Base.js'
import VideoCard from '../components/VideoCard.js';
import Page from '../Page.js'

export default Page(

  class extends Component {
    render() {
      const video = this.props.videos.find(v => v.id == this.props.url.query.id)
      return (
        <Base hideSide>
          <VideoCard {...video} />
        </Base>
      )
    }
  }

)
