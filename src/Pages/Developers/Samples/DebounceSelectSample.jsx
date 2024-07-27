import React, { useState } from "react";
import * as Ant from 'antd'
import * as url from '@/api/url'
import { GetAsync } from "@/api";
import DebounceSelect from '@/components/common/DebounceSelect'
import qs from "qs";

const DebounceSelectSample = () => {
  const [form] = Ant.Form.useForm();
  const [selectedValue, setSelectedValue] = useState({label: "انتخاب نشده", value: 0});

  //====================================================================
  //                        Functions
  //====================================================================
  const getAllCounterPartyForDropDown = async (inputValue) => {
    const queryString = qs.stringify({
      CounterpartyName: inputValue
    })

    const response = await GetAsync(`${url.COUNTER_PARTY_GET_FOR_DROPDOWN}?${queryString}`, '');
    if (response?.data) {
      return response?.data.map((item) => ({
        label: `${item.counterpartyName} `,
        value: item.id,
      }))
    }
  }

  //====================================================================
  //                        Events
  //====================================================================
  const onFinish = async (values) => {
    console.log('Finished');
  }

  const onChange = (newValue) => {
    console.log("onChange");
    if (newValue) {
      setSelectedValue(newValue);
    }
    else {
      setSelectedValue({label: "انتخاب نشده", value: 0});
    }
  }
  const onClear = () => {
    //optional event - raises when selected value cleared
    console.log("onClear");
  }
  const onSelect = () => {
    //optional event - raises when an option selected (useful for multiple selection)
    console.log("onSelect");
  }

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <Ant.Card>
      <Ant.Form form={form} onFinish={onFinish} layout="vertical">
        <Ant.Row>
          <Ant.Col span={24}>
            {'نمونه select با امکان جستجوی سمت سرور'}
            <Ant.Divider />
          </Ant.Col>
        </Ant.Row>
        <Ant.Form.Item label={"مقدار انتخاب شده"}>
            {`عنوان: ${selectedValue?.label} ---- شناسه: ${selectedValue?.value}`}
        </Ant.Form.Item>
        <Ant.Form.Item name="counterpartyName" label={"نام طرف حساب "} rules={[{ required: true }]}>
          <DebounceSelect
            placeholder="انتخاب کنید..."
            fetchOptions={getAllCounterPartyForDropDown}
            onChange={onChange}
            //onClear={onClear}
            //onSelect={onSelect}
          />
        </Ant.Form.Item>
      </Ant.Form>
    </Ant.Card>
  )
}

export default DebounceSelectSample;
