let bliss_map = document.getElementById('bliss-map');
let bliss_map_rect = bliss_map.getBoundingClientRect();

let image = new Image();
image.src = '../assets/Bliss Map.png';

let top_clicker = document.getElementById("top");
let left_clicker = document.getElementById("left");
let right_clicker = document.getElementById("right");
let bottom_clicker = document.getElementById("bottom");

let sections = ['love', 'good', 'needs', 'paid', 'fulfillment', 'satisfaction', 'contentment', 'comfort', 'passion', 'mission', 'profession', 'vocation', 'bliss'];

let coords = [
 [338, 42, 395, 10, 514, 12, 665, 103, 684, 195, 599, 199, 531, 217, 474, 252, 443, 282, 377, 228, 316, 205, 263, 200, 226, 204, 188, 134],
    [11, 456, 10, 386, 89, 245, 192, 217, 191, 311, 218, 389, 275, 461, 246, 485, 219, 530, 207, 565, 199, 604, 197, 679, 106, 674, 13, 529],

    [886, 460, 891, 400, 811, 237, 705, 219, 694, 335, 664, 404, 611, 461, 648, 499, 682, 577, 687, 620, 687, 683, 791, 677, 880, 537],

    [439, 889, 533, 889, 653, 807, 667, 708, 547, 690, 483, 661, 438, 621, 395, 659, 355, 682, 284, 701, 215, 700, 222, 793, 348, 885],

    [443, 289, 475, 327, 501, 401, 463, 392, 444, 401, 419, 392, 388, 400, 404, 341],

    [278, 458, 324, 422, 388, 402, 382, 440, 391, 460, 379, 476, 387, 512, 332, 496],

    [608, 460, 561, 425, 504, 404, 509, 437, 503, 460, 507, 483, 502, 511, 553, 497],

    [438, 620, 482, 564, 501, 515, 458, 520, 443, 509, 429, 516, 387, 513, 403, 565],

    [196, 206, 193, 307, 220, 388, 274, 457, 324, 420, 384, 399, 401, 340, 442, 283, 379, 231, 305, 205],

    [703, 198, 595, 201, 535, 218, 474, 254, 443, 284, 474, 323, 507, 402, 566, 426, 610, 458, 661, 403, 690, 339],

    [199, 694, 200, 605, 219, 530, 251, 485, 278, 461, 324, 494, 384, 515, 400, 565, 437, 621, 376, 671, 283, 701],

    [683, 711, 685, 621, 678, 575, 647, 500, 608, 461, 555, 498, 503, 513, 484, 562, 439, 623, 491, 662, 551, 689],

    [390, 401, 419, 391, 443, 403, 465, 391, 503, 402, 509, 436, 503, 461, 507, 483, 500, 514, 459, 520, 443, 508, 427, 515, 387, 511, 380, 477, 390, 460, 382, 439]
];

let canvases = {};

let clicks = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
}

function init_sections() {
    for (let i = 0; i < sections.length; i++) {
        let section = sections[i];

        let ctx = document.getElementById(section).getContext('2d');
        canvases[section] = ctx;

        ctx.beginPath();

        ctx.moveTo(coords[i][0], coords[i][1]);

        for (let j = 2; j < coords[i].length; j += 2) {
            ctx.lineTo(coords[i][j], coords[i][j + 1]);
        }

        ctx.closePath();
        ctx.clip();

        ctx.filter = 'saturate(0%) grayscale(100%)';
        ctx.drawImage(image, 0, 0);
    }

    // Initialize arrows
    let ctx = document.getElementById("arrows").getContext('2d');

    ctx.rect(0, 903, 898, 1152);
    ctx.clip();

    ctx.drawImage(image, 0, 0);
}

