export function nextMonthPayment() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth()+1, 5)
}