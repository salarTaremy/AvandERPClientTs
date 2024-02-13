import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import qs from "qs";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as styles from "@/styles";
import * as defaultValues from "@/defaultValues";
import * as api from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import useAllLoading from "@/hooks/useAllLoading ";
import { columns } from "./columns";
import ButtonList from "@/components/common/ButtonList";
import FilterPanel from "./FilterPanel";
import FilterBedge from "@/components/common/FilterBedge";
import FilterDrawer from "@/components/common/FilterDrawer";
import * as IconBs from "react-icons/bs";
//====================================================================
//                        Declaration
//====================================================================
const HybridBrowsing = (props) => {
  const [selectedRow, setSelectedRow] = useState();
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRow(selectedRows[0]);
    },
  };
  const [horizontalLevel, setHorizontalLevel] = useState(1);
  const [verticalLevel, setVerticalLevel] = useState(null);
  const pageTitle = "مرور ترکیبی حسابها";
  const [listData, listLoading, listError, listApiCall] =
    api.useFetchWithHandler();
  const [openFilter, setOpenFilter] = useState(false);
  const [filterObject, setFilterObject] = useState();
  const [filterCount, setFilterCount] = useState(0);
  useRequestManager({ error: listError });
  //====================================================================
  //                        useEffects
  //====================================================================
  useEffect(() => {
    setSelectedRow(null);
    setVerticalLevel(null);
    fillGrid();
  }, [horizontalLevel]);

  useEffect(() => {
    selectedRow?.accId && alert(JSON.stringify({id:selectedRow?.accId , horizontalLevel ,verticalLevel}))

  }, [verticalLevel]);

  useEffect(() => {
    filterObject &&
      setFilterCount(
        Object.keys(filterObject)?.filter((key) => filterObject[key])?.length,
      );
    !filterObject && setFilterCount(0);
    fillGrid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterObject]);
  //====================================================================
  //                        Functions
  //====================================================================
  const fillGrid = async () => {
    const queryString = qs.stringify({
      ...filterObject,
      accountLevel: horizontalLevel || 1,
    });
    await listApiCall(
      `${url.ACCOUNTING_REPORT_HYBRID_BROWSING}?${queryString}`,
    );
  };
  const onFilterChanged = async (filterObject) => {
    setFilterObject(filterObject);
    setOpenFilter(false);
  };
  const onRemoveFilter = () => {
    setFilterObject(null);
    setOpenFilter(false);
  };
  const onHLevel1Click = () => {
    setHorizontalLevel(1);
  };
  const onHLevel2Click = () => {
    setHorizontalLevel(2);
  };
  const onHLevel3Click = () => {
    setHorizontalLevel(3);
  };
  const onHLevel4Click = () => {
    setHorizontalLevel(4);
  };
  const onHLevel5Click = () => {
    setHorizontalLevel(5);
  };
  const onHLevel6Click = () => {
    setHorizontalLevel(6);
  };
  const onVLevel1Click = () => {
    setVerticalLevel(1);
  };
  const onVLevel2Click = () => {
    setVerticalLevel(2);
  };
  const onVLevel3Click = () => {
    setVerticalLevel(3);
  };
  const onVLevel4Click = () => {
    setVerticalLevel(4);
  };
  const onVLevel5Click = () => {
    setVerticalLevel(5);
  };
  const onVLevel6Click = () => {
    setVerticalLevel(6);
  };
  //====================================================================
  //                        Child Components
  //====================================================================
  const btnTypes = "text";
  const iconSize = "large";
  const iconColor = "text-blue-600";
  const VerticalButtons = () => {
    return (
      <>
        <Ant.Space direction="vertical" size={[0, 4]} align="center">
          <div style={{ minHeight: 50 }}></div>
          <Ant.Tooltip title="گروه">
            <Ant.Space size={[0, 0]} direction="vertical" align="center">
              <Ant.Button
                onClick={onVLevel1Click}
                disabled={
                  verticalLevel == 1 ||
                  horizontalLevel == 1 ||
                  !horizontalLevel ||
                  !selectedRow
                }
                type={btnTypes}
                className={iconColor}
                icon={<IconBs.BsFillJournalBookmarkFill size={iconSize} />}
              />
              <Ant.Typography.Text className={iconColor}>
                {"گروه"}
              </Ant.Typography.Text>
            </Ant.Space>
          </Ant.Tooltip>

          <Ant.Tooltip title="کل">
            <Ant.Space size={[0, 0]} direction="vertical" align="center">
              <Ant.Button
                onClick={onVLevel2Click}
                disabled={
                  verticalLevel == 2 ||
                  horizontalLevel == 2 ||
                  !horizontalLevel ||
                  !selectedRow
                }
                type={btnTypes}
                className={iconColor}
                icon={<IconBs.BsJournalCheck size={iconSize} />}
              />
              <Ant.Typography.Text className={iconColor}>
                {"کل"}
              </Ant.Typography.Text>
            </Ant.Space>
          </Ant.Tooltip>

          <Ant.Tooltip title="معین">
            <Ant.Space size={[0, 0]} direction="vertical" align="center">
              <Ant.Button
                onClick={onVLevel3Click}
                disabled={
                  verticalLevel == 3 ||
                  horizontalLevel == 3 ||
                  !horizontalLevel ||
                  !selectedRow
                }
                type={btnTypes}
                className={iconColor}
                icon={<IconBs.BsJournalMedical size={iconSize} />}
              />
              <Ant.Typography.Text className={iconColor}>
                {"معین"}
              </Ant.Typography.Text>
            </Ant.Space>
          </Ant.Tooltip>

          <Ant.Tooltip title="سطح چهار">
            <Ant.Space size={[0, 0]} direction="vertical" align="center">
              <Ant.Button
                onClick={onVLevel4Click}
                disabled={
                  verticalLevel == 4 ||
                  horizontalLevel == 4 ||
                  !horizontalLevel ||
                  !selectedRow
                }
                type={btnTypes}
                className={iconColor}
                icon={<IconBs.BsBook size={iconSize} />}
              />
              <Ant.Typography.Text className={iconColor}>
                {"سطح چهار"}
              </Ant.Typography.Text>
            </Ant.Space>
          </Ant.Tooltip>

          <Ant.Tooltip title="سطح پنج">
            <Ant.Space size={[0, 0]} direction="vertical" align="center">
              <Ant.Button
                onClick={onVLevel5Click}
                disabled={
                  verticalLevel == 5 ||
                  horizontalLevel == 5 ||
                  !horizontalLevel ||
                  !selectedRow
                }
                type={btnTypes}
                className={iconColor}
                icon={<IconBs.BsBook size={iconSize} />}
              />
              <Ant.Typography.Text className={iconColor}>
                {"سطح پنج"}
              </Ant.Typography.Text>
            </Ant.Space>
          </Ant.Tooltip>

          <Ant.Tooltip title="سطح شش">
            <Ant.Space size={[0, 0]} direction="vertical" align="center">
              <Ant.Button
                onClick={onVLevel6Click}
                disabled={
                  verticalLevel == 6 ||
                  horizontalLevel == 6 ||
                  !horizontalLevel ||
                  !selectedRow
                }
                type={btnTypes}
                className={iconColor}
                icon={<IconBs.BsBook size={iconSize} />}
              />
              <Ant.Typography.Text className={iconColor}>
                {"سطح شش"}
              </Ant.Typography.Text>
            </Ant.Space>
          </Ant.Tooltip>
        </Ant.Space>
      </>
    );
  };
  const HorizontalButtons = () => {
    return (
      <>
        <Ant.Space size={[32, 0]}>
          <Ant.Tooltip title="گروه">
            <Ant.Space size={[0, 0]} direction="vertical" align="center">
              <Ant.Button
                onClick={onHLevel1Click}
                disabled={horizontalLevel == 1}
                type={btnTypes}
                className={iconColor}
                icon={<IconBs.BsFillJournalBookmarkFill size={iconSize} />}
              />
              <Ant.Typography.Text className={iconColor}>
                {"گروه"}
              </Ant.Typography.Text>
            </Ant.Space>
          </Ant.Tooltip>

          <Ant.Tooltip title="کل">
            <Ant.Space size={[0, 0]} direction="vertical" align="center">
              <Ant.Button
                onClick={onHLevel2Click}
                disabled={horizontalLevel == 2}
                type={btnTypes}
                className={iconColor}
                icon={<IconBs.BsJournalCheck size={iconSize} />}
              />
              <Ant.Typography.Text className={iconColor}>
                {"کل"}
              </Ant.Typography.Text>
            </Ant.Space>
          </Ant.Tooltip>

          <Ant.Tooltip title="معین">
            <Ant.Space size={[0, 0]} direction="vertical" align="center">
              <Ant.Button
                onClick={onHLevel3Click}
                disabled={horizontalLevel == 3}
                type={btnTypes}
                className={iconColor}
                icon={<IconBs.BsJournalMedical size={iconSize} />}
              />
              <Ant.Typography.Text className={iconColor}>
                {"معین"}
              </Ant.Typography.Text>
            </Ant.Space>
          </Ant.Tooltip>

          <Ant.Tooltip title="سطح چهار">
            <Ant.Space size={[0, 0]} direction="vertical" align="center">
              <Ant.Button
                onClick={onHLevel4Click}
                disabled={horizontalLevel == 4}
                type={btnTypes}
                className={iconColor}
                icon={<IconBs.BsBook size={iconSize} />}
              />
              <Ant.Typography.Text className={iconColor}>
                {"سطح چهار"}
              </Ant.Typography.Text>
            </Ant.Space>
          </Ant.Tooltip>

          <Ant.Tooltip title="سطح پنج">
            <Ant.Space size={[0, 0]} direction="vertical" align="center">
              <Ant.Button
                onClick={onHLevel5Click}
                disabled={horizontalLevel == 5}
                type={btnTypes}
                className={iconColor}
                icon={<IconBs.BsBook size={iconSize} />}
              />
              <Ant.Typography.Text className={iconColor}>
                {"سطح پنج"}
              </Ant.Typography.Text>
            </Ant.Space>
          </Ant.Tooltip>

          <Ant.Tooltip title="سطح شش">
            <Ant.Space size={[0, 0]} direction="vertical" align="center">
              <Ant.Button
                onClick={onHLevel6Click}
                disabled={horizontalLevel == 6}
                type={btnTypes}
                className={iconColor}
                icon={<IconBs.BsBook size={iconSize} />}
              />
              <Ant.Typography.Text className={iconColor}>
                {"سطح شش"}
              </Ant.Typography.Text>
            </Ant.Space>
          </Ant.Tooltip>
        </Ant.Space>
      </>
    );
  };

  //====================================================================
  //                        Component
  //====================================================================
  return (
    <Ant.Card Card title={pageTitle} type="inner">
      <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }}>
        <Ant.Flex vertical gap="middle">
          <Ant.Skeleton loading={false} active>
            <ButtonList
              filterCount={filterCount}
              onRefresh={() => {
                fillGrid();
              }}
              onFilter={() => {
                setOpenFilter(true);
              }}
            />
            {/* <Ant.Divider  /> */}
          </Ant.Skeleton>

          <FilterDrawer
            open={openFilter}
            onClose={() => setOpenFilter(false)}
            onRemoveFilter={onRemoveFilter}
          >
            <FilterPanel
              filterObject={filterObject}
              onSubmit={onFilterChanged}
            />
          </FilterDrawer>
          {/* <pre>{selectedRow?.id}</pre> */}
          <Ant.Skeleton loading={false} active>
            <Ant.Flex align="" justify="center" gap="middle">
              <Ant.Flex align="center" justify="center" vertical gap="middle">
                <Ant.Card>
                  <VerticalButtons />
                </Ant.Card>
              </Ant.Flex>
              <FilterBedge filterCount={filterCount}>
                <Ant.Table
                  loading={listLoading}
                  title={HorizontalButtons}
                  rowSelection={{
                    type: "radio",
                    ...rowSelection,
                  }}
                  size="small"
                  rowKey="accId"
                  selectedRowKeys={["916"]}
                  bordered={true}
                  scroll={{ x: "100%", y: "42vh" }}
                  columns={columns()}
                  // title={title}
                  dataSource={(listData?.isSuccess && listData?.data) || null}
                />
              </FilterBedge>
            </Ant.Flex>
          </Ant.Skeleton>
        </Ant.Flex>
      </Ant.Card>
    </Ant.Card>
  );
};
export default HybridBrowsing;
