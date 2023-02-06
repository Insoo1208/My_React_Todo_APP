import { useContext } from 'react';
import styled from 'styled-components';
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
    height: calc(100% - 1rem);
    border-radius: 8px;
    overflow-y: auto;
  }

  /* & > div::-webkit-scrollbar-thumb {
    border-radius: 50%;
    background-color: green;
  } */

  .NotYet {
    width: 55%;
    background-color: lavender;
  }
  
  .Completed {
    width: 40%;
    background-color: blueviolet;
    padding-top: 1rem;
  } 
`;

function TodoList() {
  const { todos } = useContext(TodoContext);

  const handleTodo = checkedvalue => {
    const isChecked = checkedvalue;
    let notStared = [];
    const newArr = todos.map((todo) => {
      if (todo.isChecked === isChecked && todo.stared) return (<TodoItems key={todo.id} todo={todo}/>);
      else if (todo.isChecked === isChecked && !todo.stared) notStared.push(<TodoItems key={todo.id} todo={todo} />);
    });
    return newArr.concat(notStared);
  };

  return (
    <Wrapper>
      <div className="NotYet">
        <AddTodo />
        {handleTodo(false)}
      </div>
      <div className="Completed">
        {handleTodo(true)}
      </div>
    </Wrapper>
  );
}

export default TodoList;