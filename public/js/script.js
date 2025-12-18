document.addEventListener('DOMContentLoaded', () => {
    const hourSelect = document.getElementById('plan-hour');
    const minSelect = document.getElementById('plan-minute');
    const addBtn = document.getElementById('add-task-btn');
    const downloadBtn = document.getElementById('download-btn');
    const scheduleList = document.getElementById('schedule-list');
    const dateInput = document.getElementById('plan-date');
    const displayDate = document.getElementById('display-date');

    // 1. Populate Time Dropdowns
    for (let i = 0; i < 24; i++) {
        let h = i < 10 ? '0'+i : i;
        hourSelect.innerHTML += `<option value="${h}">${h}</option>`;
    }
    for (let i = 0; i < 60; i++) {
        let m = i < 10 ? '0'+i : i;
        minSelect.innerHTML += `<option value="${m}">${m}</option>`;
    }

    // 2. Set Default Date to Today
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    displayDate.innerText = new Date().toDateString();

    dateInput.addEventListener('change', (e) => {
        const d = new Date(e.target.value);
        displayDate.innerText = d.toDateString();
    });

    // 3. Add Task Logic
    addBtn.addEventListener('click', () => {
        const hr = hourSelect.value;
        const min = minSelect.value;
        const taskText = document.getElementById('plan-task').value;

        if (!taskText) return alert("Please enter a task!");

        // Remove placeholder if it exists
        if (scheduleList.querySelector('.placeholder-text')) {
            scheduleList.innerHTML = '';
        }

        const item = document.createElement('div');
        item.className = 'schedule-item';
        item.innerHTML = `
            <span class="item-time">${hr}:${min}</span>
            <span class="item-task">${taskText}</span>
        `;

        scheduleList.appendChild(item);
        document.getElementById('plan-task').value = ''; // Clear input
    });

    // 4. Download as PDF Logic
    downloadBtn.addEventListener('click', () => {
        const element = document.getElementById('pdf-content');
        const opt = {
            margin:       0.5,
            filename:     `Plan_${dateInput.value}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, backgroundColor: '#0B0F14' },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save();
    });
});