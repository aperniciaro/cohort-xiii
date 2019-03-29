import React, { Component } from 'react'

class ListItem extends Component {
  render() {
    return (
      <>
        <li
          onClick={() => this.props.deleteItem(this.props.item)}
          className={this.props.item.completed ? 'completed-item' : ''}
        >
          {this.props.item.text}
        </li>
        <button onClick={() => this.props.changeComplete(this.props.item)}>
          Update
        </button>
      </>
    )
  }
}

export default ListItem
