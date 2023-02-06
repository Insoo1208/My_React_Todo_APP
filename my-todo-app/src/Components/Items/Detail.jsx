import styled from 'styled-components';
import Contents from './Contents';

const Wrapper = styled.div`
  height: 150px;
  display: flex;
`;

const StyledUl = styled.ul`
  width: 100%;
  padding-left: 50px;
`;

function Detail(props) {
  const { todo: { contents } } = props;
  return (
    <Wrapper>
      <StyledUl>
        {contents.map((content, index) => <Contents key={index} content={content}/>)}
      </StyledUl>
    </Wrapper>
  );
}

export default Detail;