document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.querySelector('.random-rotate');
    const text = textElement.textContent;
    const originalStyles = getComputedStyle(textElement); // Store the original styles

    textElement.innerHTML = '';

    text.split('').forEach((letter, index) => {
        const p = document.createElement('p');
        p.textContent = letter;
        const randomAngle = Math.random() * 20 - 10; // Random angle between -10 and 10 degrees
        p.style.transform = `rotate(${randomAngle}deg)`;
        // Apply the original styles to the new <p> elements
        p.style.fontFamily = originalStyles.fontFamily;
        p.style.fontSize = originalStyles.fontSize;
        p.style.color = originalStyles.color;
        // Add other styles as needed

        if (index >= text.length - 3) {
            const span = document.createElement('span');
            span.textContent = letter;
            p.innerHTML = '';
            p.appendChild(span);
        }
        textElement.appendChild(p);
    });
});