import styled from 'styled-components';
import { MdStar, MdStarOutline, MdCheckBox, MdCheckBoxOutlineBlank, MdRemoveCircleOutline } from "react-icons/md";
import { useContext } from 'react';
import TodoContext from '../../Contexts/TodoContext';

const Wrapper = styled.div`
  display: flex;
  height: 75px;
`;

const ContentsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .title {
    padding: 10px 5px;
    font-weight: bold;
  }
  .content {
    padding: 6px 5px;
  }
`;

const CheckWrapper = styled.div`
  width: 10%;
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  div {
    width: 100%;
    text-align: center;
    margin: auto 0;
    cursor: pointer;
  }

  .star {
    color: #FFD700;
  }

  .check {
    color: green;
  }
`;

const DeleteWrapper = styled.div`
  width: 7.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: red;
  cursor: pointer;
`;

function Thumbnail(props) {
  const { todo: { title, stared, isChecked, id }, handleDetail } = props;
  const { todos, setTodos } = useContext(TodoContext);

  const deleteTodo = id => {
    const newTodo = todos.filter(todo => todo.id !== id);
    setTodos(newTodo);
  };

  const handleStar = id => {
    const newTodo = todos.map(todo => {
      if(todo.id === id) todo.stared = !todo.stared;
      return todo;
    });
    setTodos(newTodo);
  };

  const handleCheck = id => {
    const newTodo = todos.map(todo => {
      if(todo.id === id) todo.isChecked = !todo.isChecked;
      return todo;
    });
    setTodos(newTodo);
  };

  return (
    <Wrapper>
      <CheckWrapper>
        <div className="star" onClick={() => handleStar(id)}>
          {stared ? <MdStar /> : <MdStarOutline /> }
        </div>
        <div className="check" onClick={() => handleCheck(id)}>
          {isChecked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </div>
      </CheckWrapper>
      <ContentsWrapper onClick={handleDetail}>
        <div className="title">{title}</div>
      </ContentsWrapper>
      <DeleteWrapper>
        <MdRemoveCircleOutline onClick={() => deleteTodo(id)}/>
      </DeleteWrapper>
    </Wrapper>
  );
}

export default Thumbnail;