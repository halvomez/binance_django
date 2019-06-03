async function switch_refresh(data, target) {
    const options = {
        'method': 'POST',
        'headers': {
            'X-CSRFToken': getCookie('csrftoken'),
            "Content-Type": "application/json"
        },
        'body': JSON.stringify(data)
    };

    try {
        const result = await fetch(url, options);

        if (result.ok) {
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
    } catch (e) {
        throw new Error(`${e.name} ${e.message}`)
    }
}

function getCookie(name) {
    let cookie = `; ${document.cookie}`.match(`;\\s*${name}=([^;]+)`);
    return cookie ? cookie[1] : '';
}

const main = document.querySelector('.main');
main.addEventListener('click', async (evt) => {
    const button = evt.target;
    if (button.classList.contains('switch')) {
        const data = {'symbol': []};
        data['symbol'].push(button.parentNode.parentNode.querySelector('.symbol').innerHTML);
        await switch_refresh(data, button);
    }
});

const clear_button = document.querySelector('.btn-clear');
clear_button.addEventListener('click', async () => {
    const buttons_stopped = document.querySelectorAll('.btn-danger');
    const data = {'symbol': []};
    for (const button of buttons_stopped) {
        data['symbol'].push(button.parentNode.parentNode.querySelector('.symbol').innerHTML);
    }
    await switch_refresh(data, buttons_stopped);
});