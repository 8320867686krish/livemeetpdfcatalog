import { Route } from "react-router";
import { Link, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Plans from '../Pages/Plans';
import Dashboard from '../Pages/Dashboard';
import PDFFlip1 from '../Pages/PDFFlip1.js';
import PDFPreviewFlip from '../Pages/Components/PDFPreviewFlip.js';
import Support from "../Pages/helpCenter.js";
import ProductSelection from "../Pages/Components/ProductSelection.jsx";
import Configrations from "../Pages/configrations.js";

export default function Routing(props) {
    console.log("props are as below ", props);
    console.log("window.URL_PREFIX ", window.URL_PREFIX);
    return (
        <>
            <ui-nav-menu>
                <Link to={`${URL_PREFIX}plans`} >Plans </Link>
                <Link to={`${URL_PREFIX}help-center`} >Help center </Link>
            </ui-nav-menu>
            <Routes>

                <Route exact path={URL_PREFIX} element={<Home {...props} />} />
                <Route exact path={`${URL_PREFIX}home`} element={<Home {...props} />} />

                <Route exact path={`${URL_PREFIX}plans`} element={<Plans {...props} />} />
                <Route exact path={`${URL_PREFIX}dashboard`} element={<Dashboard {...props} />} />
                <Route exact path={`${URL_PREFIX}pdf-flip`} element={<PDFFlip1 {...props} />} />
                <Route exact path={`${URL_PREFIX}pdf-preview-flip`} element={<PDFPreviewFlip {...props} />} />
                <Route exact path={`${URL_PREFIX}help-center`} element={<Support />} />
                <Route exact path={`${URL_PREFIX}add-product`} element={<ProductSelection props={props} />} ></Route>
                {/* <Route exact path={`${URL_PREFIX}edit-product/:pdfId`} element={<ProductSelection props={props} />} ></Route> */}
                <Route exact path={`${URL_PREFIX}configrations`} element={<Configrations {...props} />} ></Route>
            </Routes>
        </>
    );
}