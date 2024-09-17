import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { PropTypes } from "prop-types";
import * as url from "@/api/url";
import { useFetch, useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";

const FilterPanel = (props) => {
    const { onSubmit, filterObject } = props;
    const [form] = Ant.Form.useForm();
    const [provinceData, provinceLoading, provinceError] = useFetch(url.PROVINCE)
    useRequestManager({ error: provinceError })
    const [cityData, cityLoading, cityError, cityApiCall] = useFetchWithHandler()
    useRequestManager({ error: cityError })
    const [selectedProvince, setSelectedProvince] = useState(null)
    const commonOptions = {
        showSearch: true,
        filterOption: (input, option) => option.name.indexOf(input) >= 0,
    };
    const handleOnChange = (val, option) => {
        form.setFieldsValue({ cityId: undefined })
        setSelectedProvince(option.id)
    }

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        filterObject && form.setFieldsValue({ ...filterObject });
    }, []);

    useEffect(() => {
        selectedProvince && cityApiCall(`${url.CITY}?provinceId=${selectedProvince}`)
    }, [selectedProvince])

    //====================================================================
    //                        Functions
    //====================================================================
    const onFinish = (values) => {
        onSubmit({
            ...values,
        });
    };

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                <Ant.Form.Item name={'code'} label="کد شعبه" >
                    <Ant.Input allowClear />
                </Ant.Form.Item>
                <Ant.Form.Item name={'name'} label="نام شعبه" >
                    <Ant.Input allowClear />
                </Ant.Form.Item>
                <Ant.Form.Item name={'provinceId'} label="نام استان" >
                    <Ant.Select
                        {...commonOptions}
                        allowClear={true}
                        placeholder={"انتخاب کنید..."}
                        onChange={handleOnChange}
                        disabled={provinceLoading }
                        loading={provinceLoading}
                        options={provinceData?.data}
                        fieldNames={{ label: 'name', value: 'id' }}
                    />
                </Ant.Form.Item>
                <Ant.Form.Item name={'cityId'} label="نام شهر" >
                    <Ant.Select
                        {...commonOptions}
                        allowClear={true}
                        placeholder={"انتخاب کنید..."}
                        disabled={cityLoading }
                        loading={cityLoading}
                        options={cityData?.data}
                        fieldNames={{ label: 'name', value: 'id' }}
                    />
                </Ant.Form.Item>
                <Ant.Button
                    block
                    type="primary"
                    onClick={() => {
                        form.submit()
                    }}
                >
                    {'اعمال'}
                </Ant.Button>
            </Ant.Form>
        </>
    )
}

export default FilterPanel;
FilterPanel.propTypes = {
    onSubmit: PropTypes.func,
    filterObject: PropTypes.any,
};