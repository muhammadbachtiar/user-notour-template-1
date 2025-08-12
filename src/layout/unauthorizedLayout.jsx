import { useLocation } from 'react-router-dom';
import AppHeader from '../components/app-layout/headerApp';
import FooterApp from '../components/app-layout/footerApp';
import MainPage from '../views/mainPage';
import ArticleList from '../views/article/list';
import ArticleDetail from '../views/article/detail';
import Container from '../views/container';
import SearchPage from '../views/search';

const UnautorizedLayout = () => {

  const { pathname } = useLocation();
  let contentComponent;

  switch (true) {
    case pathname ===  "/":
      contentComponent = <MainPage />;
      break;
    case pathname.includes("/article/"):     
      contentComponent = <ArticleDetail />;
      break;
    case pathname ===  "/article":
      contentComponent = <ArticleList />;
      break;
      case pathname.includes("/search/"):     
      contentComponent = <SearchPage />;
      break;
    default:
        contentComponent = <Container />;
  };
  
  return (
        <div className="min-h-screen bg-slate-100 justify-center pb-16 md:pb-0">
            <AppHeader />
            <div className="w-full h-full bg-slate-100 flex flex-col items-center content-center gap-6 md:gap-y-12">
                {contentComponent}
            </div>
            <FooterApp/>
        </div>
  );
};

export default UnautorizedLayout;