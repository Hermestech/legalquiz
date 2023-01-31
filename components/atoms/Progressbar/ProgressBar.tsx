import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { useDeviceSize } from '../../../hooks/useDeviceSize';

type ProgressBarProps = {
  progress: number;
}

const ProgressBarContainer = styled.div<{ isDesktop: boolean }> `
  position: relative;
  width: ${(props) => (props.isDesktop ? '60%' : '100%')};
  height: 16px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
`;

const animate = (props: { progress: number }) => keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: ${(props.progress <= 100 ? props.progress : 100)}%;
  }
`

const ProgressGreen = styled.div < { progress: number } >`
  position: absolute;
  height: 99%;
  background-color: #23B4B8;
  animation: ${ animate } 2s linear;
  width: ${(props) => (props.progress <= 100 ? props.progress : 100)}%;
  display: flex;
  flex-direction: column;
  padding: 4px;
`;

const BrilliantGreen = styled.div`
  position: absolute;
  height: 5px;
  background-color: #98e1e2;
  width: 99%;
  border-radius: 10px;
`
const ProgressBar = ({ progress }: ProgressBarProps) => {
  const [width] = useDeviceSize();
  const isDesktop = width > 900;

  return (
    <ProgressBarContainer isDesktop={isDesktop}>
      <ProgressGreen progress={progress} >
        <BrilliantGreen />
      </ProgressGreen>
    </ProgressBarContainer>
  );
};

export default ProgressBar;