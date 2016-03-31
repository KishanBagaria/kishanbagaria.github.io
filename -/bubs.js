function getRandomInt(max, min) {
    min = min || 0;
    return Math.floor(Math.random() * (max - min)) + min;
}

var materialColors = ['F44336', 'E91E63', '9C27B0', '673AB7', '3F51B5', '2196F3', '03A9F4', '00BCD4', '009688', '4CAF50', '8BC34A', 'CDDC39', 'FFEB3B', 'FFC107', 'FF9800', 'FF5722', '795548', '9E9E9E', '607D8B'];
var bubContainer = document.getElementById('bubs');
var dontTouch = ['header','div','section','h2','h3','img','a'];
var start;
function isThereAnyElAt(x, y) {
    return dontTouch.indexOf(document.elementFromPoint(x, y).tagName.toLowerCase()) !== -1;
}
function addRandomBubble() {
    var MAX_X = document.documentElement.clientWidth - 30,
        MAX_Y = document.documentElement.clientHeight - 30;
    var x, y;
    do {
        x = getRandomInt(MAX_X, 10);
        y = getRandomInt(MAX_Y, 10);
        if ((Date.now() - start) > 1600) break;
    }
    while ( isThereAnyElAt(x, y) || isThereAnyElAt(x + 24, y) || isThereAnyElAt(x, y + 24) || isThereAnyElAt(x + 24, y + 24) );
    var e = document.createElement('div');
    e.className = 'bub';
    e.style.left = x + 'px';
    e.style.top = y + 'px';
    e.style.background = '#' + materialColors[getRandomInt(materialColors.length)];
    bubContainer.appendChild(e);
}
function addBubbles() {
    if (document.documentElement.clientWidth > 450) {
        start = Date.now();
        for (var i = 0; i < (document.documentElement.clientWidth/50); i++) {
            addRandomBubble(i);
        }
        //$('.bub').draggable();
    }
}
window.addEventListener('load', function() {
  setTimeout(addBubbles, 1e3);
});
window.addEventListener('resize', function() {
    while (bubContainer.firstChild) bubContainer.removeChild(bubContainer.firstChild);
    addBubbles();
});

// $(function () {
//     $('header, section').draggable()
// });
