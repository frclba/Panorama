import  Customer  from "./entity/customer/customer";
import  Address  from "./entity/address/address";
import OrderItem from "./entity/orderItem/orderItem";
import Order from "./entity/order/order";

let customer = new Customer("123", "Sr. Smith");
const address = new Address("Rua dois", "city", "state", "zip", "country");
customer.Address = address;
customer.activate();


const item1 = new OrderItem("1", 1, 1);
const item2 = new OrderItem("2", 1, 1);
const order = new Order("1", "123", [item1, item2]);


