const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

document.addEventListener('DOMContentLoaded', () => {
    loadPage('home', document.querySelector('.nav-btn'));
});

async function loadPage(pageId, btnElement) {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if (btnElement) {
        btnElement.classList.add('active');
    } else {
        const navMap = {'home':0, 'events':1, 'shop':2, 'rules':3, 'rating':4, 'reviews':5};
        if (navMap[pageId] !== undefined) {
            document.querySelectorAll('.nav-btn')[navMap[pageId]].classList.add('active');
        }
    }

    const container = document.getElementById('page-content');
    container.innerHTML = '<div style="text-align:center; padding: 50px; color:#888;">Загрузка...</div>';
    
    try {
        const response = await fetch(`pages/${pageId}.html`);
        const html = await response.text();
        container.innerHTML = html;
        window.scrollTo(0, 0);
        
        if(tg.HapticFeedback) tg.HapticFeedback.selectionChanged();
    } catch (e) {
        container.innerHTML = '<div style="text-align:center; padding: 50px; color:red;">Ошибка загрузки страницы</div>';
    }
}

function toggleForum(element) {
    element.classList.toggle('active');
    if(tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
}

function copyPromo(code) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(() => {
            tg.showPopup({ title: 'Скопировано', message: 'Промокод ' + code + ' скопирован!', buttons: [{type: 'ok'}] });
        });
    } else {
        tg.showPopup({ title: 'Промокод:', message: code, buttons: [{type: 'ok'}] });
    }
}

function openTelegramChannel() {
    tg.openTelegramLink('https://t.me/Severnyi_GM');
}

function openTelegram() {
    tg.openTelegramLink('https://t.me/Severnyi_GM?direct');
}
