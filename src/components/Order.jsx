import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import { payments } from '../signals/signals';
import { getOrderStatusColor, getOrderStatusText } from '../helpers/orderHelper';
import { getPaymentStatusColor, getPaymentStatusText } from '../helpers/paymentHelper';
import { nextMonthPayment } from '../helpers/dateHelper';

export const Order = () => {
    let { state } = useLocation();
    const { orderDate, totalAmount, orderItems, isClosed, id, installment } = state;

    const orderPayments = payments.value.filter(payment => payment.orderId === id);

    const totalPaid = orderPayments.reduce((amountPaid, payment) => {
        return amountPaid + payment.amount
    }, 0)

    const disabledBtn = totalPaid === totalAmount;

    return (
        <div className="py-12 min-h-[71vh]">
            <div className="container mx-auto">
                <h2 className="text-3xl font-semibold mb-8">Order Details: {id}</h2>
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-400">
                    <div className="px-6 pb-3 pt-6 flex justify-between">
                        <div className="mb-6">
                            <p className="text-gray-600 font-semibold px-1">Order Status:</p>
                            <p className={`${getOrderStatusColor(isClosed)} font-semibold rounded-md px-1`}>{getOrderStatusText(isClosed)}</p>
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-600 font-semibold">Order Date:</p>
                            <p className="text-gray-800">{orderDate.substring(0, 10)}</p>
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-600 font-semibold">Order Total:</p>
                            <p className="text-gray-800">${totalAmount.toFixed(2)}</p>
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-600 font-semibold">Remaining payment:</p>
                            <p className="text-gray-800">${(totalAmount - totalPaid).toFixed(2)}</p>
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-600 font-semibold">Installment period</p>
                            <p className="text-gray-800">{installment} month</p>
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-600 font-semibold">Payment schedule</p>
                            <p className="text-gray-800">${(totalAmount / installment).toFixed(2)} monthly</p>
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-600 font-semibold">Next payment</p>
                            <p className="text-gray-800">{nextMonthPayment().toISOString().substring(0, 10)}</p>
                        </div>
                    </div>
                    <div className="pt-3 pb-6 px-6">
                        <p className="text-gray-600 font-semibold">Order Items:</p>
                        {orderItems.map((item, index) => {
                            return (
                                <div key={index} className="flex items-center justify-between border-b border-gray-400 py-2">
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
                    <div className="px-6 flex flex-wrap">
                        {orderPayments.length > 0 && (
                            orderPayments.map(payment => {
                                return (
                                    <div key={payment.paymentNumber} className="max-w-52 min-w-52 w-full rounded-lg overflow-hidden shadow-md border-gray-500 border mr-2 mt-2">
                                        <div className={`px-2 py-1 ${getPaymentStatusColor(payment.status)} text-white text-center`}>
                                            <h3 className="text-lg font-semibold">{getPaymentStatusText(payment.status)}</h3>
                                        </div>
                                        <div className="p-2">
                                            <p className="text-sm">Payment number: {payment.paymentNumber}</p>
                                            <p className="text-sm">Payment amount: ${payment.amount.toFixed(2)}</p>
                                            <p className="text-sm">Payment date: {payment.paymentDate.substring(0, 10)}</p>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                    <div className="px-6 py-3">
                        <Link to={`/payments/${id}`} key={id} state={{
                            id,
                            totalAmount,
                            installment,
                            isClosed,
                        }}>
                            {!disabledBtn && (<button type="submit" className={`bg-blue-500 text-white rounded-md w-full h-10 hover:bg-blue-600 focus:outline-none`}>Payment</button>)}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
