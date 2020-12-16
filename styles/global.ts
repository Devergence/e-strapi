import { createGlobalStyle, ThemeProps } from "styled-components";
import {theme} from "./theme";

export type MainThemeProps = ThemeProps<typeof theme>
export default createGlobalStyle`
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *,
  *::after,
  *::before { box-sizing: border-box; }
`
