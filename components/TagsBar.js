import React, { Component } from 'react'
import styles from '../styles/TagsBar.scss'

export default class extends Component {
  render() {
    return (
      <div className={"root"}>
        {this.props.tags && this.props.tags.map((tag, i) => 

          <div key={i} className="chip">{tag}</div>
          
        )}

        <style jsx>{styles}</style>
      </div>
    );
  }
}