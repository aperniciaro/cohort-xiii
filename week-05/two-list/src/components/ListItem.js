import React, { Component } from 'react'

class ListItem extends Component {
  render() {
    return (
      <section className="list-item">
        <li
          onClick={() => this.props.deleteItem(this.props.item)}
          className={this.props.item.completed ? 'completed-item' : ''}
        >
          {this.props.item.text}
        </li>
        <button onClick={() => this.props.changeComplete(this.props.item)}>
          Update
        </button>
      </section>
    )
  }
}

export default ListItem
