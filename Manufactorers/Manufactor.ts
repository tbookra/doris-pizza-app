const OrderDB = require('../model/Orders')
const IsWorking = require('../model/Current_working')
import {sleep, startTopping,startBaking, serve, handle_bulk_order_finished_report} from '../utils/utils_functions'

class Manufactorer{
    constructor(protected name:string){
    }
}
export interface Order {
    _id: string;
    bulk_order_id: string;
    toppings: string[];
    status: string,
    createdAt: number;
    procces_started_at: Date | null,
    bulk_completed: Date | null;
    completed: Date | null
}

export class DoughChef extends Manufactorer{
    public busy: boolean = false
    constructor(name:string){
        super(name)
    }
    private time: number = 7000
    async prepare(orderObj: Order): Promise<void> {
        this.busy = true
       await OrderDB.update({_id:orderObj._id}, {$set:{status:"preparing dough", procces_started_at: Date.now()}}) 
       await sleep(this.time)
       this.busy = false
       await OrderDB.update({_id:orderObj._id}, {$set:{status:"dough ready"}})
       const isCurrentWorking = await IsWorking.find()
        if(isCurrentWorking.length === 0 || !isCurrentWorking[0].toppingChefs_is_working) startTopping()
    } 
}

export class ToppingChef extends Manufactorer{
    public busy: boolean = false
    private jobs: boolean[] = []
    constructor(name:string){
        super(name)
    }
    private time: number = 4000
    isbusy():void {
        if(this.jobs.length > 1) {
            this.busy = true
            
        } else {
            this.busy = false
        }
    }
    async prepare(orderObj: Order): Promise<void> {
        this.jobs.push(true)
        this.isbusy()
        await OrderDB.update({_id:orderObj._id}, {$set:{status:"preparing topping"}}) 
        await sleep(this.time * orderObj.toppings.length)
        this.jobs.pop()
        this.isbusy()
        await OrderDB.update({_id:orderObj._id}, {$set:{status:"topping ready"}})
        const isCurrentWorking = await IsWorking.find()
        if(isCurrentWorking.length === 0 || !isCurrentWorking[0].baking) startBaking()
    } 
}

export class Oven extends Manufactorer{
    public busy: boolean = false
    constructor(name:string){
        super(name)
    }
    private time: number = 10000
    async prepare(orderObj: Order): Promise<void> {
        this.busy = true
       await OrderDB.update({_id:orderObj._id}, {$set:{status:"baking..."}}) 
       await sleep(this.time)
       this.busy = false
       await OrderDB.update({_id:orderObj._id}, {$set:{status:"pizza ready!"}})
       const isCurrentWorking = await IsWorking.find()
        if(isCurrentWorking.length === 0 || !isCurrentWorking[0].serving) serve()
    } 
    
}

export class Waiter extends Manufactorer{
    public busy: boolean = false
    constructor(name:string){
        super(name)
    }
    private time: number = 5000
    async prepare(orderObj: Order): Promise<void> {
        this.busy = true
       await OrderDB.update({_id:orderObj._id}, {$set:{status:"serving..."}}) 
       await sleep(this.time)
       this.busy = false
       await OrderDB.update({_id:orderObj._id}, {$set:{status:"served", completed_at: Date.now(), completed:true}})
       // @ts-ignore: Object is possibly 'null'.
        const process_total_time =  (Date.now() - orderObj.procces_started_at) / 1000 
        console.log(`pizza served!! it took ${process_total_time} seconds`);
       
       handle_bulk_order_finished_report(orderObj.bulk_order_id)
    
    } 
    
}

// export class DowChefsList{
//     public workQue: Order[]
//     constructor(){
//         this.workQue = []
//     }
//     addToQue(order:string[]):Order[]{
//         const orderItem: Order = {
//             order_id: randomId(),
//             topings: order,
//             startTime: Date.now(),
//             finishedTime: null
//         }
//         this.workQue.push(orderItem)
//         return this.workQue
//     }
//     removeFromQue(orderId:string):Order[]{
//         const orderIndex = this.workQue.map((order) => {return order.order_id}).indexOf(orderId)
//         this.workQue.splice(orderIndex,1)
//         return this.workQue
//     }
// }