//Accounting
import Account from './Pages/accounting/account/Account'
import AccountDocument from './Pages/accounting/accountDocument/AccountDocument'
import FrmEditAccountDocument from './Pages/accounting/accountDocument/edit/FrmEditAccountDocument'
import BalanceSheet from './Pages/accounting/reports/balanceSheet/BalanceSheet.jsx'
import StepReview from './Pages/accounting/reports/stepReview/StepReview'
import HybridBrowsing from './Pages/accounting/reports/hybridBrowsing/HybridBrowsing'
import FrmAddAccountDocument from './Pages/accounting/accountDocument/add/FrmAddAccountDocument'
import DocumentTypeList from './Pages/accounting/documentType/list/DocumentTypeList'
import DetailedAccount from './Pages/accounting/detailedAccount/DetailedAccount'
import DetailedAccountGroup from './Pages/accounting/detailedAccountGroup/DetailedAccountGroup'

//Dashboard
import Dashboard from './Pages/dashboard/Dashboard'

//Permissions
import MenuPermissions from './Pages/permissions/menuPermissions/MenuPermissions'

// //Inventory
import AddProduct from './Pages/inventory/product/add/AddProduct'
import SupplierList from './Pages/inventory/supplier/list/SupplierList'
import BrandList from './Pages/inventory/brand/list/BrandList'
import ProductList from './Pages/inventory/product/list/ProductList'
import EditProductList from './Pages/inventory/product/edit/EditProductList'
import WarehouseManagment from './Pages/inventory/wareHouse/list/WarehouseManagment'


//Developer
import BlankPage from './Pages/Developers/Samples/BlankPage'
import CustomValidator from './Pages/Developers/Samples/CustomValidator'
import DatePickerSample from './Pages/Developers/Samples/DatePickerSample'
import ListSample from './Pages/Developers/Samples/listSample/ListSample'
import DebounceSelectSample from './Pages/Developers/Samples/DebounceSelectSample'
import CitySelector from './Pages/Developers/Samples/CitySelector'
CitySelector

//GeneralSettings
import RoleManagement from './Pages/generalSettings/role/list/RoleManagement'
import BranchList from './Pages/generalSettings/branch/list/BranchList'
import UserManagement from './Pages/generalSettings/user/list/UserManagement'

//salesCommerce
// import SaleChannel from './Pages/salesCommerce/basicInformation/saleChannel/list/saleChannelList'
import SaleChannel from './Pages/salesCommerce/basicInformation/saleChannel/list/SaleChannelList'
import PaymentType from './Pages/salesCommerce/basicInformation/paymentType/list/PaymentTypeList'
import Currency from './Pages/salesCommerce/basicInformation/currency/list/CurrencyList'
import DeliveryType from './Pages/salesCommerce/basicInformation/deliveryType/list/DeliveryTypeList'
import SaleDocumentType from './Pages/salesCommerce/basicInformation/saleDocumentType/list/SaleDocumentTypeList'
import CustomerGroup from './Pages/salesCommerce/basicInformation/customerGroup/list/CustomerGroupList'
import CustomerType from './Pages/salesCommerce/basicInformation/customerType/CustomerType'
import CustomerGrade from './Pages/salesCommerce/basicInformation/customerGrade/list/CustomerGradeList'
import CustomerManagement from './Pages/salesCommerce/basicInformation/CustomerManagement/list/CustomerManagementList'
import FormAddCustomer from './Pages/salesCommerce/basicInformation/CustomerManagement/add/FormAddCustomer'
import FormEditCustomer from './Pages/salesCommerce/basicInformation/CustomerManagement/edit/FormEditCustomer'
import SaleDocument from './Pages/salesCommerce/saleDocument/SaleDocument';
import SaleEffectiveFactor from './Pages/salesCommerce/basicInformation/saleEffectiveFactor/list/SaleEffectiveFactor';
import PriceCircularHeader from './Pages/salesCommerce/priceCircular/priceCircularHeader/list/PriceCircularHeader';
import CityDistrictList from './Pages/salesCommerce/basicInformation/cityDistrict/list/CityDistrictList'
import VisitorManagmentList from './Pages/salesCommerce/basicInformation/visitorManagment/list/VisitorManagmentList'

//counterParty
import CounterParty from './Pages/manageCounterParty/list/CounterPartyList'
//import CounterPartyBlackList from './Pages/manageCounterParty/CounterPartyBlackList/list/counterPartyBlackList'
  import CounterPartyBlackList from './Pages/manageCounterParty/counterPartyBlackList/list/CounterPartyBlackList'
import FormEditCounterParty from './Pages/manageCounterParty/edit/FormEditCounterParty'


//Sale
import SaleType from './Pages/salesCommerce/basicInformation/saleType/list/SaleTypeList'

//Treasury
import banks from './Pages/treasury/treasuryBaseInfo/banks/Banks'

//Other Pagees
import NotFoundPage from './Pages/NotFoundPage'
import Home from './Pages/Home'
import { element } from 'prop-types'


