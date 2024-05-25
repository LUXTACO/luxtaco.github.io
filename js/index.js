const programmingQuotes = [
    "Debugging is the art of finding the needle.",
    "My code: full of errors, but I'm learning.",
    "Bad code: so bad, it's good. Like a bad movie.",
    "Coding: Explaining jokes to a brick wall.",
    "Best code: unwritten, well-documented.",
    "The only true wisdom is in knowing you know nothing.",
    "Debugging: Forgot to save? What's more embarrassing?",
    "My code: rusty, but gets me there...",
    "Nighttime debugging: Can't resist the urge.",
    "Learning new languages: Write a compiler.",
    "Version 1.0: 'It kinda works'.",
    "Code errors: Coffee-related, switch to tea?",
    "Coding: Changing puzzle pieces, unknown picture.",
    "Debugging: Finding what you meant to write.",
    "My code: strange noises, but it's home."
];

const titleNames = [
    "Takkeshi", 
    "LUXTACO",
    "Takkeshi_Dev"
];

function letter_rotation() 
{
    const textElement = document.querySelector('.random-rotate');
    const text = textElement.textContent;
    const originalStyles = getComputedStyle(textElement);

    textElement.innerHTML = '';

    text.split('').forEach((letter, index) => {
        const p = document.createElement('p');
        p.textContent = letter;
        const randomAngle = Math.random() * 20 - 10;
        p.style.transform = `rotate(${randomAngle}deg)`;
        p.style.fontFamily = originalStyles.fontFamily;
        p.style.fontSize = originalStyles.fontSize;
        p.style.color = originalStyles.color;

        if (index >= text.length - 3) {
            const span = document.createElement('span');
            span.textContent = letter;
            p.innerHTML = '';
            p.appendChild(span);
        }
        textElement.appendChild(p);
    });
}

function quote_render()
{
    let randomQuote = programmingQuotes[Math.floor(Math.random() * programmingQuotes.length)];
    let quoteElement = document.querySelector('.quote');
    
    let newText = '';

    const writeAnimation = () => {
        return new Promise((resolve) => {
            const intervalId = setInterval(() => {
                if (newText.length < randomQuote.length) {
                    newText += randomQuote[newText.length];
                    quoteElement.innerHTML = `<h1>${newText}</h1>`;
                } else {
                    clearInterval(intervalId);
                    resolve();
                }
            }, 100);
        });
    };
    
    const deleteAnimation = () => {
        return new Promise((resolve) => {
            const intervalId = setInterval(() => {
                const text = quoteElement.textContent;
                newText = text.slice(0, -1);
                quoteElement.innerHTML = `<h1>${newText}</h1>`;
                if (newText.length === 0) {
                    clearInterval(intervalId);
                    resolve();
                }
            }, 100);
        });
    };
    
    writeAnimation().then(() => {
        setTimeout(() => {
            deleteAnimation().then(() => {
                setTimeout(quote_render, 1000);
            });
        }, 2000);
    });
}

function title_render() {
    const title = 'TAKKESHI.DEV';
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

    loadingAnimation().then(() => {
        setTimeout(title_render, 1000);
    });
}

function show_discord_user() {
    const discordUser = ".takkeshi"
    alert("Discord User: " + discordUser);
}

document.addEventListener('DOMContentLoaded', () => {
    letter_rotation()
    quote_render()
    title_render()
});