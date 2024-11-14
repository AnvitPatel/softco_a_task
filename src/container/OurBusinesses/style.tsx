import styled from "styled-components";
// import { Theme } from "../../App/theme";
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
// background: ${hexToRgba(Theme.mainColor, 0.9)};
const StyleMainComponent = styled(({ ...rest }) => <div {...rest} />)`
  .contentDiv_ourBusinesses {
    overflow: hidden;
    position: relative;
    .OverBgBlue {
      background: ${({ theme }) => hexToRgba(theme.mainColor, 0.9)};
      position: absolute;
      bottom: 0;
      width: 100%;
      min-height: 79px;
      //   line-height: 0;
      font-size: inherit;
      -webkit-transition: min-height 1s, -webkit-transform 1s;
      transition: min-height 1s, transform 1s;
      padding: 1.5rem 1rem 1.5rem;
      .content_ourBusinesses {
        line-height: 1.3;
        opacity: 0;
        margin-bottom: -206px;
        transition: margin-bottom 1s, transform 1s;
      }
      .round {
        position: absolute;
        // border: 2px solid #fff;
        width: 3rem;
        height: 2.2rem;
        border-radius: 100%;
      }

      #cta {
        width: 100%;
        cursor: pointer;
        position: absolute;
      }

      #cta .arrow {
        left: 30%;
      }
      .arrow {
        position: absolute;
        bottom: 0;
        margin-left: 0px;
        width: 12px;
        height: 12px;
        background-size: contain;
        top: 12px;
      }
      .segunda {
        margin-left: 8px;
      }
      .next {
        background-image: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHN0eWxlPi5zdDB7ZmlsbDojZmZmfTwvc3R5bGU+PHBhdGggY2xhc3M9InN0MCIgZD0iTTMxOS4xIDIxN2MyMC4yIDIwLjIgMTkuOSA1My4yLS42IDczLjdzLTUzLjUgMjAuOC03My43LjZsLTE5MC0xOTBjLTIwLjEtMjAuMi0xOS44LTUzLjIuNy03My43UzEwOSA2LjggMTI5LjEgMjdsMTkwIDE5MHoiLz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzE5LjEgMjkwLjVjMjAuMi0yMC4yIDE5LjktNTMuMi0uNi03My43cy01My41LTIwLjgtNzMuNy0uNmwtMTkwIDE5MGMtMjAuMiAyMC4yLTE5LjkgNTMuMi42IDczLjdzNTMuNSAyMC44IDczLjcuNmwxOTAtMTkweiIvPjwvc3ZnPg==);
      }

      @keyframes bounceAlpha {
        0% {
          opacity: 1;
          transform: translateX(0px) scale(1);
        }
        25% {
          opacity: 0;
          transform: translateX(10px) scale(0.9);
        }
        26% {
          opacity: 0;
          transform: translateX(-10px) scale(0.9);
        }
        55% {
          opacity: 1;
          transform: translateX(0px) scale(1);
        }
      }

      .bounceAlpha {
        animation-name: bounceAlpha;
        animation-duration: 1.4s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }

      .arrow.primera.bounceAlpha {
        animation-name: bounceAlpha;
        animation-duration: 1.4s;
        animation-delay: 0.2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }

      .view-Button:hover .arrow {
        animation-name: bounceAlpha;
        animation-duration: 1.4s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }
      .view-Button:hover .arrow.primera {
        animation-name: bounceAlpha;
        animation-duration: 1.4s;
        animation-delay: 0.2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }
      .view-Button {
        display: none;
        margin-bottom: -206px;
        transition: margin-bottom 1s, transform 1s;
      }
    }
    .OverBgBlue2 {
      background: ${({ theme }) => hexToRgba(theme.mainColor, 0.9)};
      padding: 1.5rem 1rem 1.5rem;
      .content_ourBusinesses {
        // opacity: 1;
        // margin-bottom: 0;
      }
      .round {
        position: absolute;
        // border: 2px solid #fff;
        width: 3rem;
        height: 2.2rem;
        border-radius: 100%;
      }

      #cta {
        width: 100%;
        cursor: pointer;
        position: absolute;
      }

      #cta .arrow {
        left: 30%;
      }
      .arrow {
        position: absolute;
        bottom: 0;
        margin-left: 0px;
        width: 12px;
        height: 12px;
        background-size: contain;
        top: 12px;
      }
      .segunda {
        margin-left: 8px;
      }
      .next {
        background-image: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiI+PHN0eWxlPi5zdDB7ZmlsbDojZmZmfTwvc3R5bGU+PHBhdGggY2xhc3M9InN0MCIgZD0iTTMxOS4xIDIxN2MyMC4yIDIwLjIgMTkuOSA1My4yLS42IDczLjdzLTUzLjUgMjAuOC03My43LjZsLTE5MC0xOTBjLTIwLjEtMjAuMi0xOS44LTUzLjIuNy03My43UzEwOSA2LjggMTI5LjEgMjdsMTkwIDE5MHoiLz48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzE5LjEgMjkwLjVjMjAuMi0yMC4yIDE5LjktNTMuMi0uNi03My43cy01My41LTIwLjgtNzMuNy0uNmwtMTkwIDE5MGMtMjAuMiAyMC4yLTE5LjkgNTMuMi42IDczLjdzNTMuNSAyMC44IDczLjcuNmwxOTAtMTkweiIvPjwvc3ZnPg==);
      }

      @keyframes bounceAlpha {
        0% {
          opacity: 1;
          transform: translateX(0px) scale(1);
        }
        25% {
          opacity: 0;
          transform: translateX(10px) scale(0.9);
        }
        26% {
          opacity: 0;
          transform: translateX(-10px) scale(0.9);
        }
        55% {
          opacity: 1;
          transform: translateX(0px) scale(1);
        }
      }

      .bounceAlpha {
        animation-name: bounceAlpha;
        animation-duration: 1.4s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }

      .arrow.primera.bounceAlpha {
        animation-name: bounceAlpha;
        animation-duration: 1.4s;
        animation-delay: 0.2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }

      .view-Button:hover .arrow {
        animation-name: bounceAlpha;
        animation-duration: 1.4s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }
      .view-Button:hover .arrow.primera {
        animation-name: bounceAlpha;
        animation-duration: 1.4s;
        animation-delay: 0.2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }
      .view-Button {
        // position: absolute;
        transition: margin-bottom 1s, transform 1s;
        display: Block;
        margin-bottom: 0;
      }
      // .view-Button {
      //   display: Block;
      //   margin-bottom: 0;
      // }
    }
  }
  .contentDiv_ourBusinesses:hover {
    .OverBgBlue {
      min-height: 100%;
      .content_ourBusinesses {
        opacity: 1;
        margin-bottom: 0;
      }
      .view-Button {
        display: Block;
        margin-bottom: 0;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .contentDiv_ourBusinesses {
      //   position: none;
      .OverBgBlue {
        position: unset;
        min-height: 100%;
        .content_ourBusinesses {
          opacity: 1;
          margin-bottom: 0;
        }
        .view-Button {
          display: Block;
          margin-bottom: 0;
        }
      }
    }
  }
`;
export { StyleMainComponent };
