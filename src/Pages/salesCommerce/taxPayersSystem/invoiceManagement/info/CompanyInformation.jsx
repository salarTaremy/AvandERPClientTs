import React, { useEffect } from "react";
import qs from "qs";
import * as Ant from "antd";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import { useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import { BsInfoCircleFill } from "react-icons/bs";
import ResultAnimation from '@/components/common/ResultAnimation'
import { FiRefreshCw } from "react-icons/fi";

const CompanyInformation = (props) => {
    const { legalEntityIdentity, key } = props;
    const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
    useRequestManager({ error });

    const [form] = Ant.Form.useForm();
    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getCompanyInformation()
    }, []);

    useEffect(() => {
        // form.resetFields()
        listData?.isSuccess && form.setFieldsValue({ ...(listData?.data) })
    }, [listData])
    //====================================================================
    //                        Functions
    //======================================================================
    const getCompanyInformation = async () => {
        const queryString = qs.stringify({
            legalIdentity: legalEntityIdentity
        });
        await ApiCall(`${url.TPS_COMPANY_INFORMATION}?${queryString}`);
    }

    const reload = async (value) => {
        const queryString = qs.stringify({
            legalIdentity: value.nationalId
        });
        await ApiCall(`${url.TPS_COMPANY_INFORMATION}?${queryString}`);
    }

    const items = [
        {
            key: '1',
            // label: 'عنوان شرکت',
            children:
                <>
                    <Ant.Space size={10}>
                        <Ant.Typography.Text strong>{listData?.data?.isExist && listData?.data?.nameTrade || 'برای این شناسه اطلاعاتی ثبت نشده است.'}</Ant.Typography.Text>
                        <Ant.Typography.Text>{listData?.data?.type && `(${listData?.data?.type})`}</Ant.Typography.Text>
                    </Ant.Space>
                </>,
            span: 3
        },
        // {
        //     key: '2',
        //     label: 'نوع',
        //     children: listData?.data?.type,
        //     span: 3
        // },
        {
            key: '3',
            label: 'وضعیت',
            children: listData?.data?.status,
            span: 3
        },
        {
            key: '4',
            label: 'آدرس',
            children: listData?.data?.address,
            span: 3
        },
        {
            key: '5',
            label: 'کدپستی',
            children: listData?.data?.postalCode,
            span: 3
        },
    ]

    const AddonAfter = () => {
        return (
            <Ant.Button
                size="small"
                type="text"
                onClick={() => {
                    form.submit();
                }}
                loading={loadingData}
            >
                <FiRefreshCw />
            </Ant.Button>
        )
    }

    //====================================================================
    //                        Child Components
    //====================================================================

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <ModalHeader title={`اطلاعات شرکت`} icon={<BsInfoCircleFill />} />
            <Ant.Form form={form} key={key} onFinish={reload} layout="horizontal">
                <Ant.Form.Item
                    name="nationalId"
                    label={"شناسه ملی"}
                    rules={[{ required: true, max: 14, min: 10 }]}
                    style={{ width: "100%" }}
                >
                    <Ant.Input addonAfter={<AddonAfter />} />
                </Ant.Form.Item>
            </Ant.Form>
            <Ant.Space >
                <ResultAnimation size={75} state={loadingData && "active" || listData?.data?.isExist === true && "success" || "exception"} />
                <Ant.Skeleton title={false} loading={loadingData}>
                    <Ant.Descriptions items={items} />
                </Ant.Skeleton>
            </Ant.Space>
        </>
    );
}

export default CompanyInformation
CompanyInformation.propTypes = {
    onSuccess: PropTypes.func,
    obj: PropTypes.any,
    legalEntityIdentity: PropTypes.number,
    myKey: PropTypes.number,
};

