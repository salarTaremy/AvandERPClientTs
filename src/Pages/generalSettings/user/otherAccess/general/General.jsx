import React from 'react';
import * as Ant from "antd";
import FormUsersBranchAccess from './FormUsersBranchAccess';

const General = ({ userId, onSuccessBranch,oldBranchId }) => {
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
                <TabPane forceRender={true} tab=" شعب " key="1">
                    <FormUsersBranchAccess userId={userId} onSuccessBranch={onSuccessBranch} oldBranchId={oldBranchId} />
                </TabPane>

            </Ant.Tabs>
        </>
    )
}

export default General
