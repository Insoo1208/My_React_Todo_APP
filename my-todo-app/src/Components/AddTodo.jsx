import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 300px;
  height: 300px;
  padding: 20px;
  background-color: beige;
  border: 2px solid black;
  border-radius: 8px;
`;

function AddTodo(props) {
  const { onClick } = props;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAdd = (title, content) => {
    onClick(title, content);
    setTitle('');
    setContent('');
  }

  return (
    <Wrapper>
      <label>
        Title:
        <input type="text" value={title} onChange={e => setTitle(e.target.value)}  />
      </label>
      <br />
      <label>
        content:
        <input type="text" value={content} onChange={e => setContent(e.target.value)}  />
      </label>
      <button onClick={() => {handleAdd(title, content)}} disabled={!(title && content)}>add</button>
    </Wrapper>
  );
}

export default AddTodo;