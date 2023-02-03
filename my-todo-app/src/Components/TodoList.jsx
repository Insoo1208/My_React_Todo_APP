import styled from 'styled-components';
import TodoItems from './TodoItems';

const Wrapper = styled.div`
  flex: 1;
`;

function TodoList(props) {
  const { todos } = props;
  return (
    <Wrapper>
      My TODO List :
      {todos.map(todo => <TodoItems key={todo.id} todo={todo}/>)}
    </Wrapper>
  );
}

export default TodoList;