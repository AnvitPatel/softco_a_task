import styled from "styled-components";
// import { Theme } from "./theme";

const StyleMainComponent = styled(({ ...rest }) => <div {...rest} />)`
  .active {
    .menubox {
      background: #4880ff;
      color: white;
    }
  }
  .menubox:hover {
    background: #4880ff;
    color: white;
  }
`;
export { StyleMainComponent };