const routes = [
  { path: '/', exact: true, name: 'خانه', element: Home },
  { path: '/dashboard', name: 'داشبورد', element: Dashboard },
  // { path: '/login', name: 'ورود به سیستم', element: Login },
  { path: '/accounting/accounts', name: 'مدیریت حسابها', element: Account },
  { path: '/accounting/accountDocument', name: 'اسناد حسابداری', element: AccountDocument },
  { path: '/accounting/detailedAccount', name: 'حساب های تفصیل', element: DetailedAccount },
  { path: '/accounting/documentType', name: 'انواع سند حسابداری ', element: DocumentTypeList },
  { path: '/accounting/detailedAccountGroup', name: 'گروه های تفصیل', element: DetailedAccountGroup },
  { path: '/accounting/accountDocument/New', name: 'سند حسابداری جدید', element: FrmAddAccountDocument },
  { path: '/accounting/accountDocument/edit/:id', name: 'ویرایش حسابداری ', element: FrmEditAccountDocument },
  { path: '/accounting/reports/balanceSheet', name: 'تراز آزمایشی', element: BalanceSheet },
  { path: '/accounting/reports/stepReview', name: 'مرور پله ای', element: StepReview },
  { path: '/accounting/reports/hybridBrowsing', name: 'مرور ترکیبی', element: HybridBrowsing },
  { path: '/inventory/product/add', name: 'تعریف کالا', element: AddProduct, exact: true },
  { path: '/inventory/product/list', name: 'فهرست کالا', element: ProductList },
  { path: '/inventory/product/edit/:id', name: 'ویرایش کالا', element: EditProductList },
  { path: '/inventory/Warehouse', name: ' مدیریت انبارها', element: WarehouseManagment },
  { path: '/base/supplier', name: 'تأمین کننده', element: SupplierList },
  { path: '/base/brand', name: 'برند', element: BrandList },
  { path: '/permissions/menuPermissions', name: 'پرمیشن ها', element: MenuPermissions },
  { path: '/developers/samples/blankPage', name: 'صفحه خالی', element: BlankPage },
  { path: '/developers/samples/customValidator', name: 'صفحه خالی', element: CustomValidator },
  { path: '/developers/samples/datePickerSample', name: 'تایم پیکر', element: DatePickerSample },
  { path: '/developers/samples/listSample/listSample', name: 'نمونه لیست', element: ListSample },
  { path: '/developers/samples/debounceSelectSample', name: 'نمونه سلکت باکس با امکان جستجوی سمت سرور', element: DebounceSelectSample },
  { path: '/developers/samples/citySelector', name: 'نمونه DropDown درختی', element: CitySelector },
  { path: '/generalSettings/roleManagement', name: 'نمونه لیست', element: RoleManagement },
  { path: '/generalSettings/branch/list', name: 'شعب ', element: BranchList },
  { path: '/generalSettings/user/list', name: 'مدیریت کاربران ', element: UserManagement },

  { path: '/sale/saleChannel', name: 'کانال فروش', element: SaleChannel },
  { path: 'sale/paymentType', name: 'نوع پرداخت', element: PaymentType },
  { path: 'sale/currency', name: 'ارزها', element: Currency },
  { path: 'sale/deliveryType', name: 'ارزها', element: DeliveryType },
  { path: 'sale/documentType', name: 'نوع برگه فروش', element: SaleDocumentType },
  { path: 'sale/type', name: 'نوع  فروش', element: SaleType },
  { path: 'sale/customerGroup', name: 'گروه مشتری', element: CustomerGroup },
  { path: 'sale/customerType', name: 'نوع مشتری', element: CustomerType },
  { path: 'sale/customerGrade', name: 'رتبه مشتری', element: CustomerGrade },
  { path: 'sale/customerManagemen', name: 'مدیریت مشتریان', element: CustomerManagement },
  { path: '/sale/customerManagemen/new', name: 'ایجاد مشتری', element: FormAddCustomer },
  { path: '/sale/customerManagemen/edit/:id', name: 'ویرایش مشتری', element: FormEditCustomer },
  { path: '/sale/saleEffectiveFactor', name: 'مدیریت عوامل موثر بر برگه فروش', element: SaleEffectiveFactor },
  { path: '/sale/priceCircularManagement', name: 'مدیریت بخشنامه قیمت', element: PriceCircularHeader },
  { path: 'sale/cityDistrict', name: 'مناطق شهری', element: CityDistrictList },
  { path: 'sale/visitorManagmen', name: ' مدیریت ویزیتورها', element: VisitorManagmentList },

  { path: 'manage/counterparty', name: 'مدیریت طرف حساب ها', element: CounterParty },
  { path: 'manage/counterparty/edit/:id', name: 'ویرایش طرف حساب ها', element: FormEditCounterParty },
  { path: 'manage/counterparty/list', name: 'لیست سیاه طرف حساب ها', element: CounterPartyBlackList },

  { path: 'treasuryBaseInfo/banks', name: 'بانک ها', element: banks },
  { path: 'sale/saleDocument', name: ' مدیریت صورتحساب ها', element: SaleDocument },

  { path: '*', name: 'خطای 404', element: NotFoundPage },
]

export default routes
