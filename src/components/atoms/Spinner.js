import styled, { keyframes } from "styled-components/macro";

const rotate = keyframes`
  0%, 80%, 100% {
    transform: scale(0); }
  40% {
    transform: scale(1);
  }
`;

export const Styled = {
  Spinner: styled.div`
    width: ${(props) => (props.isSmall ? "15px" : "20px")};
    height: ${(props) => (props.isSmall ? "15px" : "20px")};
    position: relative;
    margin: 0 auto;
    & div {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    & div:before {
      content: "";
      display: block;
      width: 15%;
      height: 15%;
      background-color: grey;
      border-radius: 100%;
      animation: ${rotate} 1.2s infinite ease-in-out both;
    }
    & div:nth-child(1) {
      transform: rotate(30deg);
    }
    & div:nth-child(2) {
      transform: rotate(60deg);
    }
    & div:nth-child(3) {
      transform: rotate(90deg);
    }
    & div:nth-child(4) {
      transform: rotate(120deg);
    }
    & div:nth-child(5) {
      transform: rotate(150deg);
    }
    & div:ild(6) {
      transform: rotate(180deg);
    }
    & div:nth-child(7) {
      transform: rotate(210deg);
    }
    & div:nth-child(8) {
      transform: rotate(240deg);
    }
    & div:nth-child(9) {
      transform: rotate(270deg);
    }
    & div:nth-child(10) {
      transform: rotate(300deg);
    }
    & div:nth-child(11) {
      transform: rotate(330deg);
    }
    & div:nth-child(1):before {
      animation-delay: -1.1s;
    }
    & div:nth-child(2):before {
      animation-delay: -1s;
    }
    & div:nth-child(3):before {
      animation-delay: -0.9s;
    }
    & div:nth-child(4):before {
      animation-delay: -0.8s;
    }
    & div:nth-child(5):before {
      animation-delay: -0.7s;
    }
    & div:nth-child(6):before {
      animation-delay: -0.6s;
    }
    & div:nth-child(7):before {
      animation-delay: -0.5s;
    }
    & div:nth-child(8):before {
      animation-delay: -0.4s;
    }
    & div:nth-child(9):before {
      animation-delay: -0.3s;
    }
    & div:nth-child(10):before {
      animation-delay: -0.2s;
    }
    & div:nth-child(11):before {
      animation-delay: -0.1s;
    }
  `,
  FullSpaceContainer: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100vh;
    line-height: 1.2rem;
  `,
};

export const Spinner = ({ ...props }) => (
  <Styled.Spinner {...props}>
    {[...Array(12)].map((e, i) => (
      <div key={`spinner_${i}`} />
    ))}
  </Styled.Spinner>
);

export const SpinnerBlock = ({ ...props }) => (
  <Styled.FullSpaceContainer>
    <Spinner {...props} />
  </Styled.FullSpaceContainer>
);
