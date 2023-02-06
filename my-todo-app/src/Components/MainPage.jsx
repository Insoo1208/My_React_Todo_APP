import { createContext, useCallback, useState } from 'react';
import styled from 'styled-components';
import data from "../data.json";
import TodoList from './TodoList';
import { v4 as uuidv4 } from "uuid";
import TodoContext from '../Contexts/TodoContext';

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

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <Wrapper>
        <TodoList />
        {/* <TodoList /> */}
      </Wrapper>
    </TodoContext.Provider>
  );
}

export default MainPage;