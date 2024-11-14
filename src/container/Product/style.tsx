import styled from "styled-components";

const StyleMainComponent = styled(({ ...rest }) => <div {...rest} />)`
  .cardlinear {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 40%,
      ${({ theme }) => theme.mainColor} 100%
    );
  }
  .loader {
    width: 45px;
    aspect-ratio: 0.75;
    --c: no-repeat linear-gradient(#000 0 0);
    background: var(--c) 0% 50%, var(--c) 50% 50%, var(--c) 100% 50%;
    animation: l7 1s infinite linear alternate;
  }
`;
export { StyleMainComponent };
