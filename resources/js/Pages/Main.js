
import { useMemo, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Spinner, Toast } from '@shopify/polaris';
import { Provider } from '@shopify/app-bridge-react';
import Routes from '../Routing/Routes'
import { fetchMethod } from './helper';

export default function Main(props = {}) {
    const { shopid = '' } = props;
    const [loader, setLoader] = useState(true);
    const [activePlan, setActivePlan] = useState({});
    const [activeToastError, setActiveToastError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const navigate = useNavigate();
    const location = useLocation();
    const history = useMemo(
        () => ({ replace: (path) => navigate(path, { replace: true }) }),
        [navigate],
    );

    //Toast error message component.
    const toastError = activeToastError ? (
        <Toast content={errorMessage} error duration={3000} onDismiss={() => setActiveToastError(false)} />
    ) : null;

    const config = {
        apiKey: shopifyApiKey,
        shopOrigin: new URLSearchParams(document.location.search).get("shop"),
        host: new URLSearchParams(document.location.search).get("host"), // Add the 'host' property
        forceRedirect: true,

    };
    const router = useMemo(
        () => ({
            location,
            history,
        }),
        [location, history],
    );

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Convert days to milliseconds
        document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; Secure; SameSite=Lax`;
    }

    // Set a cookie that expires in 1 year

    useEffect(() => {
        //Check current plan. if it's expire than redirect to plan page.
        const checkPlan = async () => {
            const { pathname = '' } = location;
            const responseData = await fetchMethod(getMethodType, 'plans/checkPlan', shopid);
            const { responseCode = '', errorCode = 0, message = '', data: { usersPlan = {}, totalCatelog = 0, domain = "default" } = {} } = responseData;
            // alert(`domain4 + ${domain}`);
            // console.log("domain", responseData);
            localStorage.setItem("domain", domain);
            // const { catelog_limit = 'false', name = '' } = usersPlan;
            usersPlan.totalCatelog = totalCatelog;
            /* if (responseCode === 0 && errorCode === 101 && pathname !== '/plans') {
                setErrorMessage(`Important: Your current plan has expired. Please upgrade your plan.`);
                setActiveToastError(true);
                setActivePlan(usersPlan);
                setTimeout(() => {
                    setLoader(false);
                    navigate(`${URL_PREFIX}plans`);
                }, 3000);
            } else if ((totalCatelog >= Number(catelog_limit) || catelog_limit === 'false') && pathname !== '/plans') {
                setErrorMessage(`Catalog limit reached! Your current plan allows up to ${catelog_limit === 'false' ? 0 : catelog_limit} catalogs. Please upgrade your plan to increase the limit.`);
                setActiveToastError(true);
                setActivePlan(usersPlan);
                setTimeout(() => {
                    setLoader(false);
                    navigate(`${URL_PREFIX}plans`);
                }, 3000);
            }  else { */
            setActivePlan(usersPlan);
            setLoader(false);
            // }
        }

        checkPlan();
    }, []);

    return (
        <Provider
            config={config}
            router={router}
        >
            {loader
                ? <div className="main_container">{toastError}<Spinner accessibilityLabel="Spinner example" size="large" /></div>
                : <Routes {...{ ...props, activePlan }} />
            }
        </Provider>
    );
}