function colorFill(section) {
    let sat;

    let ctx = canvases[section];

    let clicks_top = clicks['top'];
    let clicks_left = clicks['left'];
    let clicks_right = clicks['right'];
    let clicks_bottom = clicks['bottom'];

    switch (section) {
        case 'passion':
            sat = 12.5 * (clicks_top + clicks_left);
            break;
        case 'mission':
            sat = 12.5 * (clicks_top + clicks_right);
            break;
        case 'profession':
            sat = 12.5 * (clicks_right + clicks_bottom);
            break;
        case 'vocation':
            sat = 12.5 * (clicks_bottom + clicks_right);
            break;
        case 'fulfillment':
            sat = 8.325 * (clicks_top + clicks_left + clicks_right);
            break;
        case 'satisfaction':
            sat = 8.325 * (clicks_right + clicks_top + clicks_bottom);
            break;
        case 'comfort':
            sat = 8.325 * (clicks_left + clicks_bottom + clicks_right);
            break;
        case 'contentment':
            sat = 8.325 * (clicks_top + clicks_right + clicks_bottom);
            break;
        case 'love':
            clicks['top'] = (clicks_top == 4) ? 0 : clicks_top + 1;
            sat = 25 * clicks['top'];
            break;
        case 'good':
            clicks['left'] = (clicks_left == 4) ? 0 : clicks_left + 1;
            sat = 25 * clicks['left'];
            break;
        case 'paid':
            clicks['bottom'] = (clicks_bottom == 4) ? 0 : clicks_bottom + 1;
            sat = 25 * clicks['bottom'];
            break;
        case 'needs':
            clicks['right'] = (clicks_right == 4) ? 0 : clicks_right + 1;
            sat = 25 * clicks['right'];
            break;
        case 'bliss':
            sat = 6.25 * (clicks_left + clicks_top + clicks_right + clicks_bottom);
            break;
        default:
            console.log("Nonexistent section:" + section);
    }

    let gry = 100 - sat;

    // Clear Canvas
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw Section
    ctx.filter = `saturate(${sat}%) grayscale(${gry}%)`;
    ctx.drawImage(image, 0, 0);
}


window.onload = function () {
    init_sections();

    top_clicker.addEventListener("click", function () {
        // Initialize saturations
        colorFill('love');
        colorFill('passion');
        colorFill('mission');
        colorFill('fulfillment');
        colorFill('satisfaction');
        colorFill('bliss');
        colorFill('contentment');

        // Setup Fillings
        if (clicks['top'] != 4) {
            let ctx = canvases['love'];

            let region = new Path2D();
            region.moveTo(0, 282);
            region.lineTo(0, 282 - 68 * clicks['top']);
            region.lineTo(ctx.canvas.width, 282 - 68 * clicks['top']);
            region.lineTo(ctx.canvas.width, 282);
            region.closePath();

            ctx.globalAlpha = 0.4;
            ctx.fillStyle = 'white';
            ctx.fill(region);
        }
    });

    left_clicker.addEventListener("click", function () {
        // Initialize saturations
        colorFill('good');
        colorFill('passion');
        colorFill('profession');
        colorFill('fulfillment');
        colorFill('satisfaction');
        colorFill('bliss');
        colorFill('comfort');

        // Setup Fillings
        if (clicks['left'] != 4) {
            let ctx = canvases['good'];

            let region = new Path2D();
            region.moveTo(0, 679);
            region.lineTo(0, 679 - 115 * clicks['left']);
            region.lineTo(ctx.canvas.width, 679 - 115 * clicks['left']);
            region.lineTo(ctx.canvas.width, 679);
            region.closePath();

            ctx.globalAlpha = 0.4;
            ctx.fillStyle = 'white';
            ctx.fill(region);
        }
    });

    right_clicker.addEventListener("click", function () {
        // Initialize saturations
        colorFill('needs');
        colorFill('mission');
        colorFill('vocation');
        colorFill('contentment');
        colorFill('fulfillment');
        colorFill('bliss');
        colorFill('comfort');

        // Setup Fillings
        if (clicks['right'] != 4) {
            let ctx = canvases['needs'];

            let region = new Path2D();
            region.moveTo(0, 679);
            region.lineTo(0, 679 - 115 * clicks['right']);
            region.lineTo(ctx.canvas.width, 679 - 115 * clicks['right']);
            region.lineTo(ctx.canvas.width, 679);
            region.closePath();

            ctx.globalAlpha = 0.4;
            ctx.fillStyle = 'white';
            ctx.fill(region);
        }
    });

    bottom_clicker.addEventListener("click", function () {
        // Initialize saturations
        colorFill('paid');
        colorFill('profession');
        colorFill('vocation');
        colorFill('contentment');
        colorFill('satisfaction');
        colorFill('bliss');
        colorFill('comfort');

        // Setup Fillings
        if (clicks['bottom'] != 4) {
            let ctx = canvases['paid'];

            let region = new Path2D();
            region.moveTo(0, 889);
            region.lineTo(0, 889 - 68 * clicks['bottom']);
            region.lineTo(ctx.canvas.width, 889 - 68 * clicks['bottom']);
            region.lineTo(ctx.canvas.width, 889);
            region.closePath();

            ctx.globalAlpha = 0.4;
            ctx.fillStyle = 'white';
            ctx.fill(region);
        }
    });
}
