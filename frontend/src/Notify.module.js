const notifications = document.querySelector(".notifications");
// const buttons = document.querySelectorAll(".buttons .btn");

const toastDetails = {
    success: {
        icon: 'fa-circle-check',
    },
    error: {
        icon: 'fa-circle-xmark',
    },
    warning: {
        icon: 'fa-triangle-exclamation',
    },
    info: {
        icon: 'fa-circle-info',
    }
}

const removeToast = (toast) => {
    if (toast.dataset.position == "top-left" || toast.dataset.position == "bottom-left") {
        toast.classList.add("hideLeft");
    } else {
        toast.classList.add("hideRight");
    }
    if (toast.timeoutId) clearTimeout(toast.timeoutId);
    setTimeout(() => toast.remove(), 500);
}

export function createToast(options) {
    const { icon } = toastDetails[options.type];
    const toast = document.createElement("li");
    toast.className = `toast ${options.type}`;
    toast.dataset.position = options.position
    toast.innerHTML = `<div class="column">
                         <i class="fa-solid ${icon}"></i>
                         <span>${options.message}</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
    // let progressbar = document.createElement('span')
    // progressbar.className = 'progressbar'
    // progressbar.style.setProperty('animation-duration', `${options.timer/1000}s`)
    // toast.appendChild(progressbar)
    notifications.appendChild(toast);
    if(options.timer) {
        toast.timeoutId = setTimeout(() => removeToast(toast), options.timer);
    }
}

const showNotification = () => {
    let type = document.getElementById('type').value
    let message = document.getElementById('message').value
    let position = document.getElementById('position').value
    let timer = document.getElementById('timer').value

    // console.log(timer, position, message, type)
    // if(!position || !message || !type) {
    //     createToast({
    //         type : 'error',
    //         message : 'All Fields are Required',
    //         position : 'top-center',
    //         timer : 3000
    //     })
    //     return
    // }
    createToast({
        type : type,
        message : message,
        position : position,
        timer : timer
    })

}


// buttons.forEach(btn => {
//     btn.addEventListener("click", () => createToast(btn.id));
// });
