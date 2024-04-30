export const getPaymentStatusColor = (status) => {
    switch (status) {
        case 'success':
            return 'bg-green-500';
        case 'pending':
            return 'bg-yellow-500';
        case 'failed':
            return 'bg-red-500';
        default:
            return 'bg-gray-500';
    }
};

export const getPaymentStatusText = (status) => {
    switch (status) {
        case 'success':
            return 'Payment Successful';
        case 'pending':
            return 'Payment Pending';
        case 'failed':
            return 'Payment Failed';
        default:
            return 'Unknown Status';
    }
};