import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getBooks as fetchBooks, addNewBook as fetchPostNewBook } from "../../api/books";

export const getBooksAction = () => {
  return async(dispatch) => {
    const books = await fetchBooks();
    dispatch({type: 'bookList/getBooks', payload: books});
  }
}

export const addNewBookAction = (newBookTitle, newBookStart, newBookEnd) => {
  return async(dispatch) => {
    console.log('I am in addNewBook thunk action creator');
    fetchPostNewBook(newBookTitle, newBookStart, newBookEnd)
    .then(newBook => {
      dispatch({type: 'bookList/addNewBook', payload: newBook })
    });
    
  }
}


const bookListSlice = createSlice({
  name: 'bookList',
  initialState: {
    books: [],
    isLoading: false,
    hasError: false
  },
  reducers: {
    getBooks: (state, action) => {
        console.log('I in reduser');
        state.books = action.payload;
    },
    addNewBook: (state,action) => {
      console.log('I reducer for adding new book');
      state.books.push(action.payload)
    }
  }
});



export const selectAllBooks = state => {
  return state.bookList.books;
}

export default bookListSlice.reducer;