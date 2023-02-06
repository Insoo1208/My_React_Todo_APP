import { useContext, useState } from 'react';
import styled from 'styled-components';
import { MdStar, MdStarOutline } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import TodoContext from '../Contexts/TodoContext';

const Wrapper = styled.div`
  width: 100%;
  height: 75px;
  padding: 20px;
  background-color: beige;
  margin-bottom: 10px;
  display: flex;
  column-gap: 15px;
  align-items: center;

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
    border: none;
    outline: none;
    background: transparent;
    border-bottom: 2px solid green;
  }

  .input-button {
    width: 10%;
    height: 70%;
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
function AddTodo() {
  const { todos, setTodos } = useContext(TodoContext);
  const [title, setTitle] = useState('');
  const [isStared, setIsStared] = useState(false);

  const handleAdd = (title, isStared) => {
    const newTodo = {id: uuidv4(), title , content: [], isChecked: false, stared: isStared}
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
      <input className='input-box' id='addTodoInput' type="text" value={title} onChange={e => setTitle(e.target.value)} spellCheck={false} />
      <button className='input-button' onClick={() => handleAdd(title, isStared)} disabled={!title}>Add</button>
    </Wrapper>
  );
}

export default AddTodo;