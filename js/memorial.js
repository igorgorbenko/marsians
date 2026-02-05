// Load and display memorial
async function loadMemorial() {
    try {
        const response = await fetch('data/memorial.json');
        const memorialData = await response.json();
        const container = document.getElementById('memorial-container');

        if (!container) return;

        if (memorialData.length === 0) {
            container.innerHTML = `
                <div class="memorial-empty">
                    <p>Пока нет записей в мемориале.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = memorialData.map(person => `
            <div class="memorial-card">
                <div class="memorial-image" style="background-image: url('${person.image}')"></div>
                <div class="memorial-info">
                    <h3 class="memorial-nickname">${person.nickname}</h3>
                    ${person.status ? `<div class="memorial-status">${person.status}</div>` : ''}
                    <div class="memorial-dates">† ${person.dates}</div>
                    ${person.description ? `<p class="memorial-text">${person.description}</p>` : ''}
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading memorial:', error);
        const container = document.getElementById('memorial-container');
        if (container) {
            container.innerHTML = '<p class="memorial-empty">Ошибка загрузки данных мемориала.</p>';
        }
    }
}
