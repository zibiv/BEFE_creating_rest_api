import { configureStore } from '@reduxjs/toolkit';
import bookList from '../components/BookList/bookListSlice';

export default configureStore({
  reducer: {
    bookList: bookList
  }
});