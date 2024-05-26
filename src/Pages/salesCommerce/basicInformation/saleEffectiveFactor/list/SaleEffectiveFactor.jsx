import React, { useState, useEffect } from "react";
import qs from "qs";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as styles from "@/styles";
import * as api from "@/api";
import * as defaultValues from "@/defaultValues";
import { columns } from "./columns";
import ButtonList from "@/components/common/ButtonList";

//====================================================================
//                        Declaration
//====================================================================
const SaleEffectiveFactor = () => {
    const pageTitle = "مدیریت عوامل موثر بر برگه فروش";
    const [listData, listLoading, listError, listApiCall] =
      api.useFetchWithHandler();
    const [dataSource, setDataSource] = useState(null);
    const [modalState, setModalState] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
      fillGrid();
    }, []);

    useEffect(() => {
      setDataSource(listData?.data);
    }, [listData]);

    //====================================================================
    //                        Functions
    //====================================================================
    const fillGrid = async () => {
        await listApiCall(`${url.SALE_EFFECTIVE_FACTOR}`);
    };

    const onDelete = async (id) => {
      //TODO: not implemented
      console.log("onDelete - " + id);
    };

    const onEdit = async (id) => {
      //TODO: not implemented
      console.log("onEdit - " + id);
    };

    const onView = async (id) => {
    //   setModalContent(<SaleDocumentDescription id={id} />);
    //   setModalState(true);
    };

    //====================================================================
    //                        Child Components
    //====================================================================
    const title = () => {
      return (
        <>
          <ButtonList
            onAdd={() => console.log("grid-onAdd")}
            onRefresh={() => fillGrid()}
          />
        </>
      );
    };
    //====================================================================
    const Grid = () => {
      return (
        <>
          <Ant.Skeleton loading={listLoading}>
            <Ant.Table
              columns={columns(onDelete, onEdit, onView)}
              dataSource={dataSource}
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
          open={modalState}
          centered
          {...defaultValues.MODAL_PROPS}
          getContainer={null}
          footer={null}
          onCancel={() => setModalState(false)}
          onOk={() => setModalState(false)}
        >
          {modalContent}
        </Ant.Modal>
        <Ant.Card
          style={{ ...styles.CARD_DEFAULT_STYLES }}
          loading={listLoading}
          title={pageTitle}
          type="inner"
        >
        <Grid />
        </Ant.Card>
      </>
    );
}

export default SaleEffectiveFactor;