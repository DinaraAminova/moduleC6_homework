const btn = document.getElementById('sizes_screen');

const wdt = window.screen.width;
const hgt = window.screen.height;


btn.addEventListener('click', () => {
    window.alert(`${wdt}x${hgt}`);
})