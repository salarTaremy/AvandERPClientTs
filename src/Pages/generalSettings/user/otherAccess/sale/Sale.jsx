import React from 'react'
import * as Ant from "antd";
import FormUsersBrandAccess from './FormUsersBrandAccess';
import FormUsersCustomerGroupAccess from './FormUsersCustomerGroupAccess';
import FormUsersCustomerTypeAccess from './FormUsersCustomerTypeAccess';
import FormUsersSaleChannelaccess from './FormUsersSaleChannelaccess';
import FormUsersSaleDocumentTypeAccess from './FormUsersSaleDocumentTypeAccess';


const Sale = (props) => {
    const {
        userId,
        onSuccessBrand,
        oldBrandId,
        onSuccessCustomerGroupAccess,
        oldGroupId,
        onSuccessCustomerTypeAccess,
        oldTypeId,
        onSuccessSaleChannelAccess,
        oldChannelId,
        onSuccessSaleDocumentTypeAccess,
        oldDocumentId
    } = props
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
                    <FormUsersBrandAccess
                        userId={userId}
                        onSuccessBrand={onSuccessBrand}
                        oldBrandId={oldBrandId}
                    />
                </TabPane>
                <TabPane forceRender={true} tab=" گروه مشتری " key="2">
                    <FormUsersCustomerGroupAccess
                        userId={userId}
                        onSuccessCustomerGroupAccess={onSuccessCustomerGroupAccess}
                        oldGroupId={oldGroupId}
                    />
                </TabPane>
                <TabPane forceRender={true} tab=" نوع مشتری " key="3">
                    <FormUsersCustomerTypeAccess
                        userId={userId}
                        onSuccessCustomerTypeAccess={onSuccessCustomerTypeAccess}
                        oldTypeId={oldTypeId}
                    />
                </TabPane>
                <TabPane forceRender={true} tab=" کانال فروش " key="4">
                    <FormUsersSaleChannelaccess
                        userId={userId}
                        onSuccessSaleChannelAccess={onSuccessSaleChannelAccess}
                        oldChannelId={oldChannelId}
                    />
                </TabPane>
                <TabPane forceRender={true} tab=" نوع برگه فروش " key="5">
                    <FormUsersSaleDocumentTypeAccess
                        userId={userId}
                        onSuccessSaleDocumentTypeAccess={onSuccessSaleDocumentTypeAccess}
                        oldDocumentId={oldDocumentId}
                    />
                </TabPane>
            </Ant.Tabs>
        </>
    )
}

export default Sale
