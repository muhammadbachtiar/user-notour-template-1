import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UnautorizedLayout from "../layout/unauthorizedLayout";
import useSetting from "../hooks/settings/useSettings";
import { generateRoutes } from "../services/utils/generateRoutes";
import NotFound from "../views/notfound";

const Routers = () => {
  const { data: menu } = useSetting(`menu-${import.meta.env.VITE_VILLAGE_ID}`, {});
 
  return (
    <Router>
      <Routes>
          <Route path="/" element={<UnautorizedLayout />} />
          <Route path="/article" element={<UnautorizedLayout />} />
          <Route path="/article/:slug" element={<UnautorizedLayout />} />
          <Route path="/search/:search" element={<UnautorizedLayout />} />
          {generateRoutes(Array.isArray(menu?.value) ? menu.value : [])}
          <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Routers;
