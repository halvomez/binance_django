function switch_refresh(data, target) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            if (target instanceof NodeList) {
                for (const item of target) {
                    item.innerHTML = 'stop';
                    item.classList.remove('btn-danger');
                    item.classList.add('btn-secondary')
                }
            } else {
                if (target.innerHTML === 'stop') {
                    target.innerHTML = 'stopped';
                    target.classList.remove('btn-secondary');
                    target.classList.add('btn-danger')
                } else {
                    target.innerHTML = 'stop';
                    target.classList.remove('btn-danger');
                    target.classList.add('btn-secondary')
                }
            }
        }
    };

    xhr.setRequestHeader('X-CSRFToken', token);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
}

const main = document.querySelector('.main');
main.addEventListener('click', (evt) => {
    const button = evt.target;
    if (button.classList.contains('switch')) {
        const data = {'symbol': []};
        data['symbol'].push(button.parentNode.parentNode.querySelector('.symbol').innerHTML);
        switch_refresh(data, button);
    }
});

const clear_button = document.querySelector('.btn-clear');
clear_button.addEventListener('click', () => {
    const buttons_stopped = document.querySelectorAll('.btn-danger');
    const data = {'symbol': []};
    for (const button of buttons_stopped) {
        data['symbol'].push(button.parentNode.parentNode.querySelector('.symbol').innerHTML);
    }
    switch_refresh(data, buttons_stopped);
});