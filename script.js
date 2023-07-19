const hiddenLink = document.getElementById('hidden-link');
const canvas = document.getElementById('matrix-canvas');
const context = canvas.getContext('2d');

// Define the dimensions of the canvas
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

// Set the canvas size
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Generate the matrix effect
function generateMatrix() {
    const fontSize = 16;
    const columns = Math.ceil(canvasWidth / fontSize);

    const matrix = Array(columns).fill(1).map((_, index) => ({
        value: getRandomCharacter(),
        posY: -fontSize,
        posX: index * fontSize,
        speed: getRandomSpeed(),
        color: getRandomColor(),
    }));

    return matrix;
}

// Get a random character from a set of characters
function getRandomCharacter() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}

// Get a random speed for each matrix column
function getRandomSpeed() {
    return Math.random() * 3 + 1;
}

// Get a random color for each matrix character
function getRandomColor() {
    const colors = ['#00FF00', '#FF0000', '#0000FF'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

// Draw the matrix animation
function drawMatrix(matrix) {
    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context.fillRect(0, 0, canvasWidth, canvasHeight);

    matrix.forEach((item) => {
        context.fillStyle = item.color;
        context.fillText(item.value, item.posX, item.posY);
        item.posY += item.speed;

        // Reset the position, value, and color if it reaches the bottom of the canvas
        if (item.posY >= canvasHeight) {
            item.posY = -fontSize;
            item.value = getRandomCharacter();
            item.color = getRandomColor();
        }
    });

    // Request animation frame for the next frame
    requestAnimationFrame(() => drawMatrix(matrix));
}

// Set a timeout to reveal the hidden link after 5 seconds (adjust as needed)
setTimeout(() => {
    hiddenLink.style.visibility = 'visible';
}, 5000);

// Generate and draw the matrix animation
const matrix = generateMatrix();
drawMatrix(matrix);
