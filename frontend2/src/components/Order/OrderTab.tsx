import type { CustomerOrder } from '../../type'
import OrderItem from "./OrderItem";

export default function OrderTab({ orders }: { orders: Array<CustomerOrder> }) {
    return (
        <div className="one_tab">
            {/* Render items */}
            {orders.length > 0 ? (
                <div className="orders">
                    {orders.map((order) => (
                        <OrderItem key={order.Order_ID} order={order} />
                    ))}
                </div>
            ) : (
                <div className="orders_empty">\
                    <span className="orders_empty_title">目前沒有訂單！</span>
                </div>
            )}
        </div>

    );
}