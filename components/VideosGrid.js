import React, { Component } from 'react'
import { connect } from 'react-redux';
import VideoPlayer from './VideoPlayer.js'
import Link from 'next/link'
import styles from '../styles/VideosGrid.scss'

const mapStateToProps = ({ durationFilter, videos }) => ({ durationFilter, videos })

export default connect(mapStateToProps)(class extends React.Component {
  render() {
    const { max, min } = this.props.durationFilter;
    const filteredVideos = this.props.videos ? this.props.videos.filter(v => v.duration !== undefined && parseInt(v.duration) <= max && parseInt(v.duration) >= min) : []
    return (
      <div className="root">

        {filteredVideos.map((vid, i) =>

          <div className={"tile"} key={i}>
            <Link prefetch href={'/video?id=' + vid.id} as={'/video/' + vid.id}><div className="video">
              <VideoPlayer src={vid.thumbpath} duration={vid.duration} poster={vid.posterpath} videoId={vid.id} />
            </div></Link>
          </div>

        )}

        <style jsx>{styles}</style>
      </div>
    )
  }
})