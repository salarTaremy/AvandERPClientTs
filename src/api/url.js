//Auth
export const AUTH_LOGIN = '/auth/login'

//Account
export const ACCOUNT = "/account"
export const ACCOUNT_MAX_CODE = "/account/maxCode"
export const ACCOUNT_TREE = "/account/tree"

//AccountDocument
export const ACCOUNT_DOCUMENT = "/AccountingDocument"

//AccountDocumentDetail
export const ACCOUNT_DOCUMENT_DETAIL = "/AccountingDocumentDetail"

//AccountingDocumentType
export const ACCOUNTING_DOCUMENT_TYPE = '/accountingDocumentType'

//AccountingDocumentState
export const ACCOUNT_DOCUMENT_STATE = '/accountingDocumentState'

//AccountHeader
export const ACCOUNT_HEADER = "/accountHeader"
export const ACCOUNT_HEADER_MAX_CODE = "/accountHeader/maxCode"

//AccountGroup
export const ACCOUNT_GROUP = "/accountGroup"
export const ACCOUNT_GROUP_MAX_CODE = "/accountGroup/maxCode"
//AccountType
export const ACCOUNT_TYPE = "/accountType"

//AccountNature
export const ACCOUNT_NATURE = "/accountNature"

//AccountingReport
export const ACCOUNTING_REPORT_HYBRID_BROWSING = "/AccountingReport/HybridBrowsing"

//DetailedAccount
export const DETAILED_ACCOUNT_GROUP = "/detailedAccountGroup"
export const DETAILED_ACCOUNT_GROUP_MAX_CODE = "/detailedAccountGroup/MaxCode"

//DetailedAccount
export const DETAILED_ACCOUNT = "/detailedAccount"
export const DETAILED_ACCOUNT_MAX_CODE = "/detailedAccount/MaxCode"

//DetailedAccountLevel
export const DETAILED_ACCOUNT_LEVEL = "/detailedAccountLevel"




//NavMenu
export const NAV_MENU = '/navMenu'
export const NAV_MENU_UPDATE_POSITION = '/navMenu/UpdatePosition'
export const NAV_MENU_TREE = '/navMenu/GetAllTree'
export const NAV_MENU_TREE_FOR_USER = '/navMenu/GetTreeForUser'

//Product
export const PRODUCT = '/product'

//ProductType
export const PRODUCT_TYPE = '/productType'

//ProductUnit
export const PRODUCT_UNIT = '/productUnit'

//ProductUnitType
export const PRODUCT_UNIT_TYPE = '/productUnitType'

//Supplier
export const SUPPLIER = '/supplier'
export const SUPPLIER_MAX_CODE = "/supplier/maxCode"

//ProductNatureDetail
export const PRODUCT_NATURE = '/productNature'

//ProductNatureDetail
export const PRODUCT_NATURE_DETAIL = '/productNatureDetail'

//Brand
export const BRAND = '/brand'
export const BRAND_MAX_CODE = "/brand/maxCode"

//GanttChart
export const GANTT_CHART = '/GanttChart'

//Branch
export const BRANCH = '/Branch'

//Role
export const ROLE = '/Role'
export const ROLE_UPDATE_ROLE_USER_ASSIGNMENT = 'Role/UpdateRoleUserAssignment'
export const ROLE_GET_USERS_OF_ROLE = 'Role/GetUsersOfRole'
export const ROLE_GET_ACTIONS_RELATED_TO_ROLE = 'Role/GetActionsRelatedToRole'
export const ROLE_GET_NAV_MENU_RELATED_TO_ROLE = 'Role/GetNavMenuRelatedToRole'
export const ROLE_REMOVE_ROLE_AASSIGNMENT_FROM_USER = 'Role/RemoveRoleAassignmentFromUser'

//RoleScope
export const ROLE_SCOPE = '/RoleScope'
export const ROLE_SCOPE_WITH_ROLES = '/RoleScope/GetRoleScopesWithRoles'

//ApplicationController
export const APPLICATION_CONTROLLER = '/ApplicationController'

//GetActions
export const ACTIONS = '/ApplicationController/GetActions'

//LinkAccountDetailedAccountGroup
export const LINK_ACCOUNT_DETAILED_ACCOUNTGROUP = '/linkAccountDetailedAccountGroup'


