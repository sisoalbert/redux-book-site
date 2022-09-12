import { store } from '../redux/store';
import { deleteBook, updateBook, addNewBook } from '../redux/bookSlice';

test('Updates a books author and title', () => {
  let state = store.getState().book;
  const unchangedBook = state.bookList.find((book) => book.id === '1');
  expect(unchangedBook?.title).toBe('1984');
  expect(unchangedBook?.author).toBe('George Orwell');

  store.dispatch(updateBook({ id: '1', title: '1985', author: 'George Bush' }));
  state = store.getState().book;
  let changeBook = state.bookList.find((book) => book.id === '1');
  expect(changeBook?.title).toBe('1985');
  expect(changeBook?.author).toBe('George Bush');

  store.dispatch(
    updateBook({ id: '1', title: '1984', author: 'George Orwell' })
  );
  state = store.getState().book;
  const backToUnchangedBook = state.bookList.find((book) => book.id === '1');

  expect(backToUnchangedBook).toEqual(unchangedBook);
});

test('Deletes a book from list with id', () => {
  let state = store.getState().book;
  const initialBookCount = state.bookList.length;

  store.dispatch(deleteBook({ id: '1' }));
  state = store.getState().book;

  expect(state.bookList.length).toBeLessThan(initialBookCount); // Checking if new length smaller than inital length, which is 3

  // expect(backToUnchangedBook).toEqual(unchangedBook);
});

test('Adds a new book', () => {
  let state = store.getState().book;
  const initialBookCount = state.bookList.length;

  store.dispatch(
    addNewBook({ id: '4', author: 'Tester', title: 'Testers manual' })
  );
  state = store.getState().book;
  const newlyAddedBook = state.bookList.find((book) => book.id === '4');
  expect(newlyAddedBook?.author).toBe('Tester');
  expect(newlyAddedBook?.title).toBe('Testers manual');
  expect(state.bookList.length).toBeGreaterThan(initialBookCount);
});
