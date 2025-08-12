import { Route } from "react-router-dom";
import UnautorizedLayout from "../../layout/unauthorizedLayout";

export function generateRoutes(items, parentPath = '') {
  const routes = [];

  items.forEach((item) => {
    const currentPath = item.route
      ? `${parentPath}${item.route}`.replace(/^\/+/, '').replace(/\/+$/, '')
      : parentPath;

    if (item.staticPage) {
      routes.push(
        <Route
          key={currentPath}
          path={currentPath}
          element={<UnautorizedLayout staticPage={item.staticPage} />}
        />
      );
    }

    if (item.child && item.child.length > 0) {
      routes.push(...generateRoutes(item.child, currentPath));
    }
  });
  
  return routes;
}