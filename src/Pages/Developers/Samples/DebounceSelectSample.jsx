import React, { useState } from "react";
import * as Ant from 'antd'
import * as url from '@/api/url'
import { Get } from "@/api";
import DebounceSelect from '@/components/common/DebounceSelect'
import qs from "qs";

const DebounceSelectSample = () => {
  const [form] = Ant.Form.useForm();
  const [value, setValue] = useState([]);

  const onFinish = async (values) => {
    console.log('Finished');
  }

  const getAllCounterPartyForDropDown = async (inputValue) => {
    const queryString = qs.stringify({
      CounterpartyName: inputValue
    })

    const response = await Get(`${url.COUNTER_PARTY_GET_FOR_DROPDOWN}?${queryString}`, '');
    if (response?.data) {
      return response?.data.map((item) => ({
        label: `${item.counterpartyName} `,
        value: item.id,
      }))
    }
  }

  return (
    <Ant.Card>
      <Ant.Form form={form} onFinish={onFinish} layout="vertical">
        <Ant.Row>
          <Ant.Col span={24}>
            {'نمونه select با امکان جستجوی سمت سرور'}
            <Ant.Divider />
          </Ant.Col>
        </Ant.Row>
        <Ant.Form.Item name="counterpartyName" label={"نام طرف حساب "} rules={[{ required: true }]}>
          <DebounceSelect
            mode="multiple"
            maxCount={1}
            placeholder="انتخاب کنید..."
            fetchOptions={getAllCounterPartyForDropDown}
            value={value}
          />
        </Ant.Form.Item>
      </Ant.Form>
    </Ant.Card>
  )
}

export default DebounceSelectSample;
