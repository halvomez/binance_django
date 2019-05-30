function switch_refresh(data, button) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            if (button.innerHTML === 'stop') {
                button.innerHTML = 'stopped';
                button.classList.remove('btn-secondary');
                button.classList.add('btn-danger')
            } else {
                button.innerHTML = 'stop';
                button.classList.remove('btn-danger');
                button.classList.add('btn-secondary')
            }
        }
    };

    data = [data];
    xhr.setRequestHeader('X-CSRFToken', token);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
}

const main = document.querySelector('.main');
main.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('switch')) {
        const symbol = evt.target.parentNode.parentNode.querySelector('.symbol').innerHTML;
        switch_refresh(symbol, evt.target);
    }
});

const clear_button = document.querySelector('.btn-clear');
clear_button.addEventListener('click', () => {
    const buttons_stopped = document.querySelectorAll('.btn-danger');
    let symbols = [];
    for (const button of buttons_stopped) {
        const symbol = button.parentNode.parentNode.querySelector('.symbol').innerHTML;
        symbols.push(symbol)
    }
    clear_stopped(symbols, buttons_stopped)
});

function clear_stopped(data, buttons) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            for (const button of buttons) {
                button.innerHTML = 'stop';
                button.classList.remove('btn-danger');
                button.classList.add('btn-secondary')
            }
        }
    };

    xhr.setRequestHeader('X-CSRFToken', token);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
}