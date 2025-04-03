const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const { 
  login, 
  validateLogin, 
  changePassword, 
  validateChangePassword, 
  signup, 
  validateSignup 
} = require("../controller/Auth");
const { auth } = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const contactController = require("../controller/contact");
const contactTypeController = require("../controller/contactType");
const orderController = require("../controller/order");
const orderEntryController = require("../controller/orderEntry");
const orderSummaryController = require("../controller/ordersummary");


// controller for product...
const { createProduct, getProducts, deleteProduct, getProductsIncludedDeleted, updateProduct, getProduct } = require("../controller/product_controller");
const { createProductValidator, updateProductValidator } = require("../middleware/product_middleware");


// controller for transaction...
const { createTransaction, getTransactionWithProductId, deleteTransaction, updateTransaction, getTransactions, getTransaction } = require("../controller/transaction_controller");
const { createTransactionValidator, updateTransactionValidator } = require("../middleware/transaction_middleware");

// controller for states...
const { createState, getStates, getState, deleteState, updateState, getAllStates } = require("../controller/state_controller");


// controller for county...
const { createCounty, getCounties, getCounty, deleteCounty, getCountiesWithStateId, updateCounty } = require("../controller/county_controller");

// controller for data source
const { createDataSource, getDataSources, deleteDataSource, updateDataSource } = require("../controller/data_source_controller");


// controller for assigned
const { createAssigned, getAssigneds, getAssigned, deleteAssigned, updateAssigned } = require("../controller/assigned_controller");


// contorller for work flow
const { createWorkFlow, getWorkFlows, getWorkFlow, deleteWorkFlow, updateWorkFlow } = require("../controller/work_flow_controller");
const { validateFields, handleValidationErrors } = require("../utils/error_middleware");






// ********************************************************************************************************
//                                      Authentication Routes
// ********************************************************************************************************


router.post("/login", validateLogin, login);
router.post("/change-password", auth, validateChangePassword, changePassword);

// ********************************************************************************************************
//                                      Contact Management Routes
// ********************************************************************************************************


// get all deleted contacts
router.get("/contacts/deleted",auth, contactController.getAllDeletedContacts);
// Get all contacts
router.get("/contacts",auth,contactController.getAllContacts);
// create contact
router.post("/contacts",auth, contactController.createContact);
// get a single contact
router.get("/contacts/:id", auth, contactController.getContactById);
// Update a contact
router.patch("/contacts/:id",auth, contactController.updateContact);
// Soft delete a contact
router.delete("/contacts/:id",auth, contactController.deleteContact);


// ********************************************************************************************************
//                                      Contact Type Management Routes
// ********************************************************************************************************

// get all Contact Types
router.get("/contact-types",auth, contactTypeController.getAllContactTypes);
// create a contact Type
router.post("/contact-types", auth, contactTypeController.createContactType);
// soft delete a contact Type
router.delete("/contact-types/:id", auth, contactTypeController.deleteContactType);
// Update a contact Type
router.patch("/contact-types/:id", auth, contactTypeController.restoreContactType);
// get a single contact Type
router.get("/contact-types/:id",auth, contactTypeController.getContactTypeById);

// ********************************************************************************************************
//                                      Order Management Routes
// ********************************************************************************************************

// get all orders
router.get("/orders",auth, orderController.getAllOrders);
// create an order
router.post("/orders", auth, orderController.createOrder);
// get all soft deleted orders
router.get("/orders/deleted",auth, orderController.getAllDeletedOrders);
// get all completed orders
router.get("/orders/completed",auth, orderController.getAllCompletedOrders);
// get a single order by Id
router.get("/orders/:id",auth, orderController.getOrderById);
// update an order
router.patch("/orders/:id",auth, orderController.updateOrder);
// delete an order
router.delete("/orders/:id",auth, orderController.deleteOrder);

// ********************************************************************************************************
//                                      Order Entry Management Routes
// ********************************************************************************************************
router.post("/order-entries", auth, orderEntryController.createOrderEntry); 
router.get("/order-entries",  auth, orderEntryController.getAllOrderEntries);
router.get("/order-entries/:id", auth, orderEntryController.getOrderEntryById); 
router.patch("/order-entries/:id", auth, orderEntryController.updateOrderEntry); 
router.delete("/order-entries/:id", auth, orderEntryController.deleteOrderEntry); 

