import { useContext } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import TodoContext from '../Contexts/TodoContext';
import AddTodo from './AddTodo';
import TodoItems from './Items/TodoItems';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 2rem;
  display: flex;
  justify-content: space-evenly;
  padding: 10px;

  & > div {
    height: 99%;
    border-radius: 8px;
    width: 45%;
    background-color: #34383E;
  }

  .Completed .banner {
    height: 75px;
    background-color: #4A6BC7;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: larger;
    font-weight: bold;
    color: #efefef;
    border-radius: 8px 8px 0 0;
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;
    row-gap: 1rem;
    height: auto;
    
    .InProgress, .Completed {
      width: 100%;
    }
  }
`;

const TodoWrapper = styled.ul`
  width: 100%;
  height: calc(100% - 75px - 1.5rem);
  overflow-y: scroll;
  border-radius: 8px;

  ::-webkit-scrollbar {
    width: 1.5rem;
    background-color: transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-color: #4A6BC7;
    background-clip: padding-box;
    border: .5rem solid transparent;
  }
`;

function TodoList() {
  const { todos, setTodos } = useContext(TodoContext);

  const handleTodo = checkedvalue => {
    let isStarred = [];
    let notStarred = [];

    for (const todo of todos[checkedvalue]) {
      if (todo.starred) isStarred.push(
        <motion.li
          layout
          key={todo.id}
          initial = {{ scale: 0 }}
          animate = {{ scale: 1 }}
          exit = {{ scale: 0 }}
          transition={{ type: "Inertia" }}
        >
            <TodoItems key={todo.id} todo={todo} />
        </motion.li>
      );
      else if (!todo.starred) notStarred.push(
        <motion.li
          layout
          key={todo.id}
          initial = {{ scale: 0 }}
          animate = {{ scale: 1 }}
          exit = {{ scale: 0 }}
          transition={{ type: "Inertia" }}
        >
            <TodoItems key={todo.id} todo={todo} />
        </motion.li>
      );
    }

    return isStarred.concat(notStarred);
  };

  return (
    <Wrapper>
      <div className="InProgress">
        <AddTodo />
        <TodoWrapper>
          <AnimatePresence mode='popLayout'>
            {handleTodo('InProgress')}
          </AnimatePresence>
        </TodoWrapper>
      </div>
      <div className="Completed">
        <div className="banner">????????? ??? ???.</div>
        <TodoWrapper>
          <AnimatePresence mode='popLayout'>
            {handleTodo('Completed')}
          </AnimatePresence>
        </TodoWrapper>
      </div>
    </Wrapper>
  );
}

export default TodoList;