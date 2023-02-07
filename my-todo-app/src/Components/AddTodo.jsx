import { useContext, useState } from 'react';
import styled from 'styled-components';
import { MdStar, MdStarOutline } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import TodoContext from '../Contexts/TodoContext';

const Wrapper = styled.div`
  width: 100%;
  height: 75px;
  padding: 20px;
  background-color: #4A6BC7;
  margin-bottom: 1rem;
  display: flex;
  column-gap: 15px;
  align-items: center;
  border-radius: 8px 8px 0 0;

  .star {
    width: 5%;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    color: #FFD700;
    cursor: pointer;
  }

  .input-box {
    flex: 1;
    height: 100%;
    color: #fdfdfd;
    border: none;
    outline: none;
    background: transparent;
    border-bottom: 2px solid #5E89FB;

    ::placeholder {
      color: #efefef;
    }
  }

  .input-button {
    width: 10%;
    height: 70%;
    cursor: pointer;
    color: white;
    background-color: #5E89FB;
    border: none;
    border-radius: 6px;

    :hover {
      background-color: #2D427A;
    }

    @media screen and (max-width: 1200px) {
      width: 15%;
    }
  }
`;
function AddTodo() {
  const { todos, setTodos } = useContext(TodoContext);
  const [title, setTitle] = useState('');
  const [isStared, setIsStared] = useState(false);

  const handleAdd = (title, isStared) => {
    const newTodo = {id: uuidv4(), title , contents: [], isChecked: false, stared: isStared}
    setTodos(todos.concat(newTodo));
    setTitle('');
    setIsStared(false);
  };
  
  return (
    <Wrapper>
      <div className='star' onClick={() => setIsStared(isStared => !isStared)}>
        {isStared ? <MdStar /> : <MdStarOutline /> }
      </div>
      <label htmlFor='addTodoInput' />
      <input className='input-box' id='addTodoInput' type="text"
        placeholder='새 할 일을 입력하세요.'
        value={title}
        onChange={e => setTitle(e.target.value)}
        spellCheck={false}
        autoComplete='off'
        onKeyUp={e => {if(e.key === 'Enter' && title) handleAdd(title, isStared)}}
      />
      <button className='input-button' onClick={() => handleAdd(title, isStared)} disabled={!title}>추가</button>
    </Wrapper>
  );
}

export default AddTodo;