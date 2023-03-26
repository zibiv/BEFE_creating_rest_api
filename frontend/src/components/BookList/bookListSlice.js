import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { getBooks as fetchBooks, addNewBook as fetchPostNewBook, deleteBook as fetchDeleteBook } from "../../api/books";

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

//создание thunk action creator 
export const deleteBookAction = createAsyncThunk(
  'bookList/deleteBook',
  async (id, thunkAPI) => {
    try {
      //удаляем книгу отправляя запрос к серверу с id книги
      const responseStatus = await fetchDeleteBook(id);
      //сюда мы перенесли логику из onDeleteBook обработчика из компонента Book, если код ответа отличается от 200 (почему не 204?=) мы возвращаем action.payload содержащий описание причины отрицательного результата и возвращаем действие  с типом bookList/deleteBook/rejected
      if (responseStatus !== 200) return alert("Deleting failed man!");
      //если статус верный то возвращаем id для дальнейшего использования в дополнительным reducer
      return id;
    } catch(error) {
      //если происходит прочие ошибки так же формируем action с отрицательным результатом
      thunkAPI.rejectWithValue(error.message);
    }
    
  }
);


const bookListSlice = createSlice({
  name: 'bookList',
  initialState: {
    books: [],
    asyncStatus: 'idle',
    error: null
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
  },
  extraReducers: {
    [deleteBookAction.pending]: (state) => {
      state.asyncStatus = 'loading';
      state.error = null;
    },
    [deleteBookAction.rejected]: (state, action) => {
      state.asyncStatus = 'error';
      state.error = action.payload;
    },
    [deleteBookAction.fulfilled]: (state, action) => {
      state.asyncStatus = 'idle'
      state.error = null;
      state.books = state.books.filter(book => book.id !== action.payload);
    }
  }
});



export const selectAllBooks = state => {
  return state.bookList.books;
};

export const selectAsyncStatus = state => {
  return {
    error: state.bookList.error,
    asyncStatus: state.bookList.asyncStatus
  }
}

export default bookListSlice.reducer;