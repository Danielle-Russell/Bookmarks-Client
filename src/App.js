import React, { Component } from 'react';
import './App.css';
import Nav from './Nav';
import { Route } from 'react-router-dom';
import AddBookmark from './AddBookmark';
import BookmarkList from './BookmarkList';
import EditBookmark from './EditBookmark'
import config from './config';


import BookmarkContext from './Context';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
      error: null
    };
  }

  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }

  deleteBookmark = bookmarkId => {
    const newBookmarks = this.state.bookmarks.filter(bm =>
      bm.id !== bookmarkId
    )
    this.setState({
      bookmarks: newBookmarks
    })
  }


  componentDidMount() {

    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if(!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json();
      })
      .then(this.setBookmarks)
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }

  updateBookmark = updatedBookmark => {
    this.setState({
      bookmarks: this.state.bookmarks.map(bm =>
        (bm.id !== updatedBookmark.id) ? bm : updatedBookmark
      )
    })
  }

  render() {
    const contextValue = {
      bookmarks: this.state.bookmarks,
      addBookmark: this.addBookmark,
      deleteBookmark: this.deleteBookmark,
      updateBookmark: this.updateBookmark,
    }

  console.log(process.env)
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
        <BookmarkContext.Provider value={contextValue}>
          <Nav />
          <div className='content' aria-live='polite'>
            <Route
              exact
              path='/'
              component={BookmarkList}
            />
            <Route
              path='/add-bookmark'
              component={AddBookmark}
            />
            <Route
              path='/edit/:bookmarkId'
              component={EditBookmark}
            />
          </div>
        </BookmarkContext.Provider>
      </main>
    );
  }
}


export default App;
