function generateId(prefix = "order_", start) {
    var i = start || 0;
    return function() {
        return prefix + i++;
    }
}

export const id = generateId("order_", 0)

export const getOrderStatusColor = (isClosed) => {
    switch (isClosed) {
        case true:
            return 'bg-green-500';
        case false:
            return 'bg-yellow-500';
        default:
            return 'bg-gray-500';
    }
};

export const getOrderStatusText = (isClosed) => {
    switch (isClosed) {
        case true:
            return 'Order completed';
        case false:
            return 'Order active';
        default:
            return 'Unknown Status';
    }
};