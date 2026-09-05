// Инициализация MAX Bridge
window.WebApp.ready();
window.WebApp.expand();

// Навигация между экранами
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    
    const targetScreen = document.getElementById(screenId + '-screen');
    if (targetScreen) {
        targetScreen.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// Открытие полной версии сайта
function openWebsite() {
    window.WebApp.openLink('https://centrprofnsk.ru');
}

// Обработка кнопки "Назад" от MAX
window.WebApp.BackButton.onClick(() => {
    const activeScreen = document.querySelector('.screen.active');
    if (activeScreen && activeScreen.id !== 'main-screen') {
        showScreen('main');
    } else {
        window.WebApp.close();
    }
});

// Показываем кнопку "Назад" когда не на главном экране
function updateBackButton() {
    const activeScreen = document.querySelector('.screen.active');
    if (activeScreen && activeScreen.id !== 'main-screen') {
        window.WebApp.BackButton.show();
    } else {
        window.WebApp.BackButton.hide();
    }
}

// Следим за изменением экранов
const observer = new MutationObserver(updateBackButton);
observer.observe(document.getElementById('app'), {
    attributes: true,
    subtree: true,
    attributeFilter: ['class']
});
