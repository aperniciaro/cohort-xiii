import React, { Component } from 'react'
import axios from 'axios'
import AddItemForm from './AddItemForm'
import ListItem from './ListItem'

class ToDoList extends Component {
  state = {
    newItemText: '',
    todoList: [],
    accessToken: 'cohort-xiii'
  }

  getApiUrl = () => {
    return `https://localhost:5001/api/items`
  }

  updateStateWithNewItem = event => {
    this.setState({
      newItemText: event.target.value
    })
  }

  componentDidMount() {
    this.getListFromAPI()
    // check local storage for a token
    const token = localStorage.getItem('list-access-token')
    if (token) {
      this.setState(
        {
          accessToken: token
        },
        () => {
          this.getListFromAPI()
        }
      )
    }
  }

  getListFromAPI = () => {
    // go to the API
    axios.get(this.getApiUrl()).then(resp => {
      // populate state with the todo list
      this.setState({
        todoList: resp.data
      })
    })
  }

  deleteItem = item => {
    const url = `https://localhost:5001/api/items/${item.id}`
    axios.delete(url).then(resp => {
      this.getListFromAPI()
    })
  }

  addItemToApi = event => {
    console.log(this.state.newItemText)
    event.preventDefault()
    axios
      .post(this.getApiUrl(), {
        item: {
          text: this.state.newItemText
        }
      })
      .then(resp => {
        console.log(resp)
        // get lateset list form API
        this.getListFromAPI()
        // update state to clear out the input field
        this.setState({
          newItemText: ''
        })
      })
  }

  changeComplete = item => {
    const url = `https://localhost:5001/api/items/${item.id}`
    axios.put(url).then(resp => {
      this.getListFromAPI()
    })
  }

  generateRandomToken = () => {
    // creat a new string that is 20 random characters long
    return Math.floor(Math.random() * Math.pow(10, 20)).toString()
  }

  resetList = () => {
    // reset the state
    // reset toDoList
    // reset the newItemText
    // create new token
    this.setState(
      {
        todoList: [],
        newItemText: '',
        accessToken: this.generateRandomToken()
      },
      () => {
        console.log(this.state.accessToken)
        this.getListFromAPI()
        // store the new token in localstorage
        localStorage.setItem('list-access-token', this.state.accessToken)
      }
    )
  }

  render() {
    return (
      <>
        <button onClick={this.resetList}>RESET LIST</button>
        <AddItemForm
          addItemToApi={this.addItemToApi}
          newItemText={this.state.newItemText}
          updateStateWithNewItem={this.updateStateWithNewItem}
        />
        <p className="output" />
        <ol className="todo-list">
          {this.state.todoList
            .filter(f => f.complete === false)
            .map(item => {
              return (
                <ListItem
                  key={item.id}
                  item={item}
                  deleteItem={this.deleteItem}
                  changeComplete={this.changeComplete}
                />
              )
            })}
        </ol>
        <ol className="complete-list">
          {this.state.todoList
            .filter(f => f.complete === true)
            .map(item => {
              return (
                <ListItem
                  key={item.id}
                  item={item}
                  deleteItem={this.deleteItem}
                  changeComplete={this.changeComplete}
                />
              )
            })}
        </ol>
      </>
    )
  }
}

export default ToDoList
