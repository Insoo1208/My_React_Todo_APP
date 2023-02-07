import styled from 'styled-components';
import { MdStar, MdStarOutline, MdCheckBox, MdCheckBoxOutlineBlank, MdRemoveCircleOutline } from "react-icons/md";
import { useContext } from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import TodoContext from '../../Contexts/TodoContext';

const Wrapper = styled.div`
  display: flex;
  height: 75px;
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
  color: ${props => props.stared ? '#5E5336' : '#FFD700'};
`;

const Check = styled.div`
  color: ${props => props.stared ? '#5E5336' : '#5E89FB'};
`;

const DeleteWrapper = styled.div`
  width: 7.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: ${props => props.stared ? '#5E5336' : '#efefef'};
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
        <Star className="star" onClick={() => handleStar(id)} stared={stared}>
          {stared ? <MdStar /> : <MdStarOutline /> }
        </Star>
        <Check className="check" onClick={() => handleCheck(id)} stared={stared} >
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
      <DeleteWrapper stared={stared}>
        <MdRemoveCircleOutline onClick={() => deleteTodo(id)}/>
      </DeleteWrapper>
    </Wrapper>
  );
}

export default Thumbnail;