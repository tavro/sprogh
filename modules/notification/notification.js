const notification = document.getElementById("notification");

function showNotification(message) {
    notification.textContent = message;
    notification.style.opacity = 1;

    setTimeout(() => {
        notification.style.opacity = 0;
    }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
    showNotification("This is a sample notification!");
});