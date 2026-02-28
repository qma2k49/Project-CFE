document.addEventListener("DOMContentLoaded", () => {
    const btnSave = document.querySelector('#btn-save');
    const notification = document.getElementById('notification');

    btnSave.addEventListener('click', () => {
        const dateInput = document.querySelector('#date');
        const typeInput = document.querySelector('#selection');
        const amountInput = document.querySelector('#amount');
        const noteInput = document.querySelector('#note');

        const date = dateInput.value;
        const type = typeInput.value;
        const amount = amountInput.value;
        const note = noteInput.value;


        notification.style.display = 'flex';
        // Kiểm tra tính hợp lệ
        if (date === '' || amount === '' || note === '') {
            return;
        }
        notification.style.color = 'green';
        notification.textContent = 'Thêm khoản tiền thành công!';

        // Lưu vào localStorage
        const transaction = {
            date: date,
            type: type,
            amount: parseFloat(amount),
            note: note,
        };

        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.push(transaction);
        localStorage.setItem('transactions', JSON.stringify(transactions));

        // Xóa dữ liệu trong form
        dateInput.value = '';
        typeInput.value = 'Thu';
        amountInput.value = '';
        noteInput.value = '';

        setTimeout(() => {
            window.location.href = 'history.html';
        }, 500);
    });

});