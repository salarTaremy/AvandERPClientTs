

// //Accounting
// import Account from  './Pages/accounting/account/Account'
// import AccountDocument from './Pages/accounting/accountDocument/AccountDocument'
// import FrmAddAccountDocument from './Pages/accounting/accountDocument/add/FrmAddAccountDocument'
// import DocumentTypeList from './Pages/accounting/documentType/list/DocumentTypeList'
// import DetailedAccount from'./Pages/accounting/detailedAccount/DetailedAccount'
// import DetailedAccountGroup from './Pages/accounting/detailedAccountGroup/DetailedAccountGroup'

// //Dashboard
// import Dashboard from './Pages/dashboard/Dashboard'

// //Permissions
// import MenuPermissions from './Pages/permissions/menuPermissions/MenuPermissions'

// //Inventory
// import AddProduct from './Pages/inventory/product/add/AddProduct'
// import SupplierList from './Pages/inventory/supplier/list/SupplierList'
// import BrandList from './Pages/inventory/brand/list/BrandList'

//Developer
// import BlankPage from './Pages/Developers/Samples/BlankPage'
// import DatePickerSample from './Pages/Developers/Samples/DatePickerSample'
// import ListSample from './Pages/Developers/Samples/listSample/ListSample'

import NotFoundPage from './Pages/NotFoundPage'
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import Login from './Pages/login/Login'




const routes = [
    { path: '/', exact: true, name: 'خانه',  element: Home },
     { path: '/dashboard', name: 'داشبورد', element: Dashboard },
     { path: '/login', name: 'ورود به سیستم', element: Login },
    // { path: '/accounting/accounts', name: 'مدیریت حسابها', element: Account },
    // { path: '/accounting/accountDocument', name: 'اسناد حسابداری', element: AccountDocument },
    // { path: '/accounting/detailedAccount', name: 'حساب های تفصیل', element: DetailedAccount },
    // { path: '/accounting/documentType', name: 'انواع سند حسابداری ', element: DocumentTypeList },
    // { path: '/accounting/detailedAccountGroup', name: 'گروه های تفصیل', element: DetailedAccountGroup },
    // { path: '/accounting/accountDocument/New', name: 'سند حسابداری جدید', element: FrmAddAccountDocument },
    // { path: '/inventory/product/add', name: 'تعریف کالا', element: AddProduct, exact: true },
    // { path: '/base/supplier', name: 'تأمین کننده', element: SupplierList },
    // { path: '/base/brand', name: 'برند', element: BrandList},
    // { path: '/permissions/menuPermissions', name: 'پرمیشن ها', element: MenuPermissions },
    // { path: '/developers/samples/blankPage', name: 'صفحه خالی', element: BlankPage },
    // { path: '/developers/samples/datePickerSample', name: 'تایم پیکر', element: DatePickerSample },
    // { path: '/developers/samples/listSample/listSample', name: 'نمونه لیست', element: ListSample },
    // { path: '/test/form', name: 'نمونه لیست', element: TestForm },
    { path: '*', name: 'خطای 404',  element: NotFoundPage },
  ]

export default routes
