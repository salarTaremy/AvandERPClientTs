import React from 'react'
import * as Ant from 'antd'
import * as url from '@/api/url'
import * as api from '@/api'
import  {validateNationalCode} from '@/Tools'

const CustomValidator = () => {
  return (
    
    <Ant.Form>
    <Ant.Form.Item
      label="Name"
      name="name"
      rules={[
        {
          required: true,
          message: 'The name is required.',
        },
        {
          validator: (_, value) => {
            if (validateNationalCode(value?.toString())) {
              return Promise.resolve();
            } else {
              return Promise.reject('کد ملی نا معتبر');
            }
          }
        }
      ]}
    >
      <Ant.Input style={{ width: '400px' }} />
    </Ant.Form.Item>
  </Ant.Form>

  )
}

export default CustomValidator