import React, { useState, useEffect, useRef } from "react";
import * as Ant from "antd";
import {
  DeleteOutlined,
  NodeIndexOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ButtonList from "@/components/common/ButtonList";
import PropTypes from "prop-types";
const Contacts = (props) => {
  const { form, sendDataToParent } = props;
  // const [form] = Ant.Form.useForm();
  const [contacts, setContactses] = useState([
    { phoneNumber: "", isMainPhoneNumber: false },
  ]);

  const handleAdd = () => {
    console.log(contacts.length, "contacts.length");
    const newId = contacts.length + 1;
    setContactses([
      ...contacts,
      { id: newId, phoneNumber: "", isMainPhoneNumber: false },
    ]);
  };
  const handleDelete = (id) => {
    // const newContacts = contacts.filter((contact) => contact.id !== id);
    setContactses(contacts.filter((_, i) => i !== id));
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
    // console.log(updatedTelephones, "updatedTelephones");
    setContactses(updatedTelephones);
  };

  const ref = useRef();

  const handleDataList = (event) => {
    console.log(contacts, "kkkk");
    sendDataToParent(contacts);
    // ref.current.submit();
  };

  return (
    <>
      <Ant.Form
        layout="vertical"
        onKeyUp={handleDataList}
        onFinish={null}
        form={form}
      >
        {contacts.map((contact, index) => (
          <Ant.Row gutter={[16, 8]}>
            <Ant.Col lg={8} md={24} sm={24} xs={24}>
              <Ant.Form.Item
                rules={[{ required: true }]}
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
                label={"شماره تماس اصلی"}
                name={"isMainPhoneNumber"}
                rules={[{ required: false }]}
                valuePropName="checked"
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
        ))}
        <ButtonList onAdd={handleAdd} />
      </Ant.Form>
    </>
  );
};
export default Contacts;
Contacts.propTypes = {
  form: PropTypes.any,
  sendDataToParent: PropTypes.any,
};
