function calculateHex() {
    const lightDark = document.querySelector('input[name="lightDark"]:checked').value;
    const hotCold = document.querySelector('input[name="hotCold"]:checked').value;
    const greenPurple = document.querySelector('input[name="greenPurple"]:checked').value;
    const yellowPink = document.querySelector('input[name="yellowPink"]:checked').value;
    const vibrancy = document.querySelector('input[name="vibrancy"]:checked').value;
    const energyLevel = document.querySelector('input[name="energyLevel"]:checked').value;

    // Extract RGB values from the hex codes
    const rgbValues = [lightDark, hotCold, greenPurple, yellowPink, vibrancy, energyLevel].map(hexToRgb);

    // Calculate the average RGB values
    const avgRgb = rgbValues.reduce((acc, rgb) => {
        return [
            acc[0] + rgb[0],
            acc[1] + rgb[1],
            acc[2] + rgb[2],
        ];
    }, [0, 0, 0]).map(value => Math.round(value / rgbValues.length));

    // Add randomness to each RGB value
    const randomOffset = (Math.random() * 50) - 25; // Random offset between -25 and +25
    const finalRgb = avgRgb.map(value => {
        const randomValue = Math.round(value + randomOffset);
        return Math.max(0, Math.min(255, randomValue)); // Clamp to [0, 255]
    });

    // Convert the final RGB back to hex
    const combinedColor = rgbToHex(finalRgb[0], finalRgb[1], finalRgb[2]);

    // Display the modal with the result
    document.getElementById('color-box').style.backgroundColor = combinedColor;
    document.getElementById('result-text').innerHTML = `Your color is <span style="cursor: pointer; color: ${combinedColor};" onclick="copyToClipboard('${combinedColor}')">${combinedColor}</span> and we think that's cool!`;
    document.getElementById('modal').style.display = 'block';

    // Make the color box clickable
    const colorBox = document.getElementById('color-box');
    colorBox.onclick = function() {
        copyToClipboard(combinedColor);
    };
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).padStart(6, '0')}`;
}

function copyToClipboard(colorText) {
    navigator.clipboard.writeText(colorText).then(() => {
        alert(`Copied ${colorText} to clipboard!`);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}