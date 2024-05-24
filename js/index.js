const programmingQuotes = [
    "The best way to predict the future is to invent it.",
    "Debugging: Removing the needles from the haystack.",
    "I'm not a programmer, I'm a code artist.",
    "The only way to learn a new programming language is to write a compiler for it.",
    "Software is like sex: It's better when it's free.",
    "The only true wisdom is in knowing you know nothing.",
    "The best code is no code at all.",
    "Code is poetry.",
    "The best way to learn is to do.",
    "Don't fear failure, fear not trying.",
    "A good programmer is someone who always looks both ways before crossing a one-way street.",
    "There are two ways to write error-free programs; only the third works.",
    "The computer is a tool, but it's a tool with a mind of its own.",
    "Software is never finished, it's just abandoned.",
    "If debugging is the process of removing software bugs, then programming must be the process of putting them in."
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

document.addEventListener('DOMContentLoaded', () => {
    letter_rotation()
    quote_render()
});