import * as React from 'react';
import styled, { keyframes } from 'styled-components';

type ProgressBarProps = {
  progress: number;
}

const ProgressBarContainer = styled.div `
  position: relative;
  width: 60%;
  height: 16px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
`;

const animate = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: ${(props) => props.progress}%;
  }
`;

const ProgressGreen = styled.div`
  position: absolute;
  height: 100%;
  background-color: #58CB05;
  animation: ${animate} 2s linear;
  width: ${(props) => (props.progress <= 100 ? props.progress : 100)}%;
  display: flex;
  flex-direction: column;
  padding: 4px;
`;

const BrilliantGreen = styled.div`
  position: absolute;
  height: 5px;
  background-color: #7ED651;
  width: 99%;
  border-radius: 10px;
`
const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <ProgressBarContainer>
      <ProgressGreen progress={progress} >
        <BrilliantGreen />
      </ProgressGreen>
    </ProgressBarContainer>
  );
};

export default ProgressBar;