function do_request(data, button) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            if (button.innerHTML === 'stop') {
                button.innerHTML = 'stoped';
                button.classList.remove('btn-secondary');
                button.classList.add('btn-danger')
            } else {
                button.innerHTML = 'stop';
                button.classList.remove('btn-danger');
                button.classList.add('btn-secondary')
            }
        }
    };

    xhr.setRequestHeader('X-CSRFToken', token);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
}

const main = document.querySelector('.main');
main.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('switch')) {
        const symbol = evt.target.parentNode.parentNode.querySelector('.symbol').innerHTML;
        const data = JSON.stringify({'symbol': symbol});
        do_request(data, evt.target);
    }
});