//UpdateRoleActionAssignment
export const UPDATE_ROLE_ACTION_ASSIGNMENT = 'Role/UpdateRoleActionAssignment'

//UpdateRoleNavMenuAssignment
export const UPDATE_ROLE_NAV_MENU = 'Role/UpdateRoleNavMenuAssignment'

//User
export const USER = '/User'
export const USER_RESET_PASSWORD = 'User/ResetPassword'

//Sales
export const SALE_CHANNEL = 'SaleChannel'
export const SALE_DOCUMENT_HEADER = 'SaleDocumentHeader'
export const SALE_DOCUMENT_DETAIL = 'SaleDocumentDetail'
export const SALE_CUSTOMER_GET_FOR_DROPDOWN = '/Customer/GetForDropdown'

//PaymentType
export const PAYMENT_TYPE = 'PaymentType'

//Currency
export const CURRENCY = 'Currency'

//DeliveryType
export const DELIVERY_TYPE = 'DeliveryType'

//SaleDocumentType
export const SALE_DOCUMENT_TYPE = 'SaleDocumentType'

//SaleType
export const SALETYPE = 'SaleType'

//Counterparty
export const COUNTER_PARTY = 'Counterparty'
export const COUNTER_PARTY_TYPE = 'Counterparty/GetCounterpartyType'
export const COUNTER_PARTY_BLACK_LIST = 'CounterpartyBlackList'
export const COUNTER_PARTY_BLACK_LIST_STATE = 'CounterpartyBlackListState'
export const COUNTER_PARTY_GET_FOR_DROPDOWN = '/Counterparty/GetForDropdown'
export const COUNTER_PARTY_BLACK_LIST_STATE_GET_BY_COUNTER_PARTY_ID = 'CounterpartyBlackList/GetByCounterpartyId'



//Province
export const PROVINCE = '/Province'

//City
export const CITY = '/City'
export const CITY_TREE = '/City/GetTree'


//Bank
export const BANK = '/Bank'

//BankBranch
export const BANKBRANCH = '/BankBranch'
//BankBranchGetForDropdown
export const BANKBRANCH_GetFORDROPDOWN = '/BankBranch/GetForDropdown'
//CustomerGroup
export const CUSTOMER_GROUP = 'CustomerGroup'

// CustomerType
export const CUSTOMER_TYPE = 'CustomerType'

// CustomerGrade
export const CUSTOMER_GRADE = 'CustomerGrade'

// CustomerManagement
export const CUSTOMER = 'Customer'

export const CUSTOMER_FREE_CODE = 'Customer/GetFirstFreeCode'

//GetFirstFreeCode
export const GETFIRST_FREE_CODE = '/Counterparty/GetFirstFreeCode'


//GetFirstFreeCode
export const COUNTER_PARTY_FREE_CODE = '/Counterparty/GetFirstFreeCode'



//AccessControl
export const GET_ASSIGNED_BRANCHES = 'AccessControl/GetAssignedBranches'
export const ASSIGN_BRANCH_TO_USER = 'AccessControl/AssignBranchToUser'
export const REMOVE_ALL_BRANCH_PERMISSIONS_FOR_USER = 'AccessControl/RemoveAllBranchPermissionsForUser'
export const GET_ASSIGNED_BRANDS = 'AccessControl/GetAssignedBrands'
export const ASSIGN_BRAND_TO_USER = 'AccessControl/AssignBrandToUser'
export const GET_ASSIGNED_CUSTOMER_GROUPS = 'AccessControl/GetAssignedCustomerGroups'
export const ASSIGN_CUSTOMER_GROUP_TO_USER = 'AccessControl/AssignCustomerGroupToUser'
export const GET_ASSIGNED_CUSTOMER_TYPES = 'AccessControl/GetAssignedCustomerTypes'
export const ASSIGN_CUSTOMER_TYPE_TO_USER = 'AccessControl/AssignCustomerTypeToUser'
export const GET_ASSIGNED_SALE_CHANNELS = 'AccessControl/GetAssignedSaleChannels'
export const ASSIGN_SALE_CHANNEL_TO_USER = 'AccessControl/AssignSaleChannelToUser'
export const GET_ASSIGNED_SALE_DOCUMENT_TYPES = 'AccessControl/GetAssignedSaleDocumentTypes'
export const ASSIGN_SALE_DOCUMENT_TYPE_TO_USER = 'AccessControl/AssignSaleDocumentTypeToUser'


