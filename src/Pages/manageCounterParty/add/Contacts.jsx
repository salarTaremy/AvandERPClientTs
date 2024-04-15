import React, { useState } from "react";
import * as Ant from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import ButtonList from "@/components/common/ButtonList";
const Contacts = () => {
  const [form] = Ant.Form.useForm();
  const [contacts, setContactses] = useState([{ id: 1 }]);
  const handleAdd = () => {
console.log(contacts.length,"contacts.length")
    const newId = contacts.length + 1;
    console.log(newId, "ccccccc");
    setContactses([...contacts, { id: newId }]);
  };
  const handleDelete = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContactses(newContacts);
  };
  return (
    <>
      <ButtonList onAdd={handleAdd} />
      {contacts.map((contact, index) => (
        <Ant.Form form={form}>
          <Ant.Row gutter={[16, 16]}>
            <Ant.Col lg={8} md={24} sm={24} xs={24}>
              <Ant.Form.Item
                rules={[{ required: true }]}
                key={index}
                label="شماره تماس"
              >
                {/* {telephone.isMainPhoneNumber ? "(اصلی)" : ""} */}
                <Ant.Input className="mx-2" />
              </Ant.Form.Item>
            </Ant.Col>
            <Ant.Col lg={2} md={24} sm={24} xs={24}></Ant.Col>
            <Ant.Col lg={12} md={24} sm={24} xs={24}>
              <Ant.Form.Item
                label={"شماره تماس اصلی"}
                rules={[{ required: true }]}
              >
                <Ant.Switch className="mx-2" />
                <Ant.Button
                  className="text-red-600"
                  type="text"
                  onClick={() => handleDelete(contact.id)}
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
