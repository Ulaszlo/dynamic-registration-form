import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import ReactDOM from 'react-dom/client';
import { StoreProviderRedux } from 'components/Providers/StoreProvider';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'components/Providers/ErrorBoundary';
import { HOME_PAGE } from 'consts/consts';
import { App } from './components/App';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StoreProviderRedux>
    <BrowserRouter
      basename={HOME_PAGE}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </StoreProviderRedux>
);
