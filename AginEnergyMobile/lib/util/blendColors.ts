export function blendColors(foregroundHex:string, backgroundHex:string, opacity:number) {
    // Ensure the hex color is in the correct format
    if (foregroundHex.charAt(0) === '#') {
        foregroundHex = foregroundHex.substr(1);
    }
    if (backgroundHex.charAt(0) === '#') {
        backgroundHex = backgroundHex.substr(1);
    }

    // Parse the r, g, b values for the foreground color
    let fr = parseInt(foregroundHex.substring(0, 2), 16);
    let fg = parseInt(foregroundHex.substring(2, 4), 16);
    let fb = parseInt(foregroundHex.substring(4, 6), 16);

    // Parse the r, g, b values for the background color
    let br = parseInt(backgroundHex.substring(0, 2), 16);
    let bg = parseInt(backgroundHex.substring(2, 4), 16);
    let bb = parseInt(backgroundHex.substring(4, 6), 16);

    // Calculate the blended r, g, b values
    let r = Math.round(fr * opacity + br * (1 - opacity));
    let g = Math.round(fg * opacity + bg * (1 - opacity));
    let b = Math.round(fb * opacity + bb * (1 - opacity));

    // Convert back to hex and return the result
    return '#' +
        ('0' + r.toString(16)).slice(-2) +
        ('0' + g.toString(16)).slice(-2) +
        ('0' + b.toString(16)).slice(-2);
}