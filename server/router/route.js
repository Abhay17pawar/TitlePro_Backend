const express = require("express");
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


// controller for transaction...
const { createTransaction, getTransactionWithProductId, deleteTransaction, updateTransaction, getTransactions, getTransaction } = require("../controller/transaction_controller");
const { createTransactionValidator, updateTransactionValidator } = require("../middleware/transaction_middleware");

// controller for states...
const { createState, getStates, getState, deleteState, updateState, getAllStates, restoreDeleteState } = require("../controller/state_controller");
const { createStateValidator, updateStateValidator, restoreStateValidator } = require("../middleware/state_middleware");


// controller for county...
const { createCounty, getCounties, getCounty, deleteCounty, getCountiesWithStateId, updateCounty } = require("../controller/county_controller");
const { createCountyValidator, updateCountyValidator } = require("../middleware/county_middleware");
const { createProductValidator, updateProductValidator } = require("../middleware/product_middleware");
const { createDataSource, getDataSources } = require("../controller/data_source_controller");
const { createDataSourceValidator } = require("../middleware/data_source_middleware");






// ********************************************************************************************************
//                                      Authentication Routes
// ********************************************************************************************************
router.post("/signup", validateSignup, signup);
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
router.get("/contacts/:name",auth, contactController.getContactByName);
// Update a contact
router.patch("/contacts/:email",auth, contactController.updateContact);
// Soft delete a contact
router.delete("/contacts/:name",auth, contactController.deleteContact);


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
router.post("/order-entries", orderEntryController.createOrderEntry); 
router.get("/order-entries", orderEntryController.getAllOrderEntries);
router.get("/order-entries/:id", orderEntryController.getOrderEntryById); 
router.put("/order-entries/:id", orderEntryController.updateOrderEntry); 
router.delete("/order-entries/:id", orderEntryController.deleteOrderEntry); 

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

router.post("/products", [createProductValidator], createProduct)
router.get("/products", getProducts)
router.get("/products/deleted", getProductsIncludedDeleted)
router.get("/products/:id", getProduct)
// router.get("/products/search/", getProductWithQuery)
router.delete("/products/:id", deleteProduct)
router.patch("/products/:id", [updateProductValidator], updateProduct)




// ********************************************************************************************************
//                                      Transactions Management Routes
// ********************************************************************************************************


router.post("/transactions", [createTransactionValidator], createTransaction);
router.get("/transactions/", getTransactions);
router.get("/transactions/:id", getTransactionWithProductId);
router.get("/transactions/single/:id", getTransaction);
router.delete("/transactions/:id", deleteTransaction);
router.patch("/transactions/:id",[updateTransactionValidator], updateTransaction);


// router.get("/ping", (req, res) => {
//     res.send({message:"ping check ok without v1 routing.."})
// })


// ********************************************************************************************************
//                                      States Management Routes
// ********************************************************************************************************




router.post("/states", [createStateValidator], createState);
router.get("/states", getStates);
router.get("/states/restore", [restoreStateValidator], restoreDeleteState);
router.get("/states/all", getAllStates);
router.get("/states/:id", getState);
router.delete("/states/:id", deleteState);
router.patch("/states/:id", [updateStateValidator], updateState);




// ********************************************************************************************************
//                                      County Management Routes
// ********************************************************************************************************


router.post("/counties", [createCountyValidator], createCounty);
router.get("/counties", getCounties);
// router.get("/counties/:id", );
router.get("/counties/single/:id", getCounty);
router.delete("/counties/:id", deleteCounty);
router.patch("/counties/:id", [updateCountyValidator], updateCounty);
router.get("/counties/states/:id", getCountiesWithStateId);




// ********************************************************************************************************
//                                      Data Source Management Routes
// ********************************************************************************************************


router.post("/datasource", [createDataSourceValidator], createDataSource);
router.get("/datasource", getDataSources);







module.exports = router; 
