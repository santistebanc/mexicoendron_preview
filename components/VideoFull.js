import React from 'react';
import styles from '../styles/VideoFull.scss'
import LoadingAnim from 'react-loading-animation'

export default class extends React.Component {
  state = { error: undefined, loading: true }
  componentDidMount() {
    this.videoNode.onerror = (e) => {
      const net = this.videoNode.networkState
      if (net == 3) {
        this.setState({ error: "Este video es privado" })
      } else {
        this.setState({ error: "Video no disponible" })
      }
    }
    this.videoNode.oncanplay = () => {
      this.setState({loading: false})
    }
  }
  componentWillUnmount(){
    this.videoNode.src = ""
    this.videoNode.onerror = null
    this.videoNode = null;
  }
  render() {
    return (
      <div className="root">
        <video ref={node => this.videoNode = node} controls preload={"auto"} autoPlay loop src={this.props.src} />
        {
          this.state.error && <div className="error-overlay">
            <h4>{this.state.error}</h4>
          </div>
        }
        {!this.state.error && this.state.loading && <div ref={node => this.loadoverlay = node} className="loading-overlay"><LoadingAnim /></div>}

        <style jsx>{`
          video::-webkit-media-controls-volume-slider {
              display: none;
          }
          video::-webkit-media-controls-mute-button {
              display: none;
          }
          video::-internal-media-controls-download-button {
              display: none;
          }
          video::-webkit-media-controls-enclosure {
              overflow: hidden;
          }
          video::-webkit-media-controls-panel {
              width: calc(100% - -30px);
          }
          `}</style>

        <style jsx>{styles}</style>
      </div >
    )
  }
}