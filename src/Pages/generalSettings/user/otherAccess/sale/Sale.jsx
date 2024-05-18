import React, { useState } from 'react'
import * as Ant from "antd";
import FormUsersBrandAccess from './FormUsersBrandAccess';
import FormUsersCustomerGroupAccess from './FormUsersCustomerGroupAccess';
import FormUsersCustomerTypeAccess from './FormUsersCustomerTypeaccess';
import FormUsersSaleChannelaccess from './FormUsersSaleChannelaccess';
import FormUsersSaleDocumentTypeAccess from './FormUsersSaleDocumentTypeAccess';


const Sale = ({ userId }) => {
    const { TabPane } = Ant.Tabs;
    const [activeKey, setActiveKey] = useState('1')
    const onChange = (key) => {
        setActiveKey(key)
    };

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Tabs
                type="card"
                onChange={onChange}
            >
                <TabPane tab=" برند " key="1">
                    {<FormUsersBrandAccess userId={userId} />}
                </TabPane>
                <TabPane tab=" گروه مشتری " key="2">
                    {<FormUsersCustomerGroupAccess userId={userId} />}
                </TabPane>
                <TabPane tab=" نوع مشتری " key="3">
                    {<FormUsersCustomerTypeAccess userId={userId} />}
                </TabPane>
                <TabPane tab=" کانال فروش " key="4">
                    {<FormUsersSaleChannelaccess userId={userId} />}
                </TabPane>
                <TabPane tab=" نوع برگه فروش " key="5">
                    {<FormUsersSaleDocumentTypeAccess userId={userId} />}
                </TabPane>
            </Ant.Tabs>
        </>
    )
}

export default Sale
