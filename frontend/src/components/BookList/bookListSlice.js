import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const bookListSlice = createSlice({
  name: 'bookList',
  initialState: {
    books: [],
    isLoading: false,
    hasError: false
  }
});

export default bookListSlice.reducer;