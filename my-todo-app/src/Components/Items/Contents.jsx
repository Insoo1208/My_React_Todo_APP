import styled from 'styled-components';
import { MdCheck } from 'react-icons/md'
import { useContext } from 'react';
import TodoContext from '../../Contexts/TodoContext';

const StyledLi = styled.li`
  margin-top: 1rem;
  color: ${props => props.ischecked == 'true' ? '#5e5e5e' : '#006400'};
  text-decoration: ${props => props.ischecked == 'true' ? 'line-through' : 'none'};
`;

function Contents(props) {
  const { content: { content, contentChecked, id } } = props;
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
  };

  return (
    <StyledLi ischecked={contentChecked.toString()} onClick={() => handleCheck(id)}>
      <MdCheck style={{ marginRight: 10 }}/>{content}
    </StyledLi>
  );
}

// Warning: Received `true` for a non-boolean attribute `ischecked`.
// If you want to write it to the DOM, pass a string instead: ischecked="true" or ischecked={value.toString()}.

export default Contents;