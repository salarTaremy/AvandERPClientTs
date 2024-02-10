import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
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
  const { id } = props;
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
    await listApiCall(url.ACCOUNT);
  };
  const onFilterChanged = async (filterObject) => {
    setFilterObject(filterObject);
    setOpenFilter(false);
  };
  const onRemoveFilter = () => {
    setFilterObject(null);
    setOpenFilter(false);
  };
  //====================================================================
  //                        Child Components
  //====================================================================
  const btnTypes = 'text'
  const iconSize = 'large'
  const iconColor = 'text-blue-600'

  const VerticalButtons = () => {
    return (
      <>
        <div style={{ minHeight: 50 }}></div>
        <Ant.Space direction="vertical" size={[0, 4]} align="center">

          <Ant.Tooltip title='گروه'>
            <Ant.Space size={[0, 0]} direction="vertical" align="center" >
              <Ant.Button type={btnTypes} className={iconColor} icon={<IconBs.BsFillJournalBookmarkFill size={iconSize} />} />
              <Ant.Typography.Text className={iconColor}>{'گروه'}</Ant.Typography.Text>
            </Ant.Space>
          </Ant.Tooltip>

          <Ant.Tooltip title='کل'>
            <Ant.Space size={[0, 0]} direction="vertical" align="center" >
              <Ant.Button type={btnTypes} className={iconColor} icon={<IconBs.BsJournalCheck size={iconSize} />} />
              <Ant.Typography.Text className={iconColor}>{'کل'}</Ant.Typography.Text>
            </Ant.Space>
          </Ant.Tooltip>

          <Ant.Tooltip title='معین'>
            <Ant.Space size={[0, 0]} direction="vertical" align="center" >
              <Ant.Button type={btnTypes} className={iconColor} icon={<IconBs.BsBook size={iconSize} />} />
              <Ant.Typography.Text className={iconColor}>{'معین'}</Ant.Typography.Text>
            </Ant.Space>
          </Ant.Tooltip>

          <Ant.Tooltip title='سطح چهار'>
            <Ant.Space size={[0, 0]} direction="vertical" align="center" >
              <Ant.Button type={btnTypes} className={iconColor} icon={<IconBs.BsJournalCode size={iconSize} />} />
              <Ant.Typography.Text className={iconColor}>{'سطح چهار'}</Ant.Typography.Text>
            </Ant.Space>
          </Ant.Tooltip>

          <Ant.Tooltip title='سطح پنج'>
            <Ant.Space size={[0, 0]} direction="vertical" align="center" >
              <Ant.Button type={btnTypes} className={iconColor} icon={<IconBs.BsJournalCode size={iconSize} />} />
              <Ant.Typography.Text className={iconColor}>{'سطح پنج'}</Ant.Typography.Text>
            </Ant.Space>
          </Ant.Tooltip>

          <Ant.Tooltip title='سطح شش'>
            <Ant.Space size={[0, 0]} direction="vertical" align="center" >
              <Ant.Button type={btnTypes} className={iconColor} icon={<IconBs.BsJournalCode size={iconSize} />} />
              <Ant.Typography.Text className={iconColor}>{'سطح شش'}</Ant.Typography.Text>
            </Ant.Space>
          </Ant.Tooltip>

        </Ant.Space>
      </>
    )
  }
  const HorizontalButtons = () => {
    return (
      <>
        <Ant.Space size={[32, 0]}>

          <Ant.Tooltip title='گروه'>
            <Ant.Space size={[0, 0]} direction="vertical" align="center" >
              <Ant.Button type={btnTypes} className={iconColor} icon={<IconBs.BsFillJournalBookmarkFill size={iconSize} />} />
              <Ant.Typography.Text className={iconColor}>{'گروه'}</Ant.Typography.Text>
            </Ant.Space>
          </Ant.Tooltip>

          <Ant.Tooltip title='کل'>
            <Ant.Space size={[0, 0]} direction="vertical" align="center" >
              <Ant.Button type={btnTypes} className={iconColor} icon={<IconBs.BsJournalCheck size={iconSize} />} />
              <Ant.Typography.Text className={iconColor}>{'کل'}</Ant.Typography.Text>
            </Ant.Space>
          </Ant.Tooltip>

          <Ant.Tooltip title='معین'>
            <Ant.Space size={[0, 0]} direction="vertical" align="center" >
              <Ant.Button type={btnTypes} className={iconColor} icon={<IconBs.BsBook size={iconSize} />} />
              <Ant.Typography.Text className={iconColor}>{'معین'}</Ant.Typography.Text>
            </Ant.Space>
          </Ant.Tooltip>

          <Ant.Tooltip title='سطح چهار'>
            <Ant.Space size={[0, 0]} direction="vertical" align="center" >
              <Ant.Button type={btnTypes} className={iconColor} icon={<IconBs.BsJournalCode size={iconSize} />} />
              <Ant.Typography.Text className={iconColor}>{'سطح چهار'}</Ant.Typography.Text>
            </Ant.Space>
          </Ant.Tooltip>

          <Ant.Tooltip title='سطح پنج'>
            <Ant.Space size={[0, 0]} direction="vertical" align="center" >
              <Ant.Button type={btnTypes} className={iconColor} icon={<IconBs.BsJournalCode size={iconSize} />} />
              <Ant.Typography.Text className={iconColor}>{'سطح پنج'}</Ant.Typography.Text>
            </Ant.Space>
          </Ant.Tooltip>

          <Ant.Tooltip title='سطح شش'>
            <Ant.Space size={[0, 0]} direction="vertical" align="center" >
              <Ant.Button type={btnTypes} className={iconColor} icon={<IconBs.BsJournalCode size={iconSize} />} />
              <Ant.Typography.Text className={iconColor}>{'سطح شش'}</Ant.Typography.Text>
            </Ant.Space>
          </Ant.Tooltip>

          {/* <Ant.Button type={btnTypes} className={iconColor} icon={<IconBs.BsFillJournalBookmarkFill size={iconSize} />} />
          <Ant.Button type={btnTypes} className={iconColor} icon={<IconBs.BsJournalCheck size={iconSize} />} />
          <Ant.Button type={btnTypes} className={iconColor} icon={<IconBs.BsBook size={iconSize} />} />
          <Ant.Button type={btnTypes} className={iconColor} icon={<IconBs.BsJournalCode size={iconSize} />} />
          <Ant.Button type={btnTypes} className={iconColor} icon={<IconBs.BsJournalCode size={iconSize} />} />
          <Ant.Button type={btnTypes} className={iconColor} icon={<IconBs.BsJournalCode size={iconSize} />} /> */}
        </Ant.Space>
      </>
    )
  }
  const Grid = () => {
    return (
      <>
        <Ant.Table
          title={HorizontalButtons}
          size='small'
          rowKey='id'
          bordered={true}
          scroll={{ x: '100%', y: '42vh' }}
          columns={columns()}
          // title={title}
          dataSource={(listData?.isSuccess && listData?.data) || null}
        />
      </>
    );
  };
  //====================================================================
  //                        Component
  //====================================================================
  return (
    <Ant.Card Card title={pageTitle} type="inner">
      <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} loading={false}  >
        <Ant.Flex vertical gap='middle'>


          <ButtonList
            filterCount={filterCount}
            onAdd={() => {
              alert("Add Click");
            }}
            onFilter={() => {
              setOpenFilter(true);
            }}
          />
          {/* <Ant.Divider /> */}
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
          <Ant.Flex align="" justify="" gap='middle' >
            <Ant.Flex align="center" justify="" vertical gap='middle'>
              <Ant.Card>
                <VerticalButtons />
              </Ant.Card>
            </Ant.Flex>

            <FilterBedge filterCount={filterCount}>
              <Grid />
            </FilterBedge>
          </Ant.Flex>




        </Ant.Flex>
      </Ant.Card>
    </Ant.Card>
  );
};
export default HybridBrowsing;
