import React, {useState, useEffect} from "react";
import qs from "qs";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as styles from "@/styles";
import * as api from "@/api";
import * as defaultValues from "@/defaultValues";
import * as uuid from "uuid";
import { columns } from "./columns";
import ButtonList from "@/components/common/ButtonList";
import FilterPanel from "./FilterPanel";
import FilterBedge from "@/components/common/FilterBedge";
import FilterDrawer from "@/components/common/FilterDrawer";
import InquiryResult from '../inquiry/InquiryResult';

//====================================================================
//                        Declaration
//====================================================================
const InvoiceList = () => {
    const pageTitle = "مدیریت صورتحساب ها";
    const [invoiceListData, invoiceListLoading, invoiceListError, invoiceListApiCall] =
      api.useFetchWithHandler();
    const [dataSource, setDataSource] = useState(null);
    const [openFilter, setOpenFilter] = useState(false);
    const [filterCount, setFilterCount] = useState(0);
    const [filterObject, setFilterObject] = useState();
    const [pagination, setPagination] = useState({
      current: 1,
      pageSize: 10,
    });
    const [modalOpenState, setModalOpenState] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    //====================================================================
    //                        Functions
    //====================================================================
    const getInvoiceList = async () => {
        // let customerFilter = {};
        // if (filterObject && filterObject.customerId) {
        //   customerFilter.customerId = filterObject.customerId.value;
        // } else {
        //   customerFilter.customerId = undefined;
        // }
        const queryString = qs.stringify({
          ...filterObject,
          //...customerFilter,
          pageNumber: pagination.current,
          pageSize: pagination.pageSize,
        });
        await invoiceListApiCall(`${url.TPS_INVOICE_MANAGEMENT}?${queryString}`);
    };
    
    const onFilterChanged = async (filterObject) => {
        setFilterObject(filterObject);
        setOpenFilter(false);
    };

    const handleTableChange = (pagination, filters, sorter) => {
        setPagination(pagination);
    };

    const onRemoveFilter = () => {
        setFilterObject(null);
        setOpenFilter(false);
    };

    const onInquiry = async (id, fiscalId) => {
        setModalContent(<InquiryResult key={uuid.v1()} saleDocumentHeaderId={id} saleDocumentFiscalId={fiscalId}/>);
        setModalOpenState(true);
    };
    const onViewCustomer = async (id) => {
        //setDocumentDetailModalContent(<CustomerDescription id={id} />);
        //setDocumentDetailModalState(true);
    };

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
      getInvoiceList();
    }, [pagination.current, pagination.pageSize]);

    useEffect(() => {
      setDataSource(invoiceListData?.data);
      setPagination({
        ...pagination,
        total: invoiceListData?.data[0]?.totalCount,
      });
    }, [invoiceListData]);

    useEffect(() => {
      setPagination({ ...pagination, current: 1 });
      filterObject &&
        setFilterCount(
          Object.keys(filterObject)?.filter((key) => filterObject[key])?.length,
        );
      !filterObject && setFilterCount(0);
      getInvoiceList();
    }, [filterObject]);
    //====================================================================
    //                        Child Components
    //====================================================================
    const title = () => {
      return (
        <>
          <ButtonList
            filterCount={filterCount}
            onRefresh={() => getInvoiceList()}
            onFilter={() => setOpenFilter(true)}
          />
        </>
      );
    };
    //====================================================================
    const Grid = () => {
      return (
        <>
          <Ant.Skeleton loading={invoiceListLoading}>
            <Ant.Table
              columns={columns(onInquiry)}
              dataSource={dataSource}
              pagination={pagination}
              onChange={handleTableChange}
              {...defaultValues.TABLE_PROPS}
              title={title}
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
        <Ant.Modal
          open={modalOpenState}
          centered
          {...defaultValues.MODAL_PROPS}
          {...defaultValues.MODAL_EXTRA_LARGE}

          getContainer={null}
          footer={null}
          onCancel={() => setModalOpenState(false)}
          onOk={() => setModalOpenState(false)}
        >
          {modalContent}
        </Ant.Modal>
        <Ant.Card
          style={{ ...styles.CARD_DEFAULT_STYLES }}
          loading={invoiceListLoading}
          title={pageTitle}
          type="inner"
        >
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
        </Ant.Card>
      </>
    );
}

export default InvoiceList;