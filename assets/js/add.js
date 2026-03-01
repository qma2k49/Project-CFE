document.addEventListener("DOMContentLoaded", () => {
    const btnSave = document.querySelector('#btn-save');
    const notification = document.getElementById('notification');
    const formTitle = document.querySelector('.modal-header h1');

    // Dùng URLSearchParams để bắt tham số 'index' từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const editIndex = urlParams.get('index');

    const dateInput = document.querySelector('#date');
    const typeInput = document.querySelector('#selection');
    const amountInput = document.querySelector('#amount');
    const noteInput = document.querySelector('#note');

    // Nếu đang ở chế độ sửa
    if (editIndex !== null) {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        const transactionToEdit = transactions[editIndex];

        if (transactionToEdit) {
            // Đổ dữ liệu cũ vào form
            dateInput.value = transactionToEdit.date;
            typeInput.value = transactionToEdit.type;
            amountInput.value = transactionToEdit.amount;
            noteInput.value = transactionToEdit.note;

            // Thay đổi giao diện một chút
            if (formTitle) formTitle.textContent = 'Sửa khoản thu/chi';
            btnSave.textContent = 'Cập nhật';
        }
    }

    btnSave.addEventListener('click', () => {
        const date = dateInput.value;
        const type = typeInput.value;
        const amount = amountInput.value;
        const note = noteInput.value;

        // Kiểm tra tính hợp lệ
        if (!date || !amount || !note) {
            notification.textContent = 'Vui lòng điền đầy đủ thông tin!';
            notification.style.display = 'block';
            notification.style.color = 'red';
            return;
        }

        const transaction = {
            date: date,
            type: type,
            amount: parseFloat(amount),
            note: note,
        };

        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

        if (editIndex !== null) {
            // Chế độ Cập nhật
            transactions[editIndex] = transaction;
            notification.textContent = 'Cập nhật thành công!';
        } else {
            // Chế độ Thêm mới
            transactions.unshift(transaction);
            notification.textContent = 'Thêm thành công!';
        }

        localStorage.setItem('transactions', JSON.stringify(transactions));
        notification.style.display = 'block';
        notification.style.color = 'green';

        setTimeout(() => {
            window.location.href = 'history.html';
        }, 800);
    });
});