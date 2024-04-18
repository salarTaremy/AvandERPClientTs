import React, { useState, useEffect } from "react";
import * as Ant from "antd";
import {
  DeleteOutlined,
  NodeIndexOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ButtonList from "@/components/common/ButtonList";
import PropTypes from "prop-types";
const Contacts = (props) => {
  const { form } = props;
  // const [form] = Ant.Form.useForm();
  const [contacts, setContactses] = useState([
    { phoneNumber: "", isMainPhoneNumber: false },
  ]);

  const handleAdd = () => {
    console.log(contacts.length, "contacts.length");
    // const newId = contacts.length + 1;
    setContactses([...contacts, { phoneNumber: "", isMainPhoneNumber: false }]);
  };
  const handleDelete = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    // setContactses(contacts.filter((_, i) => i !== index));
    setContactses(newContacts);
  };

  const handleChangeTelephone = (value, index) => {
    const updatedTelephones = [...contacts];
    updatedTelephones[index].phoneNumber = value;
    setContactses(updatedTelephones);
  };

  const handleChangeIsMain = (checked, index) => {
    const updatedTelephones = [...contacts];
    updatedTelephones[index].isMainPhoneNumber = checked;
    console.log(updatedTelephones, "updatedTelephones");
    setContactses(updatedTelephones);

    const updatedValues = {};
    updatedValues[`isMainPhoneNumber-${index}`] = checked;
    form.setFieldsValue(updatedValues);
  };
  const onFormSubmit = async (values) => {
    console.log(values, "valuesvalues");

    //  form.validateFields()
    try {
      await form.validateFields(); // This will trigger validation for all fields
      // If validation passes, you can proceed with form submission
      console.log("Form values:", values);
    } catch (error) {
      // If validation fails, you can handle errors here
      console.error("Form validation failed:", error);
    }
  };

  return (
    <>
      <ButtonList onAdd={handleAdd} />
      {contacts.map((contact, index) => (
        <Ant.Form key={NodeIndexOutlined} onFinish={onFormSubmit} form={form}>
          <Ant.Row gutter={[16, 16]}>
            <Ant.Col lg={8} md={24} sm={24} xs={24}>
              <Ant.Form.Item
                rules={[{ required: true }]}
                key={index}
                name={`phoneNumber-${index}`}
                label="شماره تماس"
              >
                {/* {telephone.isMainPhoneNumber ? "(اصلی)" : ""} */}
                <Ant.Input
                  value={contact.numphoneNumberber}
                  onChange={(e) => handleChangeTelephone(e.target.value, index)}
                  className="mx-2"
                />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={2} md={24} sm={24} xs={24}></Ant.Col>
            <Ant.Col lg={12} md={24} sm={24} xs={24}>
              <Ant.Form.Item
                key={index}
                label={"شماره تماس اصلی"}
                rules={[{ required: true }]}
              >
                <Ant.Switch
                  checked={contact.isMainPhoneNumber}
                  onChange={(checked) => handleChangeIsMain(checked, index)}
                  className="mx-2"
                />
                <Ant.Button
                  className="text-red-600"
                  type="text"
                  onClick={() => handleDelete(index)}
                  icon={<DeleteOutlined />}
                />
              </Ant.Form.Item>
            </Ant.Col>
          </Ant.Row>
        </Ant.Form>
      ))}
    </>
  );
};
export default Contacts;
Contacts.propTypes = {
  form: PropTypes.any,
};
