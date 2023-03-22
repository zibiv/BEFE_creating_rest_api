import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getBooks as fetchBooks } from "../../api/books";

export const getBooksAction = () => {
  return async(dispatch) => {
    const books = await fetchBooks();
    dispatch({type: 'bookList/getBooks', payload: books});
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
    } 
  }
});



export const selectAllBooks = state => {
  return state.bookList.books;
}

export default bookListSlice.reducer;