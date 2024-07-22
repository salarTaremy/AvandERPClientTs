import React from 'react'
import * as Ant from "antd";
import FormUsersCustomerGroupAccess from './FormUsersCustomerGroupAccess';
import FormUsersCustomerTypeAccess from './FormUsersCustomerTypeAccess';
import FormUsersSaleChannelAccess from './FormUsersSaleChannelAccess';
import FormUsersSaleDocumentTypeAccess from './FormUsersSaleDocumentTypeAccess';


const Sale = (props) => {
    const {
        userId,
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
                <TabPane forceRender={true} tab=" گروه مشتری " key="1">
                    <FormUsersCustomerGroupAccess
                        userId={userId}
                        onSuccessCustomerGroupAccess={onSuccessCustomerGroupAccess}
                        oldGroupId={oldGroupId}
                    />
                </TabPane>
                <TabPane forceRender={true} tab=" نوع مشتری " key="2">
                    <FormUsersCustomerTypeAccess
                        userId={userId}
                        onSuccessCustomerTypeAccess={onSuccessCustomerTypeAccess}
                        oldTypeId={oldTypeId}
                    />
                </TabPane>
                <TabPane forceRender={true} tab=" کانال فروش " key="3">
                    <FormUsersSaleChannelAccess
                        userId={userId}
                        onSuccessSaleChannelAccess={onSuccessSaleChannelAccess}
                        oldChannelId={oldChannelId}
                    />
                </TabPane>
                <TabPane forceRender={true} tab=" نوع برگه فروش " key="4">
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
