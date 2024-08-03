import React, { useEffect } from "react";
import qs from "qs";
import * as Ant from "antd";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import { useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ModalHeader from "@/components/common/ModalHeader";
import { BsInfoCircleFill } from "react-icons/bs";
import { IoReload } from "react-icons/io5";
import { CloseOutlined, CheckOutlined, LoadingOutlined } from "@ant-design/icons";

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
                        <Ant.Typography.Text strong>{listData?.data?.nameTrade}</Ant.Typography.Text>
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
            label: 'آدرس',
            children: listData?.data?.address,
            span: 3
        },
        {
            key: '4',
            label: 'کدپستی',
            children: listData?.data?.postalCode,
            span: 3
        },
    ]

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
                <Ant.Space.Compact block>
                    <Ant.Form.Item
                        name="nationalId"
                        label={"شناسه ملی"}
                        rules={[{ required: true , max:14 , min:10 }]}
                        style={{ width: "100%" }}
                    >
                        <Ant.Input />
                    </Ant.Form.Item>
                    {loadingData && <Ant.Button loading />}
                    {!loadingData && <Ant.Button icon={<IoReload />}
                        onClick={() => {
                            form.submit();
                        }} />}
                </Ant.Space.Compact>
            </Ant.Form>
            <Ant.Row >
                <Ant.Col span={6} >
                    {loadingData && <Ant.Skeleton.Node >
                        <LoadingOutlined
                            style={{
                                fontSize: 40,
                                color: '#bfbfbf',
                            }}
                        />
                    </Ant.Skeleton.Node>}
                    {!loadingData && <Ant.Avatar
                        style={{
                            backgroundColor: (listData?.data?.status === true && 'transparent') || "transparent",
                        }}
                        className={
                            (listData?.data?.status === true && "text-green-600 border-green-600 border-4" || "text-red-700 border-red-700 border-4")
                        }
                        icon={(listData?.data?.status === true && <CheckOutlined />) || <CloseOutlined />
                        }
                        shape="square"
                        size={100}
                    />}
                </Ant.Col>
                <Ant.Col span={18} >
                    <Ant.Skeleton title={false} loading={loadingData}>
                        <Ant.Descriptions items={items} />
                    </Ant.Skeleton>
                </Ant.Col>
            </Ant.Row>
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

