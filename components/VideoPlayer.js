import React from 'react';
import { connect } from 'react-redux';
import styles from '../styles/VideoPlayer.scss'
import LoadingAnim from 'react-loading-animation'

const mouseoverdelay = 500;

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: undefined, videoready: false, loadvideo: false, mouseover: false, poster: '/static/posterNotFound.png' }
  }
  componentDidMount() {
    let posterimg = new Image();
    posterimg.onerror = (e) => {
      e.preventDefault()
      posterimg.onload = null;
      posterimg.onerror = null;
      posterimg = null;
      this.setState({ poster: '/static/posterNotFound.png' });
      return true;
    }
    posterimg.onload = () => {
      posterimg.onerror = null;
      posterimg.onload = null;
      posterimg = null;
      this.setState({ poster: this.props.poster });
    }
    posterimg.src = this.props.poster;
  }
  startTimeOut() {
    this.mouseOverTimeout = setTimeout(() => {
      const mouseover = true;
      let loadvideo = true;
      if (this.state.videoready) {
        this.playVid();
      }
      this.setState({ mouseover, loadvideo })
      clearTimeout(this.mouseOverTimeout)
    }, mouseoverdelay);
  }
  componentDidUpdate() {
    if (this.videoNode) {
      this.videoNode.oncanplaythrough = () => {
        if (this.state.mouseover) {
          this.startTimeOut()
        }
        this.setState({ videoready: true })
      }
      this.videoNode.onplay = () => {
        this.playInterval = setInterval(() => {
          if (this.progressbar) {
            this.progressbar.style.width = parseInt(this.videoNode.currentTime / this.videoNode.duration * 100) + "%"
          }
        }, 100)
      }
    }
  }
  componentWillUnmount() {
    if (this.progressbar) {
      this.progressbar = null
    }
    clearInterval(this.playInterval)
    clearTimeout(this.mouseOverTimeout)
    if (this.videoNode) {
      this.videoNode.src = ""
      this.videoNode.oncanplaythrough = null
      this.videoNode.onplay = null
      this.videoNode = null;
    }
  }
  playVid = () => {
    if (this.videoNode) {
      this.videoNode.play();
    }
  }
  pauseVid = () => {
    if (this.videoNode) {
      this.videoNode.pause();
    }
  }
  handleMouseEnter = (e) => {
    this.startTimeOut()
  }
  handleMouseLeave = (e) => {
    clearTimeout(this.mouseOverTimeout)
    if (this.state.videoready) {
      this.pauseVid();
    }
    this.setState({ mouseover: false })
  }
  render() {
    const self = this;
    const min = parseInt(this.props.duration / 60)
    const sec = parseInt(this.props.duration % 60)
    const formatedduration = this.props.duration ? (min + ":" + (sec < 10 ? ("0" + sec) : sec)) : ""
    return (
      <div className="root" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} >

        <div className={"poster " + (this.state.videoready ? "hide" : "")}>

          <picture className="media">
            <img className="posterimage" style={{display: (this.state.errorposter?'none':'inherit')}} src={this.props.poster} onError={(e)=>{ this.setState({errorposter: true}) }} />
          </picture>

        </div>

        {this.state.loadvideo && <video ref={node => this.videoNode = node} loop preload={"auto"} src={this.props.src}
          style={{ height: "100%", width: "100%", display: (this.state.videoready ? "inherit" : "none") }} />}


        {!this.state.mouseover && <div className={"overlay"}>
          <div className="duration">{formatedduration}</div>
        </div>}

        <div ref={(div) => this.progressbar = div} className="progressbar" />

        {this.state.error && <div className="error-overlay">
          <h4>{this.state.error}</h4>
        </div>}

        {!this.state.error && this.state.loadvideo && !this.state.videoready && <div ref={node => this.loadoverlay = node} className="loading-overlay"><LoadingAnim /></div>}

        <div className={"afterelement"} />

        <style jsx>{styles}</style>
      </div >
    )
  }
}