import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Hydrate, QueryClient, QueryClientProvider} from '@tanstack/react-query';

import App from './App';

const dehydratedState = window.__REACT_QUERY_STATE__;

const queryClient = new QueryClient();

console.log('>>', 'hydrate');
ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <QueryClientProvider client={queryClient}>
    <Hydrate state={dehydratedState}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Hydrate>
  </QueryClientProvider>
);
