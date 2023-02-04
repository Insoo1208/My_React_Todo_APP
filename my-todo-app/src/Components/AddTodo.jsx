import { useState } from 'react';
import styled from 'styled-components';
import { MdStar, MdStarOutline } from "react-icons/md";

const Wrapper = styled.div`
  width: 100%;
  height: 75px;
  padding: 20px;
  background-color: beige;
  margin-bottom: 10px;
  display: flex;
`;

const StarButton = styled.div`
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  font-weight: bold;
  color: black;
`;

function AddTodo(props) {
  const { onClick } = props;
  const [title, setTitle] = useState('');
  const [isStared, setIsStared] = useState(false);
  
  return (
    <Wrapper>
      <StarButton onClick={() => setIsStared(isStared => !isStared)}>
        {isStared ? <MdStar /> : <MdStarOutline /> }
      </StarButton>
      <label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)}  />
      </label>
      <button onClick={() => {
        onClick(title, isStared);
        setTitle('');
      }} disabled={!title}>add</button>
    </Wrapper>
  );
}

export default AddTodo;