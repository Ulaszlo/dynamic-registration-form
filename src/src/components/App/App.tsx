import { useReduxSelector } from 'store';
import { Navigate, Route, Routes } from 'react-router';
import { useDataFromLocalStorage } from 'hooks';
import { MainPage } from 'pages/MainPage';
import { InfoPage } from 'pages/InfoPage';
import { HOME_PAGE, INFO_PAGE } from 'consts/consts';
import 'assets/styles/index.scss';

export const App = () => {
  const { isPolicyAgree, companyType } = useReduxSelector((state) => state.shared);
  useDataFromLocalStorage();

  return (
    <div className="app">
      <Routes>
        <Route path={HOME_PAGE} element={<MainPage />} />
        {companyType && companyType !== '-1' && isPolicyAgree && <Route path={INFO_PAGE} element={<InfoPage />} />}
        <Route path="*" element={<Navigate to={HOME_PAGE} replace />} />
      </Routes>
    </div>
  );
};
