import {
  render,
  screen,
  fireEvent,
  RenderResult,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import BookInfo from '../components/BookInfo';
import AddBook from '../pages/AddBook';
import { Route, MemoryRouter } from 'react-router-dom';

import { store } from '../redux/store';
import { BookState } from '../types';

const renderBook = (book: BookState): RenderResult =>
  render(
    <Provider store={store}>
      <BookInfo title={book.title} author={book.author} id={book.id} />
    </Provider>
  );

const renderAddBook = (): RenderResult =>
  render(
    <Provider store={store}>
      <MemoryRouter>
        <AddBook />
      </MemoryRouter>
    </Provider>
  );

const renderUpdateBook = (id: string): RenderResult =>
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/update-book/${id}`]}>
        <Route path="/update-book/:id">
          <AddBook />
        </Route>
      </MemoryRouter>
    </Provider>
  );

const getABook = (bookId: string): BookState => {
  const book = store
    .getState()
    .book.bookList.find((book) => book.id === bookId);
  expect(book).not.toBeUndefined();
  return book as BookState;
};

test('Renders BookInfo', () => {
  const book = getABook('1');
  const { asFragment } = renderBook(book);
  expect(asFragment()).toMatchSnapshot();
});

test('AddBook page', () => {
  renderAddBook();
  const initialLength = store.getState().book.bookList.length;

  let titleInput = screen.getByPlaceholderText('The Lord of the Rings'); // Since we know placeholder is already The Lord of the Rings so we can query by it
  expect(titleInput).toBeInTheDocument();
  fireEvent.change(titleInput, { target: { value: 'Test Title' } });
  expect(titleInput).toHaveValue('Test Title');

  let authorInput = screen.getByPlaceholderText('J.R.R Tolkien'); // Since we know placeholder is already J.R.R Tolkien
  expect(authorInput).toBeInTheDocument();
  fireEvent.change(authorInput, { target: { value: 'Test Author' } });
  expect(authorInput).toHaveValue('Test Author');

  let submitButton = screen.getByText('Submit');
  fireEvent.click(
    submitButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  );

  let book = store.getState().book.bookList.length;
  expect(book).toBeGreaterThan(initialLength);
});

test('UpdateBook page', () => {
  const bookId = '1';
  renderUpdateBook(bookId);
  let updateBookData = getABook(bookId);

  const updateBookText = screen.getByTestId('header');
  expect(updateBookText).toHaveTextContent('Update Book');

  let titleInput = screen.getByDisplayValue(updateBookData!.title!); //Making sure by finding titleInput with prepopulated title
  expect(titleInput).toBeInTheDocument();
  fireEvent.change(titleInput, { target: { value: 'Test Title' } }); //And changing its data
  expect(titleInput).toHaveValue('Test Title');

  let authorInput = screen.getByDisplayValue(updateBookData!.author!); //Making sure by finding authorInput with prepopulated author

  expect(authorInput).toBeInTheDocument();
  fireEvent.change(authorInput, { target: { value: 'Test Author' } }); //And changing its data
  expect(authorInput).toHaveValue('Test Author');

  let submitButton = screen.getByText('Submit');
  fireEvent.click(
    submitButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  );

  updateBookData = getABook(bookId);
  expect(updateBookData.title).toBe('Test Title'); // Checking the book with id=1 now has Test Title
  expect(updateBookData.author).toBe('Test Author'); // Checking the book with id=1 now has Test Author
});
