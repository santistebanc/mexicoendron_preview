import React, { Component } from 'react';
import VideoFull from './VideoFull.js';
import TagsBar from './TagsBar.js';
import styles from '../styles/VideoCard.scss'

export default class extends Component {
  render() {
    return (
      <div className={"root"}>

        <div className="tile">

          <div className="video">
            <VideoFull src={this.props.fullpath} />
          </div>

          <div className="info">
            <h2>{this.props.title}</h2>
            <div className="details">
              <TagsBar tags={this.props.tags} />
            </div>
            <div className="actions">
              <button id="download">
                <i className='icon fa fa-download' />Descargar
              </button>
              <button id="add">
                <i className='icon fa fa-plus-square-o' />Añadir
              </button>
            </div>
          </div>
          
        </div>

        <style jsx>{styles}</style>
      </div>
    )
  }
}