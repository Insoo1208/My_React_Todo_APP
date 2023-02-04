import { useCallback, useState } from 'react';
import styled from 'styled-components';
import data from "../data.json";
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import { v4 as uuidv4 } from "uuid";

const Wrapper = styled.div`
  width: 100%;
  height: 600px;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
`;

function MainPage() {
  const [todos, setTodos] = useState(data);

  const addTodo = useCallback((title, isStared) => {
    const newTodo = {id: uuidv4(), title , content: '', isChecked: false, stared: isStared}
    setTodos(todos.concat(newTodo));
  }, [todos])

  return (
    <Wrapper>
      <TodoList todos={todos} onClick={addTodo}/>
    </Wrapper>
  );
}

export default MainPage;