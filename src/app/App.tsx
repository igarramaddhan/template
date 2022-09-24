import {useRoutes} from 'react-router-dom';
import getRoutes from './routes';

const App = () => {
  const routes = useRoutes(getRoutes());
  return <>{routes}</>;
};

export default App;
