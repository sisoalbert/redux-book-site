import { Box, Button, Flex, Heading, Stack } from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import BookInfo from '../components/BookInfo';

const BookList = () => {
  const bookList = useAppSelector((state) => state.book.bookList);
  console.log(bookList);
  return (
    <Flex
      height="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box width="50%">
        <Box
          d="flex"
          flexDirection="row"
          justifyContent="space-between"
          marginBottom="20px"
        >
          <Heading color="white">Book List</Heading>
          <Link to="/add-new-book">
            <Button paddingX="3rem">Add</Button>
          </Link>
        </Box>
        <Box rounded="md" bg="purple.500" color="white" px="15px" py="15px">
          <Stack spacing={8}>
            {bookList.map((book) => (
              <BookInfo
                key={book.id}
                title={book.title}
                author={book.author}
                id={book.id}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
};

export default BookList;
