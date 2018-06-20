const panels = document.querySelectorAll('.panel');

let activeID;

const openPanel = (e) => {
    const id = e.currentTarget.id;
    panels.forEach(panel => panel.classList.remove('open'));
    if (id != activeID) {
        e.currentTarget.classList.toggle('open');
        activeID = id;
    } else {
        activeID = '';
    }
}

const activatePanel = (e) => {
    if (e.propertyName.includes('flex')) {
        // panels.forEach(panel => panel.classList.remove('active'));
        e.currentTarget.classList.toggle('active');    
    }
}

panels.forEach(panel => panel.addEventListener('click', openPanel));
panels.forEach(panel => panel.addEventListener('transitionend', activatePanel));