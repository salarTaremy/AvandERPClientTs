import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import * as api from "@/api";
import PropTypes from "prop-types";
import Loading from "@/components/common/Loading";

const columns = (props) => {
  const cl = [
    {
      title: "نام عملیات",
      dataIndex: "actionName",
      key: "actionName",
      width: 100,
      render: (text, record) => (
        <>
          <Ant.Checkbox className="mx-2" />
          {text}
        </>
      ),
    },
    {
      title: "عنوان",
      dataIndex: "persianTitle",
      key: "persianTitle",
      width: 100,
    },
  ];
  const { id } = props;
  const [data, loading, error] = api.useFetch(
    url.ACTIONS + "?AppControllerId=" + id.toString(),
  );
  return (
    <>
      {(loading && (
        <Loading
          message="لطفا کمی صبر کنید"
          description={`درحال دانلود اطلاعات  سند شناسه ${id}`}
        />
      )) || (
        <>
          <Ant.Table
            // {...defaultValues.TABLE_PROPS}
            // size= 'small'
            // rowKey= 'id'
            bordered
            columns={cl}
            dataSource={data?.data || null}
          />
          {/* <Ant.Typography>
            <pre>{JSON.stringify(data?.data, null, 2)}</pre>
          </Ant.Typography> */}
        </>
      )}
    </>
  );
};
RoleOperationDetai.propTypes = {
  id: PropTypes.any,
};

export default RoleOperationDetai;