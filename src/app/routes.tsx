import {RouteObject} from 'react-router-dom';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';

export enum RoutePath {
  HOME = '/',
  DETAIL = '/detail',
  PROFILE = '/profile',
  NOT_FOUND = '*',
}

interface ExtendedRouteObject extends RouteObject {
  path?: RoutePath;
  // validation?: boolean;
  // authorized?: boolean;
  // restricted?: boolean;
  children?: ExtendedRouteObject[];
}

const routeObject: ExtendedRouteObject[] = [
  {
    path: RoutePath.HOME,
    element: <HomePage />,
  },
  {
    path: RoutePath.DETAIL,
    element: <DetailPage />,
  },
  //{
  //path: RoutePath.PROFILE,
  //element: <ProfilePage />,
  //},
  //// {path: RoutePath.NOT_FOUND, elemnt: <div>not found</div>},
];

const getRouteObject = (routes: ExtendedRouteObject[]): RouteObject[] =>
  routes.map((routeObject) => {
    const {element} = routeObject;

    if (routeObject.children) getRouteObject(routeObject.children);

    routeObject.element = element;

    return routeObject;
  });

const getRoutes = (): RouteObject[] => getRouteObject(routeObject);

export default getRoutes;
