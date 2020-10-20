import React from 'react'

const BookmarkContext = React.createContext({
    bookmarks: [],
    addBookmark: () => {},
    deleteBookmark: () => {},
    updateBookmark: () => {},
})

export default BookmarkContext