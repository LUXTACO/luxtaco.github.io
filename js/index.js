const programmingQuotes = [
    "Debugging is the art of finding the needle.",
    "My code is perfect... In its own way.",
    "Bad code, so bad, it's good. Like a bad movie.",
    "Coding is like baking a cake, but you can't eat it.",
    "Best code is no code at all. But that's boring.",
    "The only true wisdom is in knowing you know nothing.",
    "Debugging is like an onion, it has layers.",
    "Code is like a joke, if you have to explain it, it's bad.",
    "Nighttime debugging: The best ideas come at 3am.",
    "Learning new languages: Write a compiler.",
    "Version 1.0: 'It kinda works'.",
    "Code errors are like a puzzle, but you're the puzzle.",
    "Coding: The art of making the impossible possible.",
    "Debugging is finding out what you meant to write.",
    "My code is like a fine wine, it has an acquired taste.",
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

function resizeBackground() {
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
            index--; // set index to the last character
            deletingAnimation().then(() => {
                setTimeout(title_render, 1000);
            });
        }, 1000);
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
    resizeBackground();
    window.addEventListener('resize', resizeBackground);
});