import { useContext, useState } from 'react';
import styled from 'styled-components';
import { MdStar, MdStarOutline } from "react-icons/md";
import { ImPlus } from 'react-icons/im';
import { v4 as uuidv4 } from "uuid";
import TodoContext from '../Contexts/TodoContext';
import { useMediaQuery } from "react-responsive"

const Wrapper = styled.div`
  width: 100%;
  height: 75px;
  padding: 20px;
  background-color: #4A6BC7;
  margin-bottom: 1rem;
  display: flex;
  column-gap: 1rem;
  align-items: center;
  border-radius: 8px 8px 0 0;

  @media screen and (max-width: 450px) {
      column-gap: .5rem;
    }

  .star {
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
      width: auto;
    }

    @media screen and (max-width: 450px) {
    display: flex;
    align-items: center;
    }
  }
`;

function AddTodo() {
  const { todos, setTodos } = useContext(TodoContext);
  const [title, setTitle] = useState('');
  const [isStarred, setisStarred] = useState(false);

  const isSmallMobile = useMediaQuery({
    query : "(max-width:450px)"
  });

  const handleAdd = (title, isStarred) => {
    const newTodo = todos.InProgress.concat({id: uuidv4(), title , contents: [], isChecked: false, starred: isStarred});
    setTodos({...todos, InProgress: newTodo});
    setTitle('');
    setisStarred(false);
  };
  
  return (
    <Wrapper>
      <div className='star' onClick={() => setisStarred(isStarred => !isStarred)}>
        {isStarred ? <MdStar /> : <MdStarOutline /> }
      </div>
      <label htmlFor='addTodoInput' />
      <input className='input-box' id='addTodoInput' type="text"
        placeholder='??? ??? ?????? ???????????????.'
        value={title}
        onChange={e => setTitle(e.target.value)}
        spellCheck={false}
        autoComplete='off'
        onKeyUp={e => {if(e.key === 'Enter' && title) handleAdd(title, isStarred)}}
      />
      <button className='input-button' onClick={() => handleAdd(title, isStarred)} disabled={!title}>{isSmallMobile ? <ImPlus /> : '??????'}</button>
    </Wrapper>
  );
}

export default AddTodo;