// Update current year and last modified date
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last modified: ${document.lastModified}`;

document.addEventListener('DOMContentLoaded', async () => {
    const directory = document.getElementById('directory');
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');

    const response = await fetch('data/members.json');
    const members = await response.json();

    function renderMembers(view = 'grid') {
        directory.className = view === 'grid' ? 'grid-view' : 'list-view';
        directory.innerHTML = members.map(member => `
            <div class="member-card">
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p>Membership Level: ${member.level}</p>
            </div>
        `).join('');
    }

    const menuIcon = document.getElementById('menu');
    const navLinks = document.getElementById('nav-links');
    const logo = document.getElementById('logo');
    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        menuIcon.classList.toggle('open');
        logo.classList.toggle('centered');
    });

    gridViewBtn.addEventListener('click', () => renderMembers('grid'));
    listViewBtn.addEventListener('click', () => renderMembers('list'));

    renderMembers('grid');
});
