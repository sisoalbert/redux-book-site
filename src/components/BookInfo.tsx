import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Heading, IconButton, Text } from '@chakra-ui/react';

import { useAppDispatch } from '../hooks';
import { deleteBook } from '../redux/bookSlice';
import { useHistory } from 'react-router-dom';

const BookInfo = ({
  title,
  author,
  id,
  ...rest
}: {
  title: string | undefined;
  author: string | undefined;
  id: string;
}) => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const redirect = (id: string) => {
    history.push(`/update-book/${id}`);
  };

  return (
    <Box
      p={5}
      justifyContent="space-between"
      d="flex"
      shadow="md"
      borderWidth="1px"
      {...rest}
    >
      <Box d="flex" flexDirection="column">
        <Heading fontSize="xl">{title}</Heading>
        <Text mt={4}>{author}</Text>
      </Box>
      <Box>
        <IconButton
          color="#1a202c"
          aria-label=""
          icon={<DeleteIcon />}
          marginRight="1rem"
          onClick={() => dispatch(deleteBook({ id }))}
        />
        <IconButton
          color="#1a202c"
          aria-label=""
          icon={<EditIcon />}
          onClick={() => redirect(id)}
        />
      </Box>
    </Box>
  );
};

export default BookInfo;
