import React, { useEffect, useState } from "react";
import * as Ant from "antd";
import * as url from "@/api/url";
import * as defaultValues from "@/defaultValues";
import { useFetchWithHandler, useDelWithHandler } from "@/api";
import useRequestManager from "@/hooks/useRequestManager";
import { RiDeleteBin6Line } from "react-icons/ri";
import qs from "qs";
import ModalHeader from "@/components/common/ModalHeader";
import { FiEdit } from "react-icons/fi";
import ButtonList from "@/components/common/ButtonList";
import FormAddPhoneNumber from "./add/FormAddPhoneNumber";
import * as uuid from "uuid";
import FormEditPhoneNumber from "./edit/FormEditPhoneNumber";


const PhoneNumberList = ({ addressId }) => {
    const [data, loading, error, ApiCall] = useFetchWithHandler();
    useRequestManager({ error: error });
    const [dataSource, setDataSource] = useState(null);
    const [delSaving, delLoading, delError, delApiCall] = useDelWithHandler();
    useRequestManager({ error: delError, data: delSaving, loading: delLoading });
    const [modalState, setModalState] = useState(false);
    const [modalContent, setModalContent] = useState();

    //====================================================================
    //                        useEffects
    //====================================================================
    useEffect(() => {
        getAllPhoneNumber();
    }, []);

    useEffect(() => {
        setDataSource((data?.isSuccess && data?.data) || null);
    }, [data]);

    useEffect(() => {
        getAllPhoneNumber();
    }, [delSaving]);

    //====================================================================
    //                        Functions
    //====================================================================
    const getAllPhoneNumber = async () => {
        const queryString = qs.stringify({ AddressId: addressId });
        await ApiCall(`${url.COUNTERPARTY_PHONE_NUMBER}?${queryString}`);
    };

    const onDelete = async (id) => {
        console.log('id', id)
        await delApiCall(`${url.COUNTERPARTY_PHONE_NUMBER}/${id}`)
    };

    const onSuccessAdd = () => {
        setModalState(false);
        getAllPhoneNumber();
    };

    const onAdd = () => {
        setModalContent(
            <FormAddPhoneNumber
                onSuccess={onSuccessAdd}
                addressId={addressId}
                key={uuid.v1()}
            />,
        );
        setModalState(true);
    };

    const onEdit = (id) => {
        setModalContent(<FormEditPhoneNumber
            onSuccess={onSuccessEdit}
            id={id}
            key={id}
        />);
        setModalState(true);
    };

    const onSuccessEdit = () => {
        setModalState(false);
        setModalContent();
        getAllPhoneNumber();
    };

    //====================================================================
    //                        Child Components
    //====================================================================
    const title = () => {
        return (
            <ButtonList
                onAdd={onAdd}
                onRefresh={() => {
                    getAllPhoneNumber();
                }}
            />
        );
    };

    const cl = (onDelete, onEdit) => {
        return [
            {
                title: "عنوان ",
                dataIndex: "title",
                key: "title",
                width: 150,
            },
            {
                title: "شماره تماس",
                dataIndex: "phoneNumber",
                key: "phoneNumber",
                align: 'center',
                width: 150,
            },
            {
                title: "عملیات",
                dataIndex: "operation",
                key: "operation",
                width: 120,
                align: "center",
                fixed: "right",
                className: "text-xs sm:text-sm",
                render: (text, val) => (
                    <>
                        <Ant.Button
                            className="text-blue-600"
                            onClick={() => onEdit(val.id)}
                            icon={<FiEdit />}
                            type="text"
                        />
                        <Ant.Popconfirm
                            onConfirm={() => onDelete(val.id)}
                            title={` برای حذف شماره تماس  "${val.title}" مطمئن هستید؟`}
                        >
                            <Ant.Button
                                className="text-red-600"
                                icon={<RiDeleteBin6Line />}
                                type="text"
                            />
                        </Ant.Popconfirm>
                    </>
                )
            }
        ]
    }

    //====================================================================
    //                        Component
    //====================================================================
    return (
        <>
            <ModalHeader title={"لیست شماره تماس ها"} />
            <Ant.Modal
                {...defaultValues.MODAL_PROPS}
                open={modalState}
                handleCancel={() => setModalState(false)}
                onCancel={() => {
                    setModalState(false);
                }}
                footer={null}
                centered
            >
                {modalContent}
            </Ant.Modal>
            <Ant.Skeleton loading={loading}>
                <Ant.Table
                    {...defaultValues.TABLE_PROPS}
                    className="mt-5"
                    columns={cl(onDelete, onEdit)}
                    dataSource={dataSource || null}
                    title={title}
                />
            </Ant.Skeleton>
        </>
    )
}

export default PhoneNumberList
