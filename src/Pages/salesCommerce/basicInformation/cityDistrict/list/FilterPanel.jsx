import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import PropTypes from "prop-types";
import { useFetchWithHandler } from "@/api";


const FilterPanel = (props) => {
    const { onSubmit, filterObject } = props;
    const [CityData, CityLoading, CityError, CityApiCall] = useFetchWithHandler();
    const [form] = Ant.Form.useForm();
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
        filterObject && form.setFieldsValue({ ...filterObject });
    }, []);

    //====================================================================
    //                        Functions
    //====================================================================
    function onChange(value, selectedOptions) {
        setSelectedCity(value);
        console.log("Onchenge", selectedOptions);
    }

    const filter = (inputValue, path) =>
        path.some(
            (option) =>
                option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
        );

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
                <Ant.Form.Item
                    name={"cityId"}
                    label={"نام استان و شهر"}
                    rules={[{ required: false }]}
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
                    />
                </Ant.Form.Item>
                <Ant.Form.Item name="title" label={' منطقه'} rules={[{ required: false }]}>
                    <Ant.Input allowClear showCount maxLength={8} />
                </Ant.Form.Item>
                <Ant.Form.Item name="description" label="توضیحات" rules={[{ required: false }]}>
                    <Ant.Input.TextArea allowClear showCount maxLength={400} />
                </Ant.Form.Item>
                <Ant.Form.Item>
                    <Ant.Button
                        type="primary"
                        onClick={() => {
                            form.submit();
                        }}
                        block
                    >
                        {"تایید"}
                    </Ant.Button>
                </Ant.Form.Item>
            </Ant.Form>
        </>
    );
}

export default FilterPanel
FilterPanel.propTypes = {
    onSubmit: PropTypes.func,
    filterObject: PropTypes.any,
};

