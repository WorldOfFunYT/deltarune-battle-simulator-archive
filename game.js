const gameCanvas = document.querySelector("canvas[data-game]");
const ctx = gameCanvas.getContext("2d");
let team = {
    members: characters.filter(character => character.constructor.name == "Player").slice(0, 3),
    tp: 0
}

function frame(timeStamp) {
    gameCanvas.width = 640;
    gameCanvas.height = 480;


    function renderPlayer(active, playerIndex, team, ctx) {
        const player = team[playerIndex]
        if (!player) return;

        let border;
        let y;

        const containerWidth = 640
        const boxWidth = 213.5;

        let availibleSpace = containerWidth - (boxWidth * team.length);
        let gapSize = availibleSpace / (team.length + 1);

        let x = gapSize + (playerIndex * (boxWidth + gapSize));
        if (active) {
            border = player.colour
            y = 294;

            ctx.fillStyle = player.colour;
            ctx.fillRect(x, 331, 213, 33);
            ctx.fillStyle = colours.black;
            ctx.fillRect(x + 2, 332, 209, 32);
            for (let i = 0; i < 5; i++) {
                ctx.fillStyle = player.selectedAction == i ? colours.brightYellow : colours.orange
                ctx.fillRect(x + 20 + (i * 35), 335.5, 30, 25);
            }
            // ctx.fillStyle = colours.orange;
            // ctx.fillRect
        } else {
            border = colours.borderPurple
            y = 327;
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
        const x = 41;
        const y = 45;
        const width = 19;
        const height = 187;
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
        ctx.font = "italic 16px dotumChePixel";
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

    ctx.fillStyle = colours.black;
    ctx.fillRect(0, 365, gameCanvas.width, 115);
    ctx.fillStyle = colours.borderPurple;
    ctx.fillRect(0, 362, gameCanvas.width, 3);
    // Do textbox stuff
    for (let i = 0; i < team.members.length; i++) {
        active = i == 0;
        renderPlayer(active, i, team.members, ctx)
    }
    team.tp = Math.min(team.tp + 0.1, 100);
    renderTP(ctx, team.tp);
    requestAnimationFrame(frame)
}


frame(gameCanvas, ctx)
