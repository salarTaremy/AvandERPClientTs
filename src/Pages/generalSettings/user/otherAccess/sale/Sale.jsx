import React from 'react'
import * as Ant from "antd";
import FormUsersBrandAccess from './FormUsersBrandAccess';
import FormUsersCustomerGroupAccess from './FormUsersCustomerGroupAccess';
import FormUsersCustomerTypeAccess from './FormUsersCustomerTypeAccess';
import FormUsersSaleChannelaccess from './FormUsersSaleChannelaccess';
import FormUsersSaleDocumentTypeAccess from './FormUsersSaleDocumentTypeAccess';


const Sale = ({ userId }) => {
    const { TabPane } = Ant.Tabs;

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Tabs
                type="card"
                defaultActiveKey="1"
            >
                <TabPane forceRender={true} tab=" برند " key="1">
                    <FormUsersBrandAccess userId={userId} />
                </TabPane>
                <TabPane forceRender={true} tab=" گروه مشتری " key="2">
                    <FormUsersCustomerGroupAccess userId={userId} />
                </TabPane>
                <TabPane forceRender={true} tab=" نوع مشتری " key="3">
                    <FormUsersCustomerTypeAccess userId={userId} />
                </TabPane>
                <TabPane forceRender={true} tab=" کانال فروش " key="4">
                    <FormUsersSaleChannelaccess userId={userId} />
                </TabPane>
                <TabPane forceRender={true} tab=" نوع برگه فروش " key="5">
                    <FormUsersSaleDocumentTypeAccess userId={userId} />
                </TabPane>
            </Ant.Tabs>
        </>
    )
}

export default Sale
