import express from 'express';
import { query } from "../models/dbasync.model.js";

const router = express.Router();
const getAllMeals = async (req, res, next) => {
    const vendorId = req.query.vendorId;

    try {
        const [rows, fields] = await query('SELECT * FROM `Meal` \
                                            WHERE `Vendor_ID` = ?', [vendorId]);
        res.json(rows);
    }
    catch (err) {
        throw err;
    }
};

const updateAllInventory = async (req, res, next) => {
    console.log("data: ", req.body);
    var error = false;
    for (const meal of req.body){
        const mealId = meal.mealId;
        const inventory = meal.inventory;
        try {
            const [rows, fields] = await query('UPDATE `Meal` SET `Inventory` =?\
                        WHERE `Meal_ID` = ?', [JSON.stringify(inventory), mealId]);
        }
        catch (err) {
            console.log(`Error updating the inventory: ${err}`);
            error = true;
        }
    }
    if (error) res.sendStatus(500);
    else res.sendStatus(200);
    
    // const mealId = req.body.mealId;
    // const count = req.body.count;

    // query_callBack('UPDATE `Meal` SET `Default_Inventory` = ?\
    //         WHERE `Meal_ID` = ?', [count, mealId],
    //         (err, result) => {
    //             if (err) 
    //                 console.log(`Error updating the default inventory: ${err}`);
    //             else
    //                 console.log("Updated row(s): ", result.affectedRows);
    //         });
}

router.get('/', getAllMeals); 
router.post('/updateAllInventory', updateAllInventory);

export default router;