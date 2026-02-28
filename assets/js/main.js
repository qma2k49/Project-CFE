document.addEventListener('DOMContentLoaded', () => {
    updateDashboard();
});

function updateDashboard() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {
        if (transaction.type === 'Thu') {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }
    });

    const balance = totalIncome - totalExpense;

    // Format currency function
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
    };

    // Update UI
    const balanceEl = document.getElementById('balance');
    const incomeEl = document.getElementById('income');
    const expenseEl = document.getElementById('expense');

    if (balanceEl) {
        balanceEl.innerHTML = `<span>${formatCurrency(balance)}</span>`;
    }

    if (incomeEl) {
        incomeEl.innerHTML = `<span>+</span>${formatCurrency(totalIncome)}`;
    }

    if (expenseEl) {
        expenseEl.innerHTML = `<span>-</span>${formatCurrency(totalExpense)}`;
    }
}