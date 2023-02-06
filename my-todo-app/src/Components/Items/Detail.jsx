import { useContext, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import styled from 'styled-components';
import TodoContext from '../../Contexts/TodoContext';
import Contents from './Contents';

const Wrapper = styled.div`
  height: 160px;
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  `;

const StyledUl = styled.ul`
  width: 100%;
  height: 120px;
  overflow-y: auto;
`;

const InputBoxWrapper = styled.div`
  display: flex;
  align-items: center;

  input {
    flex: 1;
    height: 35px;
    margin-bottom: 5px;
    border: none;
    outline: none;
    background: transparent;
    border-bottom: 2px solid green;
  }

  button {
    width: 10%;
    height: 70%;
    margin: 0 10px;
    cursor: pointer;
    color: white;
    background-color: #3CB371;
    border: none;
    border-radius: 6px;

    :hover {
      background-color: #2E8B57;
    }
  }
`;

function Detail(props) {
  const { todo: { contents, id } } = props;
  const [value, setValue] = useState('');

  const { todos, setTodos } = useContext(TodoContext);

  const handleSubmit = id => {
    const newTodos = todos.map(todo => {
      if (id === todo.id) {
        console.log(todo.contents);
        todo.contents.concat({content: value, contentChecked: false, id: uuidv4()});
      };
      return todo;
    });
    setTodos(newTodos);
  };


  return (
    <Wrapper>
      <StyledUl>
        {contents.map(content => <Contents key={content.id} content={content}/>)}
      </StyledUl>
      <InputBoxWrapper>
        <label htmlFor='contentInputBox' />
        <input type="text" id='contentInputBox' value={value} onChange={e => setValue(e.target.value)}/>
        <button type='button' onClick={() => handleSubmit(id)}>Add</button>
      </InputBoxWrapper>
    </Wrapper>
  );
}

export default Detail;