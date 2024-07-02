import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import { usePostWithHandler, useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import PropTypes from "prop-types";
import * as url from "@/api/url";
import ModalHeader from "@/components/common/ModalHeader";
import { BsFillPinMapFill } from "react-icons/bs";

const FormAddCityDistrict = (props) => {
    const { onSuccess } = props;
    const [loading, setLoading] = useState(false);
    const [CityData, CityLoading, CityError, CityApiCall] = useFetchWithHandler();
    const [addData, addLoading, addError, addApiCall] = usePostWithHandler();
    useRequestManager({ error: addError, loading: addLoading, data: addData });
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
        addData?.isSuccess && onSuccess();
    }, [addData]);
    //====================================================================
    //                        Functions
    //====================================================================
    const onFinish = async (values) => {
        setLoading(true);
        const req = {
            ...values,
            cityId: selectedCity[1]
        };
        await addApiCall(url.CITY_DISTRICT, req);
        setLoading(false);
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

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <Ant.Form form={form} onFinish={onFinish} layout="vertical">
                <ModalHeader title={"ایجاد منطقه شهری جدید"} icon={<BsFillPinMapFill />}/>
                <Ant.Form.Item
                    name="cityId"
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
                    />
                </Ant.Form.Item>
                <Ant.Form.Item
                    name="title"
                    label={"منطقه"}
                    rules={[{ required: true }]}
                >
                    <Ant.Input placeholder="منطقه ..." allowClear showCount maxLength={8} />
                </Ant.Form.Item>
                <Ant.Form.Item
                    name="description"
                    label="توضیحات"
                    rules={[{ required: false }]}
                >
                    <Ant.Input.TextArea allowClear showCount maxLength={400} rows={4}/>
                </Ant.Form.Item>
                <Ant.Form.Item>
                    <Ant.Button
                        block
                        type="primary"
                        loading={loading}
                        onClick={() => {
                            form.submit();
                        }}
                    >
                        {"تایید"}
                    </Ant.Button>
                </Ant.Form.Item>
            </Ant.Form>
        </>
    );
};

export default FormAddCityDistrict;
FormAddCityDistrict.propTypes = {
    onSuccess: PropTypes.func,
};
