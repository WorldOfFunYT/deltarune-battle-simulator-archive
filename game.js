const gameCanvas = document.querySelector("canvas[data-game]");
const ctx = gameCanvas.getContext("2d");
const controller = new Controller()

ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

const devicePixelRatio = window.devicePixelRatio || 1;
const backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio || 1;
const ratio = devicePixelRatio / backingStoreRatio;
const WIDTH = gameCanvas.offsetWidth * ratio;
const HEIGHT = gameCanvas.offsetHeight * ratio;
let currentTurn = "team";
const textBox = new TextBox(gameCanvas)

const team = new Team(characters.filter(character => character.constructor.name == "Player").slice(0, 3));
const enemyTeam = [characters.filter(character => character.constructor.name == "Enemy")[0], characters.filter(character => character.constructor.name == "Enemy")[0]];
let flavourTextId;
let lastTurn = 0;
function frame(timeStamp) {
    if (!flavourTextId) {
        flavourTextId = Math.floor(Math.random() * enemyTeam[0].flavourText.filter(text => text.condition == "encounter").length)
    }
    gameCanvas.width = WIDTH;
    gameCanvas.height = HEIGHT;
    ctx.scale(ratio, ratio);


    function renderPlayer(active, playerIndex, team, ctx) {
        const player = team[playerIndex]
        if (!player) return;

        let border;
        let y;

        const containerWidth = gameCanvas.width
        const boxWidth = 213.5;
        const teamLength = team.length;

        let availibleSpace = containerWidth - (boxWidth * team.length);
        let gapSize;

        if (teamLength <= 2) {
            gapSize = (availibleSpace - boxWidth) / 2;
        } else {
            gapSize = availibleSpace / (teamLength - 1);
        }

        let x;

        if (teamLength === 1) {
            x = (containerWidth - boxWidth) / 2;
        } else if (teamLength === 2) {
            x = (containerWidth - (boxWidth * teamLength)) / 2 + playerIndex * boxWidth;
        } else {
            x = gapSize + (playerIndex * boxWidth);
        }
        if (active) {
            border = player.colour
            y = 294 - 480 + gameCanvas.height;

            ctx.fillStyle = player.colour;
            ctx.fillRect(x, 331 - 480 + gameCanvas.height, 213, 33);
            ctx.fillStyle = colours.black;
            ctx.fillRect(x + 2, 332 - 480 + gameCanvas.height, 209, 32);
            for (let i = 0; i < 5; i++) {
                ctx.fillStyle = player.selectedAction == i ? colours.brightYellow : colours.orange
                ctx.fillRect(x + 20 + (i * 35), 335.5 - 480 + gameCanvas.height, 30, 25);
            }
            // ctx.fillStyle = colours.orange;
            // ctx.fillRect
        } else {
            border = colours.borderPurple
            y = 327 - 480 + gameCanvas.height;
        }

        ctx.textAlign = "left"
        ctx.fillStyle = border;
        ctx.fillRect(x, y, boxWidth, 37);
        ctx.fillStyle = colours.black;
        ctx.fillRect(x + 2, y + 2, 209, 34);
        ctx.drawImage(player.sprites.icon, x + 5, y + 2, 28, 28)

        ctx.font = "16px dotumChePixel";
        ctx.fillStyle = colours.white;
        ctx.textBaseline = "middle"
        ctx.fillText(player.name.toUpperCase(), x + 40, y + 19)
        ctx.font = "12px cryptOfTomorrow";
        ctx.textBaseline = "top";
        ctx.fillText("HP", x + 110, y + 21);
        ctx.fillStyle = colours.darkRed;
        ctx.fillRect(x + 128, y + 21, 76, 9)
        ctx.fillStyle = player.colour;
        ctx.fillRect(x + 128, y + 21, (player.health / player.maxHealth) * 76, 9)
        ctx.textAlign = "right"
        ctx.fillStyle = colours.white
        ctx.fillText(player.health, x + 160, y + 7)
        ctx.fillText("/", x + 170, y + 7)
        ctx.fillText(player.maxHealth, x + 204, y + 7)

    }

    function renderTP(ctx, tp) {
        tp = Math.floor(tp)
        const width = 19;
        const height = 187;
        const x = 41;
        const y = Math.max((gameCanvas.height - 118) / 2 - height, (gameCanvas.height - 118) / 2 - height / 2);
        ctx.fillStyle = colours.black;
        ctx.fillRect(x - 3, y - 4, width + 6, height + 8);
        ctx.fillStyle = colours.darkRed;
        ctx.fill()

        const progressHeight = (Math.max(0, -tp + 100) / 100) * height
        ctx.fillStyle = colours.orange;
        if (tp >= 100) ctx.fillStyle = colours.yellow;
        ctx.fillRect(x, y, width, height);

        ctx.fillStyle = colours.darkRed;
        ctx.fillRect(x, y, width, progressHeight);
        // ctx.fill()
        ctx.beginPath()
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.lineTo(x, y + width);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.fillStyle = colours.black;
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(x, y + height);
        ctx.lineTo(x + width, y + height);
        ctx.lineTo(x + width, y - width + height);
        ctx.lineTo(x, y + height);
        ctx.fill()
        ctx.closePath();

        ctx.fillStyle = colours.white
        ctx.font = "italic bold 28px eightBitOperator";
        ctx.textAlign = "left"
        ctx.fillText("T", x - 33, y + 30)
        ctx.fillText("P", x - 33, y + 50)
        if (tp < 100) {
            ctx.fillText(tp, x - 33, y + 70);
            ctx.fillText("%", x - 33, y + 90);

        } else {
            ctx.fillStyle = colours.brightYellow;
            ctx.fillText("M", x - 33, y + 70);
            ctx.fillText("A", x - 31, y + 90);
            ctx.fillText("X", x - 29, y + 110);
        }

    }

    function flavourText() {
        if (team.turn === 0) {
            textBox.text([enemyTeam[0].flavourText.filter(text =>
                text.condition == "encounter"
            )[flavourTextId].text])
        } else {
            textBox.text([enemyTeam[0].flavourText.filter(text =>
                !text.condition
            )[flavourTextId].text])

        }

    }

    if (currentTurn == "team") {
        team.handleControls(controller, enemyTeam.length)
    }
    controller.update();

    textBox.update()
    if (lastTurn != team.turn) {
        textBox.textIndex = 0;
    }
    switch (team.members[team.activePlayer].menu) {
        case 0:
            flavourText()
            break;
        case 1:
            textBox.enemySelect(enemyTeam, ctx, team.members[team.activePlayer])
    }
    for (let i = 0; i < team.members.length; i++) {

        renderPlayer(i == team.activePlayer, i, team.members, ctx)
    }
    team.tp = Math.min(team.tp + 0.1, 100);
    renderTP(ctx, team.tp);
    requestAnimationFrame(frame)
    lastTurn = team.turn;
}


frame(gameCanvas, ctx)
