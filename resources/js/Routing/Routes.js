import { Route } from "react-router";
import { Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Plans from '../Pages/Plans';
import Dashboard from '../Pages/Dashboard';
import PDFFlip1 from '../Pages/PDFFlip1.js';
import PDFPreviewFlip from '../Pages/Components/PDFPreviewFlip.js';
import Support from "../Pages/helpCenter.js";

export default function Routing(props) {
    return (
        <Routes>
            <Route exact path={URL_PREFIX} element={<Home {...props} />} />
            <Route exact path={`${URL_PREFIX}plans`} element={<Plans {...props} />} />
            <Route exact path={`${URL_PREFIX}dashboard`} element={<Dashboard {...props} />} />
            <Route exact path={`${URL_PREFIX}pdf-flip`} element={<PDFFlip1 {...props} />} />
            <Route exact path={`${URL_PREFIX}pdf-preview-flip`} element={<PDFPreviewFlip {...props} />} />
            <Route exact path={`${URL_PREFIX}help-center`} element={<Support />}/>
        </Routes>
    );
}
// flipBook