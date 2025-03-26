import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Page,
    Card,
    Grid,
    Link,
    Button,
    Layout,
    List,
    Icon,
    Spinner,
    Toast,
    ButtonGroup
} from '@shopify/polaris';
import { TickMinor, CancelMajor, StarFilledMinor } from '@shopify/polaris-icons';
import TableNoRecord from './Components/TableNoRecord';
import { fetchMethod, optionsPlan } from './helper';

const displayText = {
    'false': 'No',
    'true': 'Unlimited'
}

const DisplayIcon = ({ param = 'false' }) => {
    const paramCheck = param == 'false' ? false : true;
    return (<Icon source={paramCheck ? TickMinor : CancelMajor} tone={paramCheck ? "success" : "critical"} />)
}

const Plans = (props = {}) => {
    const { shopid = '' } = props;
    const navigate = useNavigate();
    const [planType, setPlanType] = useState(1);
    const [selectedPlan, setSelectedPlan] = useState({});
    const [planList, setPlanList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [activeToastError, setActiveToastError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [activeToastSuccess, setActiveToastSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState();

    //Toast error message component.
    const toastError = activeToastError ? (
        <Toast content={errorMessage} error duration={3000} onDismiss={() => setActiveToastError(false)} />
    ) : null;

    //Toast success message component.
    const toastSaveData = activeToastSuccess ? (
        <Toast content={successMessage} duration={3000} onDismiss={() => setActiveToastSuccess(false)} />
    ) : null;

    //Handle plan type event...
    const handlePlanType = (e, planType) => {
        e.preventDefault();
        setPlanType(planType);
    }

    //Handle plan change event..
    const handlePlan = async (e, planDetails = {}) => {
        setLoader(true);
        e.preventDefault();
        const { id = "", isFree = 0 } = planDetails;
        const request = {
            planId: id,
            isFree
        }
        const responseData = await fetchMethod(postMethodType, 'plans/buy', shopid, request);
        const { responseCode = '', message = '', buyUrl = "" } = responseData;
        if (responseCode === 0) {
            setErrorMessage(message);
            setActiveToastError(true);
            setLoader(false);
        } else {
            top.location.href = buyUrl;
        }
    }

    //Get the plan list..
    const getPlanList = async () => {
        setLoader(true);
        const responseData = await fetchMethod(getMethodType, 'plans/get', shopid);
        const { responseCode = '', message = '', data: { plans = [], usersPlan = {} } = {} } = responseData;
        if (responseCode === 0) {
            setErrorMessage(message);
            setActiveToastError(true);
        } else {
            setPlanList(plans);
            setSelectedPlan(usersPlan);
        }
        setLoader(false);
    }

    useEffect(() => {
        getPlanList();
    }, []);

    const { isFree = 0, plan_id = '' } = selectedPlan;

    return (
        <div className="plans_container">
            {loader && <Spinner accessibilityLabel="Small spinner example" size="large" />}
            <Page
                // fullWidth
                title="Plans"
                subtitle="Get started for free and upgrade plan as your business scales."
            >
                <Layout>
                    <Layout.Section>
                        <div className="plans_area">
                            {toastError}
                            {toastSaveData}
                            {/* <div className="month_yearly">
                                <ButtonGroup variant="segmented">
                                    {optionsPlan.map((option, optionIndex) => {
                                        const { label = '', value = '' } = option;
                                        return (<Button key={`btn_optionkey_${optionIndex}`} size="large" tone={planType === value ? "success" : ""} variant={planType === value ? "primary" : ""} onClick={(e) => handlePlanType(e, value)}>{label}</Button>)
                                    })}
                                </ButtonGroup>
                            </div> */}
                            {
                                planList.length > 0
                                    ?
                                    <Grid>
                                        {planList.map(pItem => {
                                            const { id = "", name = "", price = 0.00, catelog_limit = 'false', catelog_page_limit = 'false', catelog_product_limit = 'false', layout_limit = 'false', font_limit = 'false', barcode = 'false', isAddFrontBack = 'false', isFree = 0 } = pItem;
                                            let layoutLimitMsg = layout_limit + ' different layouts';
                                            if (layout_limit === 'true')
                                                layoutLimitMsg = '15+ product catalog PDF layouts';
                                            else if (layout_limit === 'false')
                                                layoutLimitMsg = 'No different layouts';

                                            return (
                                                <Grid.Cell key={`plan_key_${id}`} columnSpan={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
                                                    <div className={`box_card${id === plan_id ? ' active' : ''}`}>
                                                        {(id === plan_id) && <div className="active_plan"><Icon source={StarFilledMinor} tone="base" /></div>}
                                                        <Card>
                                                            <div className="free plan_card">
                                                                <h3 className="plan_title">{name}</h3>
                                                                <div className="price_area">
                                                                    <h5>${planType === 1 ? price : (price * 12).toFixed(2)}</h5>
                                                                    <p className="note">{`per ${planType === 1 ? 'month' : 'year'}`}</p>
                                                                </div>
                                                                <List>
                                                                    <List.Item><DisplayIcon param={catelog_limit} />{`${displayText[catelog_limit] ?? catelog_limit} catalogs`}</List.Item>
                                                                    <List.Item><DisplayIcon param={catelog_page_limit} />{`${displayText[catelog_page_limit] ?? catelog_page_limit} pages per catalog`}</List.Item>
                                                                    <List.Item><DisplayIcon param={catelog_product_limit} />{`${displayText[catelog_product_limit] ?? 'Up to ' + catelog_product_limit} products per catalog`}</List.Item>
                                                                    <List.Item><DisplayIcon param={layout_limit} />{layoutLimitMsg}</List.Item>
                                                                    <List.Item><DisplayIcon param={font_limit} />{font_limit === 'false' ? 'No font customization' : 'Font customization options'}</List.Item>
                                                                    <List.Item><DisplayIcon param={barcode} />{barcode === 'false' ? 'No support for barcodes' : 'Support for barcodes'}</List.Item>
                                                                    <List.Item><DisplayIcon param={isAddFrontBack} />{isAddFrontBack === 'false' ? 'No front/back covers' : 'Custom front/back covers'}</List.Item>
                                                                </List>
                                                                {/* <p>If you don't want to add transfer. You can import your inventory from <Link url="setting">settings</Link></p> */}
                                                                <Button size="large" disabled={id === plan_id /* || isFree */} onClick={(e) => handlePlan(e, pItem)}>Subscribe</Button>
                                                            </div>
                                                        </Card>
                                                    </div>
                                                </Grid.Cell>
                                            )
                                        })}
                                    </Grid>
                                    :
                                    <Card>
                                        <TableNoRecord
                                            emptyProps={{
                                                heading: "No Plans Selected",
                                                message: "Please choose a subscription plan to use the app.",
                                                image: "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                                            }}
                                        />
                                    </Card>
                            }
                        </div>
                    </Layout.Section>
                </Layout>
            </Page>
        </div>
    );
}

export default Plans;