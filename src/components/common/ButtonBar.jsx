// import React from 'react'
// import PropTypes from 'prop-types'
// import { Button, Space, Tooltip, Dropdown, Menu, Popconfirm } from 'antd'
// import { AiOutlineFileSearch } from 'react-icons/ai'
// import {
//   FileAddOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   EllipsisOutlined,
//   LikeOutlined,
//   DownloadOutlined,
//   CommentOutlined,
//   StarOutlined,
//   ShareAltOutlined,
//   WarningOutlined,
//   MailOutlined,
//   MobileOutlined,
// } from '@ant-design/icons'

// //Example For Items:
// // const Items = { icon: <MailOutlined />, className: 'text-red-600', onClick: _onClick, children: 'Click Me !' }

// const ButtonBar = (props) => {
//   const { items } = props
//   const { deleteConfirmProps, deleteProps, addProps, editProps, detailProps } = props
//   const { onDeleteConfirmMessage } = props
//   const iconOnly = false
//   const size = iconOnly ? 'large' : ''
//   return (
//     <>
//       <Space wrap>
//         <Tooltip title={iconOnly && 'افزودن ایتم جدید'} size={size}>
//           <Button size={size} icon={<FileAddOutlined />} className="text-success" {...addProps}>
//             {iconOnly || 'ایتم جدید'}
//           </Button>
//         </Tooltip>

//         <Tooltip title={iconOnly && 'ویرایش ایتم مورد نظر'} size={size}>
//           <Button size={size} icon={<EditOutlined />} className="text-sky-600" {...editProps}>
//             {iconOnly || 'ویرایش'}
//           </Button>
//         </Tooltip>

//         <Tooltip title={iconOnly && 'حذف ایتم'} size={size}>
//           <Popconfirm
//             title="حذف"
//             description={onDeleteConfirmMessage || 'آیا برای حذف مطمئن هستید؟'}
//             {...deleteConfirmProps}
//             okText="بلی"
//             cancelText="خیر"
//           >
//             <Button size={size} icon={<DeleteOutlined />} className="text-red-600" {...deleteProps}>
//               {iconOnly || 'حذف'}
//             </Button>
//           </Popconfirm>
//         </Tooltip>

//         <Tooltip title={iconOnly && 'مشاهده جزئیات'} size={size}>
//           <Button
//             size={size}
//             icon={<AiOutlineFileSearch />}
//             className="text-blue-600"
//             {...detailProps}
//           >
//             {iconOnly || 'جزئیات'}
//           </Button>
//         </Tooltip>

//         {items?.map((item, i) => {
//           return (
//             <Button key={i} {...item} size={iconOnly && size}>
//               {iconOnly || item.children}
//             </Button>
//           )
//         })}
//         {props.children}
//         {/* <Dropdown
//           placement="bottomRight"
//           overlay={
//             <Menu
//               items={[
//                 {
//                   key: '1',
//                   label: 'Report',
//                   icon: <WarningOutlined />,
//                 },
//                 {
//                   key: '2',
//                   label: 'Mail',
//                   icon: <MailOutlined />,
//                 },
//                 {
//                   key: '3',
//                   label: 'Mobile',
//                   icon: <MobileOutlined />,
//                 },
//               ]}
//             />
//           }
//           trigger={['click']}
//         >
//           <Button size={size} icon={<EllipsisOutlined />} />
//         </Dropdown> */}
//       </Space>
//     </>
//   )
// }

// ButtonBar.propTypes = {
//   items: PropTypes.arrayOf(Button),
//   children: PropTypes.any,
//   onDeleteConfirmMessage: PropTypes.string,
//   deleteConfirmProps: PropTypes.any,
//   deleteProps: PropTypes.any,
//   addProps: PropTypes.any,
//   editProps: PropTypes.any,
//   detailProps: PropTypes.any,
// }
// export default ButtonBar
