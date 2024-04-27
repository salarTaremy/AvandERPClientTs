import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as styles from "@/styles";
import MyDatePicker from "@/components/common/MyDatePicker";
import useRequestManager from "@/hooks/useRequestManager";
import * as url from "@/api/url";
import PropTypes from "prop-types";
import { useFetch } from "@/api";
const HeaderAddCounterParty = (props) => {
  const { form } = props;
  const [counterpartyTypeList, counterpartyTypeLoading, counterpartyTypeError] =
    useFetch(url.COUNTER_PARTY_TYPE);
  const [cityList, cityLoading, cityError] = useFetch(url.CITY);
  useRequestManager({ error: cityError });
  const [selectedValueType, setSelectedValueType] = useState("");
  useRequestManager({ error: counterpartyTypeError });
  const commonOptions = {
    showSearch: true,
    filterOption: (input, option) => option.name.indexOf(input) >= 0,
  };
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    form.resetFields();
  }, [form]);
  //====================================================================
  //                        Functions
  //=================================================================


  const handleSelectChange = (value) => {
    setSelectedValueType(value);
  };

  const onChangeAccount = (value, key) => {
    console.log(value, "dadadadadd");
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <div>
      <Ant.Form form={form} layout="vertical" onFinish Failed={null}>
        <Ant.Row gutter={[16, 8]}>
          <Ant.Col lg={8} md={12} sm={12} xs={24}>
            <Ant.Form.Item
              rules={[{ required: true }]}
              name={"counterpartyTypeId"}
              label="نوع"
            >
              <Ant.Select
                onChange={handleSelectChange}
                allowClear={true}
                disabled={counterpartyTypeLoading || false}
                loading={counterpartyTypeLoading}
                options={counterpartyTypeList?.data}
                fieldNames={{ label: "name", value: "id" }}
                placeholder={"انتخاب کنید..."}
              />
            </Ant.Form.Item>
          </Ant.Col>

          <Ant.Col lg={8} md={12} sm={12} xs={24}>
            <Ant.Form.Item
              rules={[{ required: true }]}
              name={"firstName"}
              label="نام"
            >
              <Ant.Input />
            </Ant.Form.Item>
          </Ant.Col>

          <Ant.Col lg={8} md={12} sm={12} xs={24}>
            <Ant.Form.Item
              rules={[{ required: true }]}
              name={"lastName"}
              label="نام خانوادگی"
            >
              <Ant.Input />
            </Ant.Form.Item>
          </Ant.Col>

          <Ant.Col
            className={selectedValueType === 2 ? "hidden" : ""}
            lg={8}
            md={12}
            sm={12}
            xs={24}
          >
            <Ant.Form.Item
              rules={[{ required: false }]}
              name={"fatherName"}
              label="نام پدر"
            >
              <Ant.Input />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col lg={8} md={12} sm={12} xs={24}>
            <Ant.Form.Item
              rules={[{ required: true }]}
              name={"code"}
              label="کد"
            >
              <Ant.Input min={0} style={{ width: "100%" }} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col
            className={selectedValueType === 2 ? "hidden" : ""}
            lg={8}
            md={12}
            sm={12}
            xs={24}
          >
            <Ant.Form.Item name={"nationalCode"} label="کدملی">
              <Ant.InputNumber min={0} style={{ width: "100%" }} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col
            className={selectedValueType === 2 ? "hidden" : ""}
            lg={8}
            md={12}
            sm={12}
            xs={24}
          >
            <Ant.Form.Item
              name={"birthCertificateNumber"}
              label="شماره شناسنامه"
              rules={[{ required: false }]}
            >
              <Ant.Input min={0} style={{ width: "100%" }} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col
            className={selectedValueType === 2 ? "hidden" : ""}
            lg={8}
            md={12}
            sm={12}
            xs={24}
          >
            <Ant.Form.Item name={"birthDateCalendarId"} label="تاریخ تولد">
              <MyDatePicker />
            </Ant.Form.Item>
          </Ant.Col>

          <Ant.Col
            className={selectedValueType === 2 ? "hidden" : ""}
            lg={8}
            md={12}
            sm={12}
            xs={24}
          >
            <Ant.Form.Item
              name={"birthCertificatePlaceOfIssueCityId"}
              label="محل صدور"
              rules={[{ required: false }]}
            >
              <Ant.Select
                {...commonOptions}
                showSearch
                allowClear={true}
                placeholder={"انتخاب کنید..."}
                onChange={(value) => onChangeAccount(value)}
                disabled={cityLoading || false}
                loading={cityLoading}
                options={cityList?.data}
                fieldNames={{ label: "name", value: "id" }}
              />
            </Ant.Form.Item>
          </Ant.Col>


            <Ant.Col
              className={selectedValueType === 2 ? "" : "hidden"}
              lg={8}
              md={12}
              sm={12}
              xs={24}
            >
              <Ant.Form.Item
                name={"companyRegistrationPlaceCityId"}
                label="محل ثبت شرکت/سازمان"
                rules={[{ required: false }]}
              >
                <Ant.Select
                  allowClear={true}
                  placeholder={"انتخاب کنید..."}
                  onChange={(value) => onChangeAccount(value)}
                  disabled={cityLoading || false}
                  loading={cityLoading}
                  options={cityList?.data}
                  fieldNames={{ label: "name", value: "id" }}
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col
              className={selectedValueType === 2 ? "" : "hidden"}
              lg={8}
              md={12}
              sm={12}
              xs={24}
            >
              <Ant.Form.Item name={"companyTitle"} label="عنوان شرکت/سازمان">
                <Ant.Input min={0} style={{ width: "100%" }} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col
              className={selectedValueType === 2 ? "" : "hidden"}
              lg={8}
              md={12}
              sm={12}
              xs={24}
            >
              <Ant.Form.Item
                name={"companyRegistrationNumber"}
                label="شماره ثبت شرکت/سازمان"
                rules={[{ required: false }]}
              >
                <Ant.InputNumber min={0} style={{ width: "100%" }} />
              </Ant.Form.Item>
            </Ant.Col>

            <Ant.Col
              className={selectedValueType === 2 ? "" : "hidden"}
              lg={8}
              md={12}
              sm={12}
              xs={24}
            >
              <Ant.Form.Item
                name={"nationalId"}
                label="شناسه ملی"
                rules={[{ required: false }]}
              >
                <Ant.InputNumber min={0} style={{ width: "100%" }} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col
              className={selectedValueType === 2 ? "" : "hidden"}
              lg={8}
              md={12}
              sm={12}
              xs={24}
            >
              <Ant.Form.Item
                name={"economicCode"}
                label="کداقتصادی"
                rules={[{ required: false }]}
              >
                <Ant.InputNumber min={0} style={{ width: "100%" }} />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col
              className={selectedValueType === 2 ? "" : "hidden"}
              lg={8}
              md={12}
              sm={12}
              xs={24}
            >
              <Ant.Form.Item
                name={"legalEntityIdentity"}
                label="شناسه مالیاتی"
                rules={[{ required: false }]}
              >
                <Ant.InputNumber min={0} style={{ width: "100%" }} />
              </Ant.Form.Item>
            </Ant.Col>

          <Ant.Col lg={8} md={12} sm={12} xs={24}>
            <Ant.Form.Item
              name={"longitude"}
              label="طول جغرافیایی"
              rules={[{ required: false }]}
            >
              <Ant.InputNumber min={0} style={{ width: "100%" }} />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col lg={8} md={12} sm={12} xs={24}>
            <Ant.Form.Item
              name={"latitude"}
              label="عرض جغرافیایی"
              rules={[{ required: false }]}
            >
              <Ant.InputNumber min={0} style={{ width: "100%" }} />
            </Ant.Form.Item>
          </Ant.Col>

          <Ant.Col lg={8} md={12} sm={12} xs={24}>
            <Ant.Form.Item
              name={"email"}
              label="ایمیل"
              rules={[{ required: false }]}
            >
              <Ant.Input />
            </Ant.Form.Item>
          </Ant.Col>
          <Ant.Col lg={8} md={12} sm={12} xs={24}>
            <Ant.Form.Item name="isActive" label="فعال">
              <Ant.Switch defaultChecked={false} />
            </Ant.Form.Item>
          </Ant.Col>
        </Ant.Row>
      </Ant.Form>
    </div>
  );
};
export default HeaderAddCounterParty;
HeaderAddCounterParty.propTypes = {
  form: PropTypes.any,
};