// ********************************************************************************************************
//                                      Order Summary Management Routes
// ********************************************************************************************************

router.get("/order-summaries", orderSummaryController.getAllOrderSummaries);
router.get("/order-summaries/:orderNumber", orderSummaryController.getOrderSummaryByOrderNumber);
// router.get("/order-summaries/:orderNumber/status", orderSummaryController.getOrderSummariesByOrderNumberAndStatus);
// router.get("/order-summaries/date-range", orderSummaryController.getOrderSummariesByDateRange);
router.get("/order-summaries/:orderNumber/order-status", orderSummaryController.getOrderStatusByOrderNumber);




// ********************************************************************************************************
//                                      Products Management Routes
// ********************************************************************************************************


router.post("/products", [auth, createProductValidator], createProduct)
router.get("/products", auth, getProducts)
router.get("/products/deleted", auth,  getProductsIncludedDeleted)
router.get("/products/:id", auth,  getProduct)
router.delete("/products/:id", auth, deleteProduct)
router.patch("/products/:id", [ auth, updateProductValidator], updateProduct)




// ********************************************************************************************************
//                                      Transactions Management Routes
// ********************************************************************************************************


router.post("/transactions", [ auth,  createTransactionValidator], createTransaction);
router.get("/transactions/",  auth,  getTransactions);
router.get("/transactions/:id",  auth,  getTransactionWithProductId);
router.get("/transactions/single/:id", auth,  getTransaction);
router.delete("/transactions/:id",  auth,  deleteTransaction);
router.patch("/transactions/:id",[ auth, updateTransactionValidator], updateTransaction);





// ********************************************************************************************************
//                                      States Management Routes
// ********************************************************************************************************




router.post("/states", auth,  validateFields(["state_name"]), handleValidationErrors, createState);
router.get("/states",  auth,  getStates);
router.get("/states/all",  auth,  getAllStates);
router.get("/states/:id", auth,  getState);
router.delete("/states/:id",  auth,  deleteState);
router.patch("/states/:id", auth,   validateFields(["state_name"]), handleValidationErrors, updateState);




// ********************************************************************************************************
//                                      County Management Routes
// ********************************************************************************************************


router.post("/counties",  auth,   validateFields(["county_name", "state_name", "stateId"]), handleValidationErrors, createCounty);
router.get("/counties",    getCounties);
router.get("/counties/single/:id",  auth,  getCounty);
router.delete("/counties/:id",  auth,  deleteCounty);
router.patch("/counties/:id",  auth,   validateFields(["county_name"]), handleValidationErrors, updateCounty);
router.get("/counties/states/:id",  auth,  getCountiesWithStateId);




// ********************************************************************************************************
//                                      Data Source Management Routes
// ********************************************************************************************************


router.post("/datasource", auth,   validateFields(["source_name"]), handleValidationErrors, createDataSource);
router.get("/datasource",  auth,  getDataSources);
router.delete("/datasource/:id",  auth,  deleteDataSource);
router.patch("/datasource/:id", auth,   validateFields(["source_name"]), handleValidationErrors, updateDataSource);




// ********************************************************************************************************
//                                      Assigned When Management Routes
// ********************************************************************************************************

router.post("/assigned", auth,   validateFields(["assigned_name"]), handleValidationErrors, createAssigned);
router.get("/assigned",  auth, getAssigneds);
router.get("/assigned/:id", auth,  getAssigned);
router.delete("/assigned/:id", auth,  deleteAssigned);
router.patch("/assigned/:id", auth,   validateFields(["assigned_name"]), handleValidationErrors, updateAssigned);



// ********************************************************************************************************
//                                      Work Flow Management Routes
// ********************************************************************************************************


router.post("/workflows",  auth,   validateFields(["work_name"]), handleValidationErrors, createWorkFlow);
router.get("/workflows",  auth,  getWorkFlows);
router.get("/workflows/:id",  auth,  getWorkFlow);
router.delete("/workflows/:id", auth,   deleteWorkFlow);
router.patch("/workflows/:id", auth,  validateFields(["work_name"]), handleValidationErrors,  updateWorkFlow);






module.exports = router; 
