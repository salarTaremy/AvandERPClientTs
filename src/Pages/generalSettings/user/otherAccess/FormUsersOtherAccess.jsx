import React, { useState, useEffect } from 'react';
import * as Ant from "antd";
import * as styles from "@/styles";
import { usePutWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import * as url from '@/api/url'
import General from './general/General';
import Sale from './sale/Sale';


const FormUsersOtherAccess = ({ userName, userId, onSuccess }) => {
    const { TabPane } = Ant.Tabs;
    const mode = 'right'
    const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
    const [editBrandData, editBrandLoading, editBrandError, editBrandApiCall] = usePutWithHandler()
    const [editCustomerGroupData, editCustomerGroupLoading, editCustomerGroupError, editCustomerGroupApiCall] = usePutWithHandler()
    const [editCustomerTypeData, editCustomerTypeLoading, editCustomerTypeError, editCustomerTypeApiCall] = usePutWithHandler()
    const [editSaleChannelData, editSaleChannelLoading, editSaleChannelError, editSaleChannelApiCall] = usePutWithHandler()
    const [editSaleDocumentTypeData, editSaleDocumentTypeLoading, editSaleDocumentTypeError, editSaleDocumentTypeApiCall] = usePutWithHandler()
    useRequestManager({ error: editError, editLoading: editLoading, data: editData })
    useRequestManager({ error: editBrandError, editLoading: editBrandLoading, data: editBrandData })
    useRequestManager({ error: editCustomerGroupError, editLoading: editCustomerGroupLoading, data: editCustomerGroupData })
    useRequestManager({ error: editCustomerTypeError, editLoading: editCustomerTypeLoading, data: editCustomerTypeData })
    useRequestManager({ error: editSaleChannelError, editLoading: editSaleChannelLoading, data: editSaleChannelData })
    useRequestManager({ error: editSaleDocumentTypeError, editLoading: editSaleDocumentTypeLoading, data: editSaleDocumentTypeData })
    const [branchData, setBranchData] = useState({});
    const [brandData, setBrandData] = useState({});
    const [customerGroupData, setCustomerGroupData] = useState({});
    const [customerTypeData, setCustomerTypeData] = useState({});
    const [saleChannelData, setSaleChannelData] = useState({});
    const [saleDocumentTypeData, setSaleDocumentTypeData] = useState({});
    const [oldIdList, setOldIdList] = useState([])
    const [oldBrandIdList, setOldBrandIdList] = useState([])
    const [oldGroupIdList, setOldGroupIdList] = useState([])
    const [oldTypeIdList, setOldTypeIdList] = useState([])
    const [oldChannelIdList, setOldChannelIdList] = useState([])
    const [oldDocumentIdList, setOldDocumentIdList] = useState([])
    const bottom = 100

    //====================================================================
    //                        useEffects
    //====================================================================


    //====================================================================
    //                        Functions
    //====================================================================
    const onSuccessBranch = (selectedIdList) => {
        setBranchData({ userId, branchIds: selectedIdList });
    }

    const oldBranchId = (idList) => {
        setOldIdList({ userId, branchIds: idList })
    }

    const onSuccessBrand = (selectedIdList) => {
        setBrandData({ userId, brandIds: selectedIdList });
    }

    const oldBrandId = (idList) => {
        setOldBrandIdList({ userId, brandIds: idList })
    }

    const onSuccessCustomerGroupAccess = (selectedIdList) => {
        setCustomerGroupData({ userId, customerGroupIds: selectedIdList });
    }

    const oldGroupId = (idList) => {
        setOldGroupIdList({ userId, customerGroupIds: idList });
    }

    const onSuccessCustomerTypeAccess = (selectedIdList) => {
        setCustomerTypeData({ userId, customerTypeIds: selectedIdList });
    }

    const oldTypeId = (idList) => {
        setOldTypeIdList({ userId, customerTypeIds: idList });
    }

    const onSuccessSaleChannelAccess = (selectedIdList) => {
        setSaleChannelData({ userId, saleChannelIds: selectedIdList });
    }

    const oldChannelId = (idList) => {
        setOldChannelIdList({ userId, saleChannelIds: idList });
    }

    const onSuccessSaleDocumentTypeAccess = (selectedIdList) => {
        setSaleDocumentTypeData({ userId, saleDocumentTypeIds: selectedIdList });
    }

    const oldDocumentId = (idList) => {
        setOldDocumentIdList({ userId, saleDocumentTypeIds: idList });
    }

    const onFinish = async () => {
        JSON.stringify(branchData) !== JSON.stringify(oldIdList) && await editApiCall(url.ASSIGN_BRANCH_TO_USER, branchData)

        JSON.stringify(brandData) !== JSON.stringify(oldBrandIdList) && await editBrandApiCall(url.ASSIGN_BRAND_TO_USER, brandData)

        JSON.stringify(customerGroupData) !== JSON.stringify(oldGroupIdList) && await editCustomerGroupApiCall(url.ASSIGN_CUSTOMER_GROUP_TO_USER, customerGroupData)

        JSON.stringify(customerTypeData) !== JSON.stringify(oldTypeIdList) && await editCustomerTypeApiCall(url.ASSIGN_CUSTOMER_TYPE_TO_USER, customerTypeData)

        JSON.stringify(saleChannelData) !== JSON.stringify(oldChannelIdList) && await editSaleChannelApiCall(url.ASSIGN_SALE_CHANNEL_TO_USER, saleChannelData)

        JSON.stringify(saleDocumentTypeData) !== JSON.stringify(oldDocumentIdList) && await editSaleDocumentTypeApiCall(url.ASSIGN_SALE_DOCUMENT_TYPE_TO_USER, saleDocumentTypeData)

        onSuccess()
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
                        {<General userId={userId} onSuccessBranch={onSuccessBranch} oldBranchId={oldBranchId} />}
                    </TabPane>
                    <TabPane forceRender={true} tab=" فروش " key="2">
                        {<Sale
                            userId={userId}
                            onSuccessBrand={onSuccessBrand} oldBrandId={oldBrandId}
                            onSuccessCustomerGroupAccess={onSuccessCustomerGroupAccess} oldGroupId={oldGroupId}
                            onSuccessCustomerTypeAccess={onSuccessCustomerTypeAccess} oldTypeId={oldTypeId}
                            onSuccessSaleChannelAccess={onSuccessSaleChannelAccess} oldChannelId={oldChannelId}
                            onSuccessSaleDocumentTypeAccess={onSuccessSaleDocumentTypeAccess} oldDocumentId={oldDocumentId}
                        />}
                    </TabPane>
                </Ant.Tabs>
                <Ant.Affix offsetBottom={bottom} style={{ position: 'absolute', bottom: 0, left: 30, right: 30 }}>
                    <Ant.Button block
                        className='mt-8 '
                        loading={editLoading}
                        type="primary"
                        onClick={onFinish}
                    >
                        {'ذخیره'}
                    </Ant.Button>
                </Ant.Affix>
            </Ant.Card>
        </>
    )
}

export default FormUsersOtherAccess
