import React, { useState, useEffect } from 'react';
import * as Ant from "antd";
import * as styles from "@/styles";
import { usePutWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import * as url from '@/api/url'
import General from './general/General';
import Sale from './sale/Sale';


const FormUsersOtherAccess = ({ userName, userId }) => {
    const { TabPane } = Ant.Tabs;
    const mode = 'right'
    const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
    useRequestManager({ error: editError, editLoading: editLoading, data: editData })
    const [data, setData] = useState({});
    const Grid = () => {
        return (
            <>
                <Ant.Tabs
                    tabPosition={mode}
                >
                    <TabPane forceRender={true} tab=" عمومی " key="1">
                        {<General userId={userId} onSuccessBranch={onSuccessBranch} />}
                    </TabPane>
                    <TabPane forceRender={true} tab=" فروش " key="2">
                        {<Sale userId={userId} />}
                    </TabPane>
                </Ant.Tabs>
            </>
        )
    }

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        editData?.isSuccess
    }, [editData])


    //====================================================================
    //                        Functions
    //====================================================================
    const onSuccessBranch = (selectedIdList) => {
        console.log(selectedIdList);
        setData({ userId, branchIds: selectedIdList });
    }

    const onFinish = async () => {
        await editApiCall(url.ASSIGN_BRANCH_TO_USER, data)
    }


    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <br></br>
            <Ant.Card
                style={{ ...styles.CARD_DEFAULT_STYLES }}
                className="w-full"
                title={` سایر دسترسی های کاربر  " ${userName} "`}
                type="inner"
            >
                <Ant.Tabs
                    tabPosition={mode}
                >
                    <TabPane forceRender={true} tab=" عمومی " key="1">
                        {<General userId={userId} onSuccessBranch={onSuccessBranch} />}
                    </TabPane>
                    <TabPane forceRender={true} tab=" فروش " key="2">
                        {<Sale userId={userId} />}
                    </TabPane>
                </Ant.Tabs>
                <Ant.Button block
                    className='mt-8 '
                    loading={editLoading}
                    type="primary"
                    onClick={onFinish}
                >
                    {'ذخیره'}
                </Ant.Button>
            </Ant.Card>
        </>
    )
}

export default FormUsersOtherAccess
