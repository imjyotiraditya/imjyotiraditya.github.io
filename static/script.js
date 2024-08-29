function updateTimeIndicator() {
    const now = new Date();
    const hour = now.getHours();
    const timeIndicator = document.querySelector('.time-indicator');

    timeIndicator.innerHTML = '';

    for (let i = 0; i < 24; i++) {
        const icon = document.createElement('i');
        icon.classList.add('time-icon', 'fas');
        
        if (i >= 6 && i < 18) {
            icon.classList.add('fa-sun');
        } else {
            icon.classList.add('fa-moon');
        }
        
        if (i === hour) {
            icon.classList.add('active');
        }
        
        timeIndicator.appendChild(icon);
    }

    if (hour >= 6 && hour < 18) {
        document.body.classList.remove('dark-theme');
    } else {
        document.body.classList.add('dark-theme');
    }
}

function handleScroll() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateTimeIndicator();
    setInterval(updateTimeIndicator, 60000);
    window.addEventListener('scroll', handleScroll);
});
