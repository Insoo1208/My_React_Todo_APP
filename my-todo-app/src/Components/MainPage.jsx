import { useEffect, useState } from 'react';
import styled from 'styled-components';
import data from "../data.json";
import TodoList from './TodoList';
import TodoContext from '../Contexts/TodoContext';

const Wrapper = styled.div`
  width: 100%;
  height: 700px;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;

  @media screen and (max-width: 900px) {
    height: auto;
    margin-bottom: 5rem;
  }
`;

function MainPage() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const dbTodos = JSON.parse(localStorage.getItem('my-todos')) || data;
    setTodos(dbTodos);
  }, []);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <Wrapper>
        <TodoList />
      </Wrapper>
    </TodoContext.Provider>
  );
}

export default MainPage;