import styled from 'styled-components';
import { MdStar, MdStarOutline, MdCheckBox, MdCheckBoxOutlineBlank, MdRemoveCircleOutline } from "react-icons/md";
import React, { useContext } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import TodoContext from '../../Contexts/TodoContext';

const Wrapper = styled.div`
  display: flex;
  height: 4.5rem;
`;

const ContentsWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;

  .title {
    flex: 1;
    padding: 10px 5px;
    font-weight: bold;
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
`;

const Star = styled.div`
  color: ${props => props.starred ? '#5E5336' : '#FFD700'};
`;

const Check = styled.div`
  color: ${props => props.starred ? '#5E5336' : '#5E89FB'};
`;

const DeleteWrapper = styled.div`
  width: 7.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: ${props => props.starred ? '#5E5336' : '#efefef'};
  cursor: pointer;
`;

function Thumbnail(props) {
  const { todo: { title, starred, isChecked, id }, todo, handleDetail } = props;
  const { todos, setTodos } = useContext(TodoContext);
  const checkedValue = todo.isChecked ? 'Completed' : 'InProgress';

  const deleteTodo = id => {
    const newTodo = todos[checkedValue].filter(todo => todo.id !== id);
    const newTodos = {...todos, [checkedValue]: newTodo};
    setTodos(newTodos);
  };

  const handleStar = id => {
    const newTodo = todos[checkedValue].map(todo => {
      if(todo.id === id) todo.starred = !todo.starred;
      return todo;
    });
    const newTodos = {...todos, [checkedValue]: newTodo};
    setTodos(newTodos);
  };

  const handleCheck = id => {
    const before = todo.isChecked ? 'Completed' : 'InProgress';
    const after = todo.isChecked ? 'InProgress' : 'Completed';

    todo.isChecked = !isChecked;

    const oldTodo = todos[before].filter(todo => todo.id !== id);
    const newTodo = todos[after].concat(todo);

    const newTodos = {...todos, [before]: oldTodo, [after]: newTodo};

    setTodos(newTodos);
  };

  return (
    <Wrapper>
      <CheckWrapper>
        <Star className="star" onClick={() => handleStar(id)} starred={starred}>
          {starred ? <MdStar /> : <MdStarOutline /> }
        </Star>
        <Check className="check" onClick={() => handleCheck(id)} starred={starred} >
          {isChecked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </Check>
      </CheckWrapper>
      <ContentsWrapper onClick={handleDetail}>
        <LinesEllipsis
          className="title"
          text={title}
          maxLine='1'
          ellipsis='...'
          trimRight
          basedOn='letters'
        />
      </ContentsWrapper>
      <DeleteWrapper starred={starred}>
        <MdRemoveCircleOutline onClick={() => deleteTodo(id)}/>
      </DeleteWrapper>
    </Wrapper>
  );
}

export default React.memo(Thumbnail);