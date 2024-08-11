import React, { useEffect, useState } from 'react'
import * as Ant from 'antd'
import PropTypes from 'prop-types'
import * as url from '@/api/url'
import { usePutWithHandler, useFetchWithHandler } from '@/api'
import useRequestManager from '@/hooks/useRequestManager'
import ModalHeader from "@/components/common/ModalHeader";
import { BsFillPinMapFill } from "react-icons/bs";

const FormEditCityDistrict = (props) => {
    const { onSuccess, id } = props
    const [loading, setLoading] = useState(false)
    const [listData, loadingData, error, ApiCall] = useFetchWithHandler();
    const [CityData, CityLoading, CityError, CityApiCall] = useFetchWithHandler();
    const [editData, editLoading, editError, editApiCall] = usePutWithHandler()
    useRequestManager({ error: editError, loading: editLoading, data: editData })
    const [form] = Ant.Form.useForm()
    const [options, setOptions] = useState([]);
    const [selectedCity, setSelectedCity] = useState({ value: null });

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        CityApiCall(url.CITY_TREE);
    }, []);

    useEffect(() => {
        CityData?.isSuccess && setOptions(CityData?.data);
    }, [CityData]);

    useEffect(() => {
        getCityDistrictById()
    }, []);

    useEffect(() => {
        form.resetFields()
        listData?.isSuccess && form.setFieldsValue({ ...(listData?.data || null) })
        const provinceId= listData?.data?.provinceId;
        const cityId = listData?.data?.cityId;
        listData?.isSuccess && form.setFieldValue("cityId", [provinceId, cityId]);
        setSelectedCity([provinceId, cityId])
    }, [listData])
    //=====================================================================
    //                        Functions
    //=====================================================================
    const getCityDistrictById = async () => {
        await ApiCall(`${url.CITY_DISTRICT}/${id}`);
    };

    function onChange(value, selectedOptions) {
        setSelectedCity(value);
        console.log("Onchenge", selectedOptions);
    }

    const filter = (inputValue, path) =>
        path.some(
            (option) =>
                option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
        );

    const onFinish = async (values) => {
        setLoading(true)
        const req = {
            ...values,
            id: id,
            cityId: selectedCity[1]
        }
        await editApiCall(url.CITY_DISTRICT, req)
        console.log('value',req)
        setLoading(false)
        onSuccess()
    }
    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <ModalHeader title={"ویرایش منطقه شهری "} icon={<BsFillPinMapFill />} />
            <Ant.Skeleton active loading={loadingData}>
                <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                    <Ant.Form.Item
                        name={"cityId"}
                        label={"نام استان و شهر"}
                        rules={[{ required: true }]}
                    >
                        <Ant.Cascader
                            loading={CityLoading}
                            options={options}
                            onChange={onChange}
                            placeholder="لطفا انتخاب کنید ..."
                            fieldNames={{ label: "name", value: "id", children: "children" }}
                            showSearch={{
                                filter,
                            }}
                            onSearch={(value) => console.log(value)}
                            value={selectedCity}
                        />
                    </Ant.Form.Item>
                    <Ant.Form.Item name="title" label={' منطقه'} rules={[{ required: true }]}>
                        <Ant.Input allowClear showCount maxLength={8} />
                    </Ant.Form.Item>
                    <Ant.Form.Item name="description" label="توضیحات" rules={[{ required: false }]}>
                        <Ant.Input.TextArea allowClear showCount maxLength={400} rows={4} />
                    </Ant.Form.Item>
                    <Ant.Form.Item>
                        <Ant.Button block
                            type="primary"
                            loading={loading}
                            onClick={() => {
                                form.submit()
                            }}
                        >
                            {'تایید'}
                        </Ant.Button>
                    </Ant.Form.Item>
                </Ant.Form>
            </Ant.Skeleton>
        </>
    )
}

export default FormEditCityDistrict
FormEditCityDistrict.propTypes = {
    onFinish: PropTypes.func,
    onSuccess: PropTypes.func,
    obj: PropTypes.any,
    id: PropTypes.number,
    loading: PropTypes.bool,
}
