// Animate an error message on the monitor.

const showMessages = (errors, styled) => {
    const box = document.getElementById('msg-box');
    box.innerHTML = '';

    // Log each error if an array.
    if (!errors[0].msg) {

        errors.forEach(error => {
            const msg = document.createElement('div');
            msg.innerText = error;
            msg.classList.add('error');
    
            box.appendChild(msg);
        });

    // Log a singular error if something other than an array.
    } else {
        const msg = document.createElement('div');
        msg.innerText = errors[0].msg;
        msg.classList.add('error');

        box.appendChild(msg);
    }

}

export default showMessages;