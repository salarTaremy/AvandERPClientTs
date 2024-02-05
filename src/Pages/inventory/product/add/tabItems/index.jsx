import React, { useState } from 'react'
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Tabs,
  Space,
  theme,
  Affix,
  Spin,
  Skeleton,
  Divider,
  QRCode,
  Upload,
  Checkbox,
} from 'antd'
import { TabTechnicalSpecifications } from './TabTechnicalSpecifications'
import { TabFurtherInformation } from './TabFurtherInformation'
import { TabBarcodes } from './TabBarcodes'
import { TabSeasonalReports } from './TabSeasonalReports'

export const tabItems = [
  {
    key: '1',
    label: 'مشخصات فنی',
    children: <TabTechnicalSpecifications />,
  },
  {
    key: '2',
    label: 'اطلاعات تکمیلی',
    children: <TabFurtherInformation />,
  },
  {
    key: '3',
    label: ' بارکد کالا',
    children: <TabBarcodes />,
  },
  {
    key: '4',
    label: 'اطلاعات فصلی(169)',
    forceRender: true,
    children: <TabSeasonalReports />,
  },
]
