import styled from "styled-components";

const StyleComponent = styled(({ ...rest }) => <div {...rest} />)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
export { StyleComponent };
