// Инициализация MAX Bridge
if (window.WebApp) {
    window.WebApp.ready();
    window.WebApp.expand();
}

// Навигация между экранами
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    const targetScreen = document.getElementById(screenId + '-screen');
    if (targetScreen) {
        targetScreen.classList.add('active');
        window.scrollTo(0, 0);
    }
    
    updateBackButton();
}

// Открытие полной версии сайта
function openWebsite() {
    const url = 'https://centrprofnsk.ru';
    
    if (window.WebApp && window.WebApp.openLink) {
        window.WebApp.openLink(url);
    } else if (window.WebApp && window.WebApp.openTelegramLink) {
        window.WebApp.openTelegramLink(url);
    } else {
        window.open(url, '_blank');
    }
}

// Обработка кнопки "Назад" от MAX
if (window.WebApp && window.WebApp.BackButton) {
    window.WebApp.BackButton.onClick(() => {
        const activeScreen = document.querySelector('.screen.active');
        if (activeScreen && activeScreen.id !== 'main-screen') {
            showScreen('main');
        } else {
            window.WebApp.close();
        }
    });
}

// Показываем кнопку "Назад" когда не на главном экране
function updateBackButton() {
    if (window.WebApp && window.WebApp.BackButton) {
        const activeScreen = document.querySelector('.screen.active');
        if (activeScreen && activeScreen.id !== 'main-screen') {
            window.WebApp.BackButton.show();
        } else {
            window.WebApp.BackButton.hide();
        }
    }
}

// Следим за изменением экранов
const observer = new MutationObserver(updateBackButton);
observer.observe(document.getElementById('app'), {
    attributes: true,
    subtree: true,
    attributeFilter: ['class']
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    updateBackButton();
});
