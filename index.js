const dotumChePixel = new FontFace('dotumChePixel', 'url(assets/fonts/dotumche-pixel.ttf)');

dotumChePixel.load().then(function (font) {

    // with canvas, if this is ommited won't work
    document.fonts.add(font);

    console.log('Loaded dotumChePixel');
});

const bitOperator = new FontFace('eightBitOperator', 'url(assets/fonts/8bitoperator_jve.ttf)');

bitOperator.load().then(function (font) {

    // with canvas, if this is ommited won't work
    document.fonts.add(font);

    console.log('Loaded eightBitOperator');
});

const cryptOfTomorrow = new FontFace('cryptOfTomorrow', 'url(assets/fonts/CryptOfTomorrow.ttf)');

cryptOfTomorrow.load().then(function (font) {

    // with canvas, if this is ommited won't work
    document.fonts.add(font);

    console.log('Loaded cryptOfTomorrow');
});

fetch('./modules.json')
    .then((response) => response.json())
    .then((json) => {
        for (module of json) {
            elem = document.createElement('script');
            elem.src = `modules/${module}/index.js`
            document.body.appendChild(elem)
        }
        gameScript = document.createElement('script')
        gameScript.src = `game.js`;
        document.body.appendChild(gameScript)
    })

let characters = [];
