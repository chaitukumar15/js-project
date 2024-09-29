const expenseForm = document.getElementById('expenseForm');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const expensesContainer = document.getElementById('expenses');
const budgetAdviceContainer = document.getElementById('budgetAdvice');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function renderExpenses() {
    expensesContainer.innerHTML = '';
    expenses.forEach((expense, index) => {
        const div = document.createElement('div');
        div.className = 'expense';
        div.innerText = `${expense.description}: $${expense.amount}`;
        expensesContainer.appendChild(div);
    });
    updateChart();
    provideBudgetAdvice();
}

function updateChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    const labels = expenses.map(expense => expense.description);
    const data = expenses.map(expense => expense.amount);

    const chartData = {
        labels: labels,
        datasets: [{
            label: 'Expenses',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function provideBudgetAdvice() {
    const totalSpent = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    const averageSpent = totalSpent / (expenses.length || 1);
    
    budgetAdviceContainer.innerText = `Total Spent: $${totalSpent.toFixed(2)}, Average Spending: $${averageSpent.toFixed(2)}`;
    
    if (averageSpent > 500) {
        budgetAdviceContainer.innerText += ' - Consider reducing your expenses.';
    } else {
        budgetAdviceContainer.innerText += ' - You are within a reasonable budget!';
    }
}

expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newExpense = {
        description: descriptionInput.value,
        amount: parseFloat(amountInput.value),
    };
    expenses.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    descriptionInput.value = '';
    amountInput.value = '';
    renderExpenses();
});

// Clear Expenses functionality
document.getElementById('clearExpenses').addEventListener('click', () => {
    expenses = [];
    localStorage.removeItem('expenses');
    renderExpenses();
});

// Initial render
renderExpenses();
