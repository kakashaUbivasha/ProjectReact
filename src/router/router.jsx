import {Routes, Route, Navigate, Router} from "react-router-dom";
import Authorization from "../page/Authorization.jsx";
import Registration from "../page/Registration.jsx";
import Home from "../page/Home.jsx"
import CreateCatalog from "../components/CreateCatalog.jsx";
import Account from "../page/Account.jsx";
import Catalog from "../page/Catalog.jsx";
import PropTypes from 'prop-types';
import ChangeCatalog from "../components/ChangeCatalog.jsx";
import CreateItem from "../components/CreateItem.jsx"
import ChangeItem from "../components/ChangeItem.jsx";
import Item from "../page/Item.jsx";
import SearchResults from "../page/SearchResults.jsx";
const PrivateRoute = ({ element: Element, ...rest }) => {
    const token = localStorage.getItem('token');
    const isAuthenticated = token && token !== '';

    return isAuthenticated ? (
        <Element {...rest} />
    ) : (
        <Navigate to="/autorization" replace />
    );
};

const MainRouter = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="account" element={<PrivateRoute element={Account} />} />
            <Route path="/catalog/:catalogId" element={<Catalog />} />
            <Route path="/change-catalog/:catalogId" element={<ChangeCatalog />} />
            <Route path="/catalog/:catalogId/change-item/:itemId" element={<ChangeItem />} />
            <Route path="autorization" element={<Authorization />} />
            <Route path="/search-results" element={<SearchResults />}/>
            <Route path="/catalog/:catalogId/create-item" element={<CreateItem />}/>
            <Route path="registration" element={<Registration />} />
            <Route path="/catalog/:catalogId/item/:itemId" element={<Item />} />
            <Route path="create-catalog" element={<PrivateRoute element={CreateCatalog} />}/>
        </Routes>

    );
};
PrivateRoute.propTypes = {
    element: PropTypes.element.isRequired,
};
export default MainRouter;