const transactionList = document.querySelector('#transactionList');

function displayTransaction() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    transactionList.innerHTML = '';

    for (let index = 0; index < transactions.length; index++) {
        const transaction = transactions[index];
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${transaction.date}</td>
        <td>${transaction.type}</td>
        <td>${transaction.amount}</td>
        <td>${transaction.note}</td>
        <td class="btn-action">
            <button class="btn-edit">Sửa</button>
            <button class="btn-delete" onclick="deleteTransaction(${index})">Xóa</button>
        </td>
        `;

        transactionList.appendChild(row);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayTransaction();

    window.deleteTransaction = function (id) {
        if (confirm('Bạn có chắc chắn muốn xóa giao dịch này?')) {
            const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
            transactions.splice(id, 1);
            localStorage.setItem('transactions', JSON.stringify(transactions));
            displayTransaction();
        }
    }
});
