import React from 'react'
import * as Ant from "antd";
import FormUsersBranchaccess from './FormUsersBranchAccess';

const General = ({ userId, onSuccessBranch }) => {
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
                    {<FormUsersBranchaccess userId={userId} onSuccessBranch={onSuccessBranch} />}
                </TabPane>

            </Ant.Tabs>
        </>
    )
}

export default General
