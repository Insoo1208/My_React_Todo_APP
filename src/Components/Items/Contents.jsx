import styled from 'styled-components';
import { MdCheck, MdCircle, MdDelete } from 'react-icons/md'
import { useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TodoContext from '../../Contexts/TodoContext';
import LinesEllipsis from 'react-lines-ellipsis';

const theme = {
  basic : {
    true : '#5E89FB',
    false: '#fdfdfd'
  },
  starred : {
    true : '#80784D',
    false: '#5E5336'
  }
}

const StyledLi = styled(motion.li)`
  margin-top: 1rem;
  color: ${props => props.isChecked ? theme[props.starred].true : theme[props.starred].false};
  text-decoration: ${props => props.isChecked ? 'line-through' : 'none'};
  display: flex;
  justify-content: space-between;
  column-gap: .5rem;
  padding-right: .5rem;

  :last-child {
    margin-bottom: .5rem;
  }
`;

const IconWrapper = styled.div`
  width: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Contents(props) {
  const { content: { content, contentChecked, id }, starred } = props;
  const { todos, setTodos } = useContext(TodoContext);

  const handleCheck = id => {
    const newTodo = todos.map(todo => {
      todo.contents.map(content => {
        if (id === content.id) content.contentChecked = !content.contentChecked;
        return content;
      });
      return todo;
    });
    setTodos(newTodo);
    localStorage.setItem('my-todos', JSON.stringify(newTodo));

  };

  const handleDelete = id => {
    const newTodos = todos.map(todo => {
      todo.contents = {...todo}.contents.filter(content => id !== content.id);
      return todo;
    });
    setTodos(newTodos);
    localStorage.setItem('my-todos', JSON.stringify(newTodos));

  }

  return (
    <StyledLi
      layout
      key={id}
      initial = {{ scale: 0 }}
      animate = {{ scale: 1 }}
      transition={{ type: "Inertia" }}

      starred={starred ? 'starred' : 'basic'}
      isChecked={contentChecked}
      onClick={() => handleCheck(id)}
    >
      <IconWrapper>
        {contentChecked ? <MdCheck /> : <MdCircle style={{ fontSize: '.5rem' }} />}
      </IconWrapper>
      <LinesEllipsis
        style={{ flex: '1', paddingRight: '.25rem' }}
        text={content}
        maxLine='1'
        ellipsis='...'
        trimRight
        basedOn='letters'
      />
      <MdDelete style ={starred ? { color: '#80784D' } : { color: '#fdfdfd' }} onClick={e => {e.stopPropagation(); handleDelete(id)}}/>
    </StyledLi>
  );
}

// Warning: Received `true` for a non-boolean attribute `ischecked`.
// If you want to write it to the DOM, pass a string instead: ischecked="true" or ischecked={value.toString()}.

export default Contents;