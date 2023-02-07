import styled from 'styled-components';
import { useCallback, useState } from 'react';
import Thumbnail from './Thumbnail';
import Detail from './Detail';
import { AnimatePresence, motion } from 'framer-motion';

const Wrapper = styled.div`
  width: calc(100% - 1rem);
  margin: 0 0 1rem 1rem;
  border-radius: 8px;
  background-color: ${props => props.stared ? '#FFFC9E' : '#2D427A'};
  color: ${props => props.stared ? '#5E5336' : '#fdfdfd'};
  padding: 10px;
`;

const MotionWrapper = styled(motion.div)`

`;

function TodoItems(props) {
  const { todo, todo: { stared } } = props;
  const [detailOpened, setDetailOpened] = useState(false);

  const handleDetail = useCallback(() => {
    setDetailOpened(detailOpened => !detailOpened)
  }, [detailOpened]);

  return (
    <Wrapper stared={stared}>
      <Thumbnail todo={todo} handleDetail={handleDetail}/>
      <AnimatePresence>
        {detailOpened && 
          <MotionWrapper key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1,
              transition : {
                height : {
                  duration: .35,
                },
                opacity : {
                  delay: .3
                }
              }
            }}
            exit={{ height: 0, opacity : 0,
              transition : {
                height : {
                  delay: .25
                },
                opacity : {
                  duration: .15
                }
              }
            }}
          >
            <Detail todo={todo} />
          </MotionWrapper>
        }
      </AnimatePresence>
    </Wrapper>
  );
}

export default TodoItems;