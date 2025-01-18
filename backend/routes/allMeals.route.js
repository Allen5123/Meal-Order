import express from 'express';
import { query } from "../models/dbasync.model.js";
import upload from '../models/upload.model.js'

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

const updateDefaultInventory = async (req, res, net) => {
    const mealId = req.body.mealId;
    const count = req.body.count;

    try {
        const [row, ] = await query('UPDATE `Meal` SET `Default_Inventory` = ?\
            WHERE `Meal_ID` = ?', [count, mealId]);
        res.sendStatus(200);
    } catch (error) {
        console.log("Error updating the default inventory: ", error);
        res.sendStatus(500);
    }
}

const addMealItem = async (req, res, next) => {
    const {Vendor_ID, Meal_Name, Description, Price, Inventory, Default_Inventory} = JSON.parse(req.body.data);
    const Image_url = `${req.file.url.split('?')[0] + '?' + process.env.AZURE_BLOB_SAS}`;
    try {
        const [row, ] = await query('INSERT INTO `Meal` (`Vendor_ID`, `Meal_Name`, `Description`, `Price`,\
                    `Inventory`, `Image_url`, `Default_Inventory`) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [Vendor_ID, Meal_Name, Description, Price, JSON.stringify(Inventory), Image_url, Default_Inventory]);
        return res.json({Meal_ID: row.insertId, Image_url: Image_url});
    } catch (error) {
        console.log("Error in addMealItem: ", error);
        return res.json(null);
    }
}

router.get('/', getAllMeals); 
router.post('/updateDefaultInventory', updateDefaultInventory);
router.post('/addMealItem', upload.single('img'), addMealItem);

export default router;