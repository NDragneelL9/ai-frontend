import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import { getOrderStatusColor, getOrderStatusText } from '../helpers/orderHelper';

export const Order = () => {
    let { state } = useLocation();
    const { orderDate, totalAmount, orderItems, isClosed, id, installment, paidAmount } = state;

    return (
        <div className="py-12 min-h-[71vh]">
            <div className="container mx-auto">
                <h2 className="text-3xl font-semibold mb-8">Order Details: {id}</h2>
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-300">
                    <div className="px-6 pb-3 pt-6 flex justify-between">
                        <div className="mb-6">
                            <p className="text-gray-600 font-semibold">Order Status:</p>
                            <p className={`${getOrderStatusColor(isClosed)} font-semibold rounded-md px-2`}>{getOrderStatusText(isClosed)}</p>
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-600 font-semibold">Order Date:</p>
                            <p className="text-gray-800">{orderDate.substring(0, 10)}</p>
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-600 font-semibold">Order Total:</p>
                            <p className="text-gray-800">${totalAmount}</p>
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-600 font-semibold">Remaining payment:</p>
                            <p className="text-gray-800">${(totalAmount - paidAmount).toFixed(2)}</p>
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-600 font-semibold">Installment period</p>
                            <p className="text-gray-800">{installment} month</p>
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-600 font-semibold">Payment schedule</p>
                            <p className="text-gray-800">${(totalAmount / installment).toFixed(2)} monthly</p>
                        </div>
                    </div>
                    <div className="pt-3 pb-6 px-6">
                        <p className="text-gray-600 font-semibold">Order Items:</p>
                        {orderItems.map((item, index) => {
                            return (
                                <div key={index} className="flex items-center justify-between border-b border-gray-300 py-2">
                                    <div className="flex-1">
                                        <p className="text-gray-800">{item.quantity} x {item.productName}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-800">${(item.quantity * item.price).toFixed(2)}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="px-6 py-3">
                        <Link to={`/payments/${id}`} key={id} state={{
                            id,
                            totalAmount,
                            paidAmount,
                            installment,
                            isClosed,
                        }}>
                            <button type="submit" className="bg-blue-500 text-white rounded-md w-full h-10 hover:bg-blue-600 focus:outline-none">Payment</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
