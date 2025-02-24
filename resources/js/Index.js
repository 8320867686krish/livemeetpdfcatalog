
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import '../../public/css/style.css';
import translations from "@shopify/polaris/locales/en.json";
import { BrowserRouter } from 'react-router-dom';
import Main from './Pages/Main'
import { Frame } from '@shopify/polaris';

export default function Index(props) {
    // console.log = function () {};

    return (
        <BrowserRouter>
            <AppProvider i18n={translations}>
                <Frame>
                    <Main {...props} />
                </Frame>
            </AppProvider>
        </BrowserRouter>

    );

}