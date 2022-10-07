import {Suspense} from 'react';
import {useRoutes} from 'react-router-dom';
import getRoutes from './routes';

const App = () => {
  const routes = useRoutes(getRoutes());
  return <Suspense fallback={'loading...'}>{routes}</Suspense>;
};

export default App;
