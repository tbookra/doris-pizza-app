import  {  Request, Response } from 'express';
const OrderDB = require('../model/Orders')
const IsWorking = require('../model/Current_working')
import {startPreparing, sleep, randomId} from '../utils/utils_functions'


const handleOrder = async (req: Request, res: Response) => {
    const {orders} = req.body
    const bulkOrderId = randomId()
    try{
        orders.forEach( async (order: string[]) => {
            const savedOrder = await OrderDB.create({bulk_order_id: bulkOrderId, status: "ordered", toppings: order})
            await sleep(1)
            // console.log(savedOrder);
            
        });
        const isCurrentWorking = await IsWorking.find()
        if(isCurrentWorking.length === 0 || !isCurrentWorking[0].doughChefs_is_working) startPreparing()
        
        res.status(200).header("Access-Control-Allow-Origin", "http://localhost:8005").json({ orders: "we got right to it!!!" });
    } catch (err) {
      console.log(err);
    }
  };

  
  module.exports.handleOrder = handleOrder;