import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import { useFetchWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import ButtonList from "@/components/common/ButtonList";
import ModalHeader from "@/components/common/ModalHeader";
import qs from "qs";
import FilterPanel from "./FilterPanel";
import FilterDrawer from "@/components/common/FilterDrawer";
import FilterBedge from "@/components/common/FilterBedge";
import { VscGithubAction } from "react-icons/vsc";
import FormActionPermission from "./permission/FormActionPermission";
import * as uuid from "uuid";
import * as styles from "@/styles";
import CardContent from "@/components/common/CardContent";

const ActionSwitchList = (props) => {
  const { roleId, name, onSuccess } = props;
  const [data, loading, error, ApiCall] = useFetchWithHandler();
  useRequestManager({ error: error });
  const [dataSource, setDataSource] = useState(null);
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [filterObject, setFilterObject] = useState();
  const [filterCount, setFilterCount] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);
  const [pagination, setPagination] = useState({});

  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    filterObject &&
      setFilterCount(
        Object.keys(filterObject)?.filter((key) => filterObject[key])?.length,
      );
    !filterObject && setFilterCount(0);
    getcontroller();
  }, [filterObject]);

  useEffect(() => {
    setDataSource((data?.isSuccess && data?.data) || null);
  }, [data]);

  //====================================================================
  //                        Functions
  //====================================================================
  const getcontroller = async () => {
    const queryString = qs.stringify({
      persianTitle: filterObject?.persianTitle,
    });
    await ApiCall(`${url.APPLICATION_CONTROLLER}?${queryString}`);
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const onFilterChanged = async (filterObject) => {
    setFilterObject(filterObject);
    setOpenFilter(false);
  };
  const onRemoveFilter = () => {
    setFilterObject(null);
    setOpenFilter(false);
  };

  const cl = () => {
    return [
      {
        title: "نام بخش (controller) ",
        dataIndex: "persianTitle",
        key: "persianTitle",
        width: 100,
        className: "text-xs sm:text-sm",
      },
      {
        title: "عنوان انگلیسی",
        dataIndex: "name",
        key: "name",
        width: 100,
        className: "text-xs sm:text-sm",
      },
      {
        title: "دسترسی عملیات",
        dataIndex: "operation",
        key: "operation",
        width: 100,
        align: "center",
        fixed: "right",
        className: "text-xs sm:text-sm",
        render: (text, val) => (
          <>
            <Ant.Button
              className="text-violet-600"
              onClick={() => onPermission(val)}
              icon={<VscGithubAction />}
              type="text"
            />
          </>
        ),
      },
    ];
  };

  const onPermission = (val) => {
    setModalContent(
      <FormActionPermission
        roleId={roleId}
        key={uuid.v1()}
        onSuccess={onSuccessSwitch}
        appControllerId={val.id}
        name={name}
        persianTitle={val.persianTitle}
      />,
    );
    setModalState(true);
  };

  const onSuccessSwitch = () => {
    setModalState(false);
    getcontroller();
    onSuccess();
  };

  //====================================================================
  //                        Child Components
  //====================================================================
  const title = () => {
    return (
      <ButtonList
        filterCount={filterCount}
        onFilter={() => {
          setOpenFilter(true);
        }}
      />
    );
  };

  const Grid = () => {
    return (
      <>
        <Ant.Skeleton loading={loading}>
          <Ant.Table
            {...defaultValues.TABLE_PROPS}
            pagination={pagination}
            title={title}
            columns={cl(onPermission)}
            onChange={handleTableChange}
            dataSource={dataSource || null}
          />
        </Ant.Skeleton>
      </>
    );
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <>
      <ModalHeader title={` ویرایش عملیات نقش" ${name} "`} />
      <Ant.Modal
        open={modalState}
        handleCancel={() => setModalState(false)}
        onCancel={() => {
          setModalState(false);
        }}
        footer={null}
        centered
        {...defaultValues.MODAL_PROPS}
      >
        {modalContent}
      </Ant.Modal>

      <CardContent>
        <FilterDrawer
          open={openFilter}
          onClose={() => setOpenFilter(false)}
          onRemoveFilter={onRemoveFilter}
        >
          <FilterPanel filterObject={filterObject} onSubmit={onFilterChanged} />
        </FilterDrawer>
        <FilterBedge filterCount={filterCount}>
          <Grid />
        </FilterBedge>
      </CardContent>
    </>
  );
};

export default ActionSwitchList;
