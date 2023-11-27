import express from 'express';
import { query } from "../models/dbasync.model.js";
import { query_callBack } from "../models/db.model.js"

const router = express.Router();

const getOrders = async (req, res, next) => {
    const vendorId = req.query.vendorId;
    const start = `${req.query.year}-${req.query.month}-${req.query.date} 00:00:00`;
    const end = `${req.query.year}-${req.query.month}-${req.query.date} 23:59:59`;
    console.log(start);
    console.log(end);
    try {
        const query_str = 'SELECT orders.*, Vendor.Name AS Vendor_Name \
            FROM (SELECT * from`Order` WHERE Vendor_ID = ? \
            AND (`Status` = ? OR `Status` = ? OR `Status` = ? OR `Status` = ?)\
            AND (`Pickup_Time` BETWEEN ? AND ?))\
            AS orders \
            LEFT JOIN Vendor ON orders.Vendor_ID = Vendor.Vendor_ID;'
        const [rows, fields] = await query(query_str, 
                [vendorId, "WAIT_FOR_APPROVAL", "PREPARING", "READY_FOR_PICKUP", "CANCELLED_UNCHECKED", start, end]);
        console.log(rows);
        res.json(rows);
        // console.log("in completed");
        // console.log(res);
    }
    catch (err) {
        throw err;
    }
};


const getOrderMeals = async (req, res, next) => {
    const orderMealIDs = (req.query.orderMealIDs).split(',');
    var queryResults = [];
    console.log("MealIDs = ", orderMealIDs);
    for (let i = 0; i < orderMealIDs.length; i++) {
        try {
            const query_str = 'SELECT Meal_ID, Meal_Name, Price, Image_url FROM `Meal` WHERE `Meal_ID` = ?';
            const [rows, fields] = await query(query_str, [orderMealIDs[i]]);
            queryResults.push(...rows);
        }
        catch (err) {
            throw err;
        }
    }
    res.json(queryResults);
};

const getConfirmOrder = (req, res, net) => {
    console.log("confirm order, orderID = ", req.body.orderID);
    const orderID = req.body.orderID;
        query_callBack('UPDATE `Order` SET `Status` = "PREPARING"\
                        WHERE `Order_ID` = ?', [orderID],
            (err) => {console.log(`Error updating the inventory: ${err}`)}
        );
}

const getFinishOrder = (req, res, net) => {
    console.log("confirm order, orderID = ", req.body.orderID);
    const orderID = req.body.orderID;
        query_callBack('UPDATE `Order` SET `Status` = "READY_FOR_PICKUP"\
                        WHERE `Order_ID` = ?', [orderID],
            (err) => {console.log(`Error updating the inventory: ${err}`)}
        );
}

const getCancelConfirm = (req, res, net) => {
    console.log("confirm order, orderID = ", req.body.orderID);
    const orderID = req.body.orderID;
        query_callBack('UPDATE `Order` SET `Status` = "CANCELLED_CHECKED"\
                        WHERE `Order_ID` = ?', [orderID],
            (err) => {console.log(`Error updating the inventory: ${err}`)}
        );
}

const getPickupConfirm = (req, res, net) => {
    console.log("pickup order, orderID = ", req.body.orderID);
    const orderID = req.body.orderID;
        query_callBack('UPDATE `Order` SET `Status` = "PICKED_UP"\
                        WHERE `Order_ID` = ?', [orderID],
            (err) => {console.log(`Error updating the inventory: ${err}`)}
        );
}

const getCancelOrder = (req, res, net) => {
    console.log("confirm order, orderID = ", req.body.orderID);
    const orderID = req.body.orderID;
        query_callBack('UPDATE `Order` SET `Status` = "CANCELLED_UNCHECKED"\
                        WHERE `Order_ID` = ?', [orderID],
            (err) => {console.log(`Error updating the inventory: ${err}`)}
        );
}

router.get('/', getOrders);
router.get('/orderMeals', getOrderMeals)
router.post('/confirmOrder', getConfirmOrder)
router.post('/finishOrder', getFinishOrder)
router.post('/cancelConfirm', getCancelConfirm)
router.post('/pickupConfirm', getPickupConfirm)
router.post('/cancelOrder', getCancelOrder)



export default router;

