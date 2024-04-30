import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { orders, payments } from '../signals/signals';
import { useSignal } from '@preact/signals-react';

const PaymentPage = () => {
    let { state } = useLocation();
    const newPayment = useSignal();
    const { totalAmount, installment, id } = state;
    // For demo purposes
    const [isPaid, setIsPaid] = useState(false);
    const navigate = useNavigate();

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        cardholderName: '',
        expirationDate: '',
        cvv: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const payingAmount = (totalAmount / installment);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const otherOrders = orders.value.filter(order => order.id !== id)
            const payingOrder = orders.value.find(order => order.id === id)

            const paymentNumber = "payment_" + payments.value.filter(payment => payment.orderId === id).length;

            newPayment.value = {
                orderId: id,
                status: 'success',
                paymentNumber: paymentNumber,
                amount: payingAmount,
                paymentDate: new Date().toISOString(),
            }

            payments.value = [...payments.value, newPayment.value]
            const orderPayments = payments.value.filter(payment => payment.orderId === id);

            const totalPaid = orderPayments.reduce((amountPaid, payment) => {
                return amountPaid + payment.amount
            }, 0)

            const updatedOrder = { ...payingOrder, isClosed: totalPaid === payingOrder.totalAmount };
            orders.value = [...otherOrders, updatedOrder];

            navigate(`/order/${id}`, { state: { ...updatedOrder } });
            //TODO: commented until integration with backend 
            // const response = await fetch(PAYMENTS_CREATE_URL, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({
            //         orderId: id,
            //         amount: totalPrice,
            //         status: "pending",
            //         paymentDate: new Date().toISOString(),
            //     })
            // });
            // payments.value = await response.json();
        } catch (error) {
            console.error(error.message)
        } finally {
            // for demo purposes
            setIsPaid(true)
        }
    };

    return (
        <div className="container mx-auto mt-8 min-h-[71vh]">
            <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
            <h3 className="text-lg font-semibold">Payment: ${payingAmount.toFixed(2)}</h3>
            <h2 className="text-lg font-semibold">Order: {id}</h2>
            <form onSubmit={handleSubmit}>
                <div className="bg-white py-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label htmlFor="cardNumber" className="text-lg font-semibold mb-2 block">Card Number:</label>
                        <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={paymentInfo.cardNumber}
                            onChange={handleChange}
                            className="border border-gray-400 px-3 py-2 rounded-md w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="cardholderName" className="text-lg font-semibold mb-2 block">Cardholder Name:</label>
                        <input
                            type="text"
                            id="cardholderName"
                            name="cardholderName"
                            value={paymentInfo.cardholderName}
                            onChange={handleChange}
                            className="border border-gray-400 px-3 py-2 rounded-md w-full"
                        />
                    </div>
                    <div className="flex flex-wrap -mx-2 mb-4">
                        <div className="w-full md:w-1/2 px-2">
                            <label htmlFor="expirationDate" className="text-lg font-semibold mb-2 block">Expiration Date:</label>
                            <input
                                type="text"
                                id="expirationDate"
                                name="expirationDate"
                                value={paymentInfo.expirationDate}
                                onChange={handleChange}
                                className="border border-gray-400 px-3 py-2 rounded-md w-full"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-2">
                            <label htmlFor="cvv" className="text-lg font-semibold mb-2 block">CVV:</label>
                            <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                value={paymentInfo.cvv}
                                onChange={handleChange}
                                className="border border-gray-400 px-3 py-2 rounded-md w-full"
                            />
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none" disabled={isPaid}>Submit Payment</button>
                </div>
            </form>
            <div>
                {isPaid && (
                    <div className="mt-5 flex items-center justify-between p-5 leading-normal text-green-600 bg-green-100 rounded-lg" role="alert">
                        <p>Success payment!</p>
                        <svg onClick={() => setIsPaid(!isPaid)} className="inline w-4 h-4 fill-current ml-2 hover:opacity-80 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM359.5 133.7c-10.11-8.578-25.28-7.297-33.83 2.828L256 218.8L186.3 136.5C177.8 126.4 162.6 125.1 152.5 133.7C142.4 142.2 141.1 157.4 149.7 167.5L224.6 256l-74.88 88.5c-8.562 10.11-7.297 25.27 2.828 33.83C157 382.1 162.5 384 167.1 384c6.812 0 13.59-2.891 18.34-8.5L256 293.2l69.67 82.34C330.4 381.1 337.2 384 344 384c5.469 0 10.98-1.859 15.48-5.672c10.12-8.562 11.39-23.72 2.828-33.83L287.4 256l74.88-88.5C370.9 157.4 369.6 142.2 359.5 133.7z" />
                        </svg>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PaymentPage;