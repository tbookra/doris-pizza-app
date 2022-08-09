import { doughChef1, doughChef2, ToppingChef1,ToppingChef2,ToppingChef3,oven, waiter1,waiter2 } from '..';
import {Order} from '../Manufactorers/Manufactor'
const OrderDB = require('../model/Orders');
const IsWorking = require('../model/Current_working')

export const startPreparing = async () => {
    let waiting_jobs = 0
    await flag_work_inProgress()

    do{
        const uncompleteOrders = await OrderDB.where("status").equals("ordered").sort({createdAt: 1})
        if(uncompleteOrders?.length > 0) {
            waiting_jobs = uncompleteOrders.length
            if(!doughChef1.busy){
                doughChef1.prepare(uncompleteOrders[0])
                
            } else if(!doughChef2.busy){
                doughChef2.prepare(uncompleteOrders[0])
            } else {
                
                await sleep(50)
            }
        } else {
            waiting_jobs = 0
            const now_working = await IsWorking.find()
            await IsWorking.update({_id:now_working[0].id},{doughChefs_is_working: false})
        }
        
        
    } while ( waiting_jobs > 0 )
}

export const startTopping = async () => {
    let waiting_jobs = 0
    await flag_topping_work_inProgress()
    do{
        const uncompleteOrders = await OrderDB.where("status").equals("dough ready").sort({createdAt: 1})
        if(uncompleteOrders?.length > 0) {
            waiting_jobs = uncompleteOrders.length
            if(!ToppingChef1.busy){
                ToppingChef1.prepare(uncompleteOrders[0])
                
            } else if(!ToppingChef2.busy){
                ToppingChef2.prepare(uncompleteOrders[0])
            } else if(!ToppingChef3.busy){
                ToppingChef3.prepare(uncompleteOrders[0])
            } else {
                console.log("topping chefs are busy!!!");
                
                await sleep(50)
            }
        } else {
            waiting_jobs = 0
            const now_working = await IsWorking.find()
            await IsWorking.update({_id:now_working[0].id},{toppingChefs_is_working: false})
        }
        
        
    } while ( waiting_jobs > 0 )
}

export const startBaking = async () => {
    let waiting_jobs = 0
    await flag_oven_inProgress()
    do{
        const uncompleteOrders = await OrderDB.where("status").equals("topping ready").sort({createdAt: 1})
        if(uncompleteOrders?.length > 0) {
            waiting_jobs = uncompleteOrders.length
            if(!oven.busy){
                oven.prepare(uncompleteOrders[0])
            
            } else {
                await sleep(50)
            }
        } else {
            waiting_jobs = 0
            const now_working = await IsWorking.find()
            await IsWorking.update({_id:now_working[0].id},{baking: false})
        }
        
        
    } while ( waiting_jobs > 0 )
}
export const serve = async () => {
    let waiting_jobs = 0
    await flag_serving_inProgress()
    do{
        const uncompleteOrders = await OrderDB.where("status").equals("pizza ready!").sort({createdAt: 1})
        if(uncompleteOrders?.length > 0) {
            waiting_jobs = uncompleteOrders.length
            if(!waiter1.busy){
                waiter1.prepare(uncompleteOrders[0])
            
            } else if(!waiter2.busy) {
                waiter2.prepare(uncompleteOrders[0])
            } else {
                await sleep(50)
            }
        } else {
            waiting_jobs = 0
            const now_working = await IsWorking.find()
            await IsWorking.update({_id:now_working[0].id},{serving: false})
        }
        
        
    } while ( waiting_jobs > 0 )
}

export const handle_bulk_order_finished_report = async (bulkId:string) => {
    const completed = await OrderDB.where("bulk_order_id").equals(bulkId).where("reported").equals(false).sort({createdAt: 1})
    if(!completed.map((order:Order) => {return order.completed}).includes(false)){
        const total_time = (Date.now() - completed[0].createdAt) / 1000
        console.log(`bulk order: ${bulkId} is completed. it took ${total_time} seconds`);
        await OrderDB.updateMany({bulk_order_id:bulkId},{reported:true,bulk_completed: Date.now()})
    }
}

const flag_serving_inProgress = async () => {
    const working = await IsWorking.find()
    if(working.length === 0){
        await IsWorking.create({serving: true})
    } else {
        await IsWorking.update({_id:working[0].id},{serving: true})
    }
}
const flag_oven_inProgress = async () => {
    const working = await IsWorking.find()
    if(working.length === 0){
        await IsWorking.create({baking: true})
    } else {
        await IsWorking.update({_id:working[0].id},{baking: true})
    }
}
const flag_work_inProgress = async () => {
    const working = await IsWorking.find()
    if(working.length === 0){
        await IsWorking.create({doughChefs_is_working: true})
    } else {
        await IsWorking.update({_id:working[0].id},{doughChefs_is_working: true})
    }
}

const flag_topping_work_inProgress = async () => {
    const working = await IsWorking.find()
    if(working.length === 0){
        await IsWorking.create({toppingChefs_is_working: true})
    } else {
        await IsWorking.update({_id:working[0].id},{toppingChefs_is_working: true})
    }
}
export function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const randomId = () => {

    return Math.random().toString(36).substr(2,5)
    
    }