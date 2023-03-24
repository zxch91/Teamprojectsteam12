import '@/styles/globals.css'
import '@/styles/Login.module.css';
import '@/styles/Landing.module.css';
import Header from '@/components/header';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function MyApp({ Component, pageProps }) {
  return (
    <div className="parent">
      <div><Header/></div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
