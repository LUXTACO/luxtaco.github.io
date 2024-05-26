function title_render() {
    const title = 'TAKKESHI.DISCORD';
    let index = 0;

    const loadingAnimation = () => {
        return new Promise((resolve) => {
            const intervalId = setInterval(() => {
                if (index < title.length) {
                    document.title = title.slice(0, index + 1) + '|';
                    index++;
                } else {
                    clearInterval(intervalId);
                    resolve();
                }
            }, 100);
        });
    };

    const deletingAnimation = () => {
        return new Promise((resolve) => {
            const intervalId = setInterval(() => {
                if (index >= 0) {
                    document.title = title.slice(0, index) + '|';
                    index--;
                } else {
                    clearInterval(intervalId);
                    resolve();
                }
            }, 100);
        });
    };

    loadingAnimation().then(() => {
        setTimeout(() => {
            index--;
            deletingAnimation().then(() => {
                setTimeout(title_render, 1000);
            });
        }, 1000);
    });
}

function resize_background() {
    const body = document.body;
    const bg = new Image();
    bg.src = body.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
    bg.onload = function() {
        const bgAspectRatio = bg.width / bg.height;
        const screenAspectRatio = window.innerWidth / window.innerHeight;
        if (bgAspectRatio > screenAspectRatio) {
        body.style.backgroundSize = 'auto 100%';
        } else {
        body.style.backgroundSize = '100% auto';
        }
    };
}

document.addEventListener('DOMContentLoaded', () => {
    title_render()
    resizeBackground();
    window.addEventListener('resize', resizeBackground);
});