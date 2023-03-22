// TODO: Import API_ENDPOINT
import { API_ENDPOINT } from './';
const BOOKS_API = API_ENDPOINT + '/books';
// TODO: Create the addNewBook function that takes in newTitle, newStart, and newEnd as arguments. Inside the function, create a POST request for the new book. Store the response as a JSON in a variable called newBook and return it at the end of the function.
export const addNewBook = async (newBookTitle, newBookStart, newBookEnd) => {
  const respond = await fetch(BOOKS_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: newBookTitle,
      start: newBookStart,
      end: newBookEnd,
    }),
  });

  const newBookJson = await respond.json();
  return newBookJson;

};
// TODO: Create the getBooks function that retrieves all of the books that have been saved to the back-end API

// TODO: Create the updateBook function that takes the arguments id, newTitle, newStart, newEnd. Inside of the function, create a PUT request for the specified book to be updated. Return the status of the response at the end of the function.

const updateBook = async (id, newTitle, newStart, newEnd) => {
  const response = await fetch(`${BOOKS_API}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    }, 
    body: JSON.stringify({
      newTitle, 
      newStart, 
      newEnd
    })
  })
  //возвращаем статус операции, в компоненте статус будет проверен, если статус будет отличаться от 200 то обработчик события в компоненте выведет сообщение для пользователя
  return response.status;
}

// TODO: Create the deleteBook function that takes the id of the book to be deleted as an argument. Inside of the function, create a DELETE request for the specified book to be deleted. Return the status of the response at the end of the function.
