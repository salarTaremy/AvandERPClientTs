import React from 'react';
import * as Ant from "antd";
import FormUsersBrandAccess from './FormUsersBrandAccess';


const Warehouse = ({ userId, onSuccessBrand, oldBrandId }) => {
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

            </Ant.Tabs>
        </>
    )
}

export default Warehouse
