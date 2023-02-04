import styled from 'styled-components';
import AddTodo from './AddTodo';
import TodoItems from './TodoItems';

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
    padding-top: 10px;
  } 
`;

function TodoList(props) {
  const { todos, onClick } = props;

  const handleTodo =  () => {
    let notStared = [];
    const newArr = todos.reduce((arr, todo) => {
      if (!todo.isChecked && todo.stared) arr.push(<TodoItems key={todo.id} todo={todo} />);
      else if (!todo.isChecked && !todo.stared) notStared.push(<TodoItems key={todo.id} todo={todo} />);
      return arr;
    }, []);
    return newArr.concat(notStared);
  };

  return (
    <Wrapper>
      <div className="NotYet">
        <AddTodo onClick={onClick}/>
        {handleTodo()}
      </div>
      <div className="Completed">
        {todos.map(todo => { if (todo.isChecked) return <TodoItems key={todo.id} todo={todo} />})}
      </div>
    </Wrapper>
  );
}

export default TodoList;