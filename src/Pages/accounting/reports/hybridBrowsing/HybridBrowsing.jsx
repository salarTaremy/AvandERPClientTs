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
    await listApiCall(url.DETAILED_ACCOUNT);
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
  const title = () => {
    return (
      <ButtonList
        filterCount={filterCount}
        onAdd={() => {
          alert("Add Click");
        }}
        onFilter={() => {
          setOpenFilter(true);
        }}
      />
    );
  };
  const Grid = () => {
    return (
      <>
        <Ant.Table
          {...defaultValues.TABLE_PROPS}
          columns={columns()}
          title={title}
          dataSource={(listData?.isSuccess && listData?.data) || null}
        />
      </>
    );
  };
  //====================================================================
  //                        Component
  //====================================================================
  const btnTypes = 'link'
  return (
    <Ant.Card Card title={pageTitle} type="inner">
      <Ant.Card style={{ ...styles.CARD_DEFAULT_STYLES }} loading={false}>
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
        <Ant.Row>
          <Ant.Col span={24}>


          </Ant.Col>
        </Ant.Row>
        <Ant.Row>

          <Ant.Flex align="center" justify="center" vertical>
            <Ant.Space direction="vertical" >
              <Ant.Button type={btnTypes}>
                <IconBs.BsAlignStart size={'large'} />
              </Ant.Button>
              <Ant.Button type={btnTypes}>
                <IconBs.Bs0Square size={'large'} />
              </Ant.Button>
              <Ant.Button type={btnTypes}>
                <IconBs.BsFillCreditCard2FrontFill size={'large'} />
              </Ant.Button>
              <Ant.Button type={btnTypes}>
                <IconBs.BsJournalMinus size={'large'} />
              </Ant.Button>
            </Ant.Space>


          </Ant.Flex>

          <Ant.Col span={23}>
          <Ant.Flex  align=""  justify="center" vertical>
              <Ant.Space  >
                <Ant.Button type={btnTypes}>
                  <IconBs.BsAlignStart size={'large'} />
                </Ant.Button>
                <Ant.Button type={btnTypes}>
                  <IconBs.Bs0Square size={'large'} />
                </Ant.Button>
                <Ant.Button type={btnTypes}>
                  <IconBs.BsFillCreditCard2FrontFill size={'large'} />
                </Ant.Button>
                <Ant.Button type={btnTypes}>
                  <IconBs.BsJournalMinus size={'large'} />
                </Ant.Button>
              </Ant.Space>
            </Ant.Flex>

            <FilterBedge filterCount={filterCount}>
              <Grid />
            </FilterBedge>
          </Ant.Col>
        </Ant.Row>
      </Ant.Card>
    </Ant.Card>
  );
};
export default HybridBrowsing;
