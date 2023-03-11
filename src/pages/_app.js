import '@/styles/globals.css'
import '@/styles/Login.module.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function MyApp({ Component, pageProps }) {
  return (
    <div className="parent">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
