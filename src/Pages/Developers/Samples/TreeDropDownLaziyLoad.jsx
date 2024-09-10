// import React, { useEffect, useState } from "react";
// import { PropTypes } from "prop-types";
// import * as Ant from "antd";
// import * as url from "@/api/url";
// import * as styles from "@/styles";
// import * as api from "@/api";
// import useRequestManager from "@/hooks/useRequestManager";
// import useAllLoading from "@/hooks/useAllLoading ";
// //====================================================================
// //                        Declaration
// //====================================================================
// const TreeDropDownLaziyLoad = (props) => {
//   const { id } = props;
//   const [form] = Ant.Form.useForm();
//   const pageTitle = "Tree DropDown Laziy Lode";
//   const [
//     detailedAccGroupData,
//     detailedAccGroupLoading,
//     detailedAccGroupError,
//     detailedAccGroupApiCall,
//   ] = api.useFetchWithHandler();
//   const [
//     detailedAccData,
//     detailedAccLoading,
//     detailedAccError,
//     detailedAccApiCall,
//   ] = api.useFetchWithHandler();
//   const [options, setOptions] = useState([]);
//   const [selectedItem, setSelectedItem] = useState({ value: null });
//   useRequestManager({ error: detailedAccGroupError });

//   useEffect(() => {
//     detailedAccGroupApiCall(url.DETAILED_ACCOUNT_GROUP);
//   }, []);

//   useEffect(() => {
//     detailedAccGroupData?.isSuccess && setOptions(detailedAccGroupData?.data);
//     // detailedAccGroupData?.isSuccess && form.setFieldValue("city", [1, 1001]);
//   }, [detailedAccGroupData]);

//   const loadData = async (selectedOptions) => {
//     debugger;
//     const targetOption = selectedOptions[selectedOptions.length - 1];
//     console.log(targetOption.value, "targetOption.value");
//     if (!targetOption.children) {
//       targetOption.children = [];

//       await detailedAccApiCall(url.DETAILED_ACCOUNT);


//       if (detailedAccData?.data) {
//         detailedAccData.data.forEach((item) => {
//           targetOption.children.push({
//             label: item.name,
//             value: item.detailedAccountGroupId,
//             key: item.id,
//           });
//         });
//         setOptions([...options]);
//       }

//     }
//   };

//   //====================================================================
//   //                        useEffects
//   //====================================================================

//   //====================================================================
//   //                        Functions
//   //====================================================================

//   const getAllAccountDetaiAccount = async () => {
//     await detailedAccApiCall(url.DETAILED_ACCOUNT);
//   };

//   function onChange(value, selectedOptions) {
//     setSelectedItem(value);
//   }
//   const filter = (inputValue, path) =>
//     path.some(
//       (option) =>
//         option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
//     );
//   //====================================================================
//   //                        Child Components
//   //====================================================================
//   const onFinish = async (values) => {
//     alert(JSON.stringify(values, null, 1, 1));
//   };
//   const TreeDropDownLaziyLoad = () => {
//     return (
//       <>
//         <Ant.Form form={form} onFinish={onFinish}>
//           <Ant.Form.Item name={"detailedAccount"} rules={[{ required: true }]}>
//           {/* <Ant.Cascader options={options} loadData={loadData} onChange={onChange} changeOnSelect /> */}
//             <Ant.Cascader
//               changeOnSelect
//               loading={detailedAccGroupLoading}
//               options={options}
//               onChange={onChange}
//               loadData={loadData}
//               placeholder="لطفا انتخاب کنید ..."
//               fieldNames={{ label: "name", value: "id", children: "children" }}
//               showSearch={{
//                 filter,
//               }}
//             />
//           </Ant.Form.Item>
//           <Ant.Button
//             onClick={() => {
//               form.submit();
//             }}
//           >
//             {"پست"}
//           </Ant.Button>
//         </Ant.Form>

//         <Ant.Divider></Ant.Divider>
//         {JSON.stringify(selectedItem, null, 1, 1)}
//       </>
//     );
//   };
//   //====================================================================
//   //                        Component
//   //====================================================================
//   return (
//     <Ant.Card
//       Card
//       title={pageTitle}
//       type="inner"
//       style={{ ...styles.CARD_DEFAULT_STYLES }}
//       loading={false}
//     >
//       <TreeDropDownLaziyLoad />
//     </Ant.Card>
//   );
// };

// export default TreeDropDownLaziyLoad;
// TreeDropDownLaziyLoad.propTypes = {
//   id: PropTypes.any,
// };

