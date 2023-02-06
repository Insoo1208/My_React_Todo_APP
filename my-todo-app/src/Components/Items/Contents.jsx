import styled from 'styled-components';
import { MdCheck } from 'react-icons/md'
import { useState } from 'react';

const StyledLi = styled.li`
  margin-top: 1rem;
  color: ${props => props.ischecked == 'true' ? '#006400' : '#3e3e3e'};
`;

function Contents(props) {
  const { content: { content, contentChecked } } = props;
  console.log(contentChecked);

  return (
    <StyledLi>
      <MdCheck style={{ marginRight: 10 }} ischecked={contentChecked}/>{content}
    </StyledLi>
  );
}

// Warning: Received `true` for a non-boolean attribute `ischecked`.
// If you want to write it to the DOM, pass a string instead: ischecked="true" or ischecked={value.toString()}.

export default Contents;