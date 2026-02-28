const transactionList = document.querySelector('#transactionList');

function displayTransaction() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    transactionList.innerHTML = '';

    transactions.forEach((transaction, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
        <td data-label="Ngày">${transaction.date}</td>
        <td data-label="Loại tiền">
            <span class="status-badge ${transaction.type === 'Thu' ? 'status-thu' : 'status-chi'}">${transaction.type}</span>
        </td>
        <td data-label="Số tiền">${new Intl.NumberFormat('vi-VN').format(transaction.amount)} VNĐ</td>
        <td data-label="Ghi chú">${transaction.note}</td>
        <td data-label="Hành động">
            <div class="btn-action-group">
                <button class="btn-edit" onclick="editTransaction(${index})">Sửa</button>
                <button class="btn-delete" onclick="deleteTransaction(${index})">Xóa</button>
            </div>
        </td>
        `;

        transactionList.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayTransaction();

    // Global Edit Function
    window.editTransaction = function (index) {
        window.location.href = `add.html?index=${index}`;
    };

    // Global Delete Function
    window.deleteTransaction = function (index) {
        if (confirm('Bạn có chắc chắn muốn xóa giao dịch này?')) {
            const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
            transactions.splice(index, 1);
            localStorage.setItem('transactions', JSON.stringify(transactions));
            displayTransaction();
        }
    };
});
