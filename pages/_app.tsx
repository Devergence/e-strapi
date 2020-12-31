import {AppProps} from "next/app"
import { useEffect } from "react"
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'

import { themeLight, themeDark } from "../styles/theme"

export default function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    //Remove the ssr injected CSS
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, [])

  return (
    <ThemeProvider theme={ false ? themeDark : themeLight }>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
