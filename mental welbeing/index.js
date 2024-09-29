const journalForm = document.getElementById('journalForm');
const entryInput = document.getElementById('entry');
const moodSelect = document.getElementById('mood');
const entriesContainer = document.getElementById('entries');
const analyticsContainer = document.getElementById('analytics');

let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];

function renderEntries() {
    entriesContainer.innerHTML = '';
    entries.forEach((entry, index) => {
        const div = document.createElement('div');
        div.className = 'entry';
        div.innerHTML = `<strong>${entry.mood}</strong>: ${entry.text}`;
        entriesContainer.appendChild(div);
    });
}

function renderAnalytics() {
    const moodCounts = entries.reduce((acc, entry) => {
        acc[entry.mood] = (acc[entry.mood] || 0) + 1;
        return acc;
    }, {});

    analyticsContainer.innerHTML = '';
    for (const mood in moodCounts) {
        const div = document.createElement('div');
        div.className = 'analytics-item';
        div.innerText = `${mood}: ${moodCounts[mood]}`;
        analyticsContainer.appendChild(div);
    }
}

journalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newEntry = {
        text: entryInput.value,
        mood: moodSelect.value,
    };
    entries.push(newEntry);
    localStorage.setItem('journalEntries', JSON.stringify(entries));
    entryInput.value = '';
    moodSelect.value = '';
    renderEntries();
    renderAnalytics();
});

// Initial render
renderEntries();
renderAnalytics();
