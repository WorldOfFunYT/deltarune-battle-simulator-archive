const gameCanvas = document.querySelector("canvas[data-game]");
const ctx = gameCanvas.getContext("2d");

function renderPlayer(active, playerIndex, team, ctx) {
    const player = team[playerIndex]
    if (!player) return;

    const containerWidth = 640
    const boxWidth = 213;

    let availibleSpace = containerWidth - (boxWidth * team.length);
    let gapSize = availibleSpace / (team.length + 1);

    let x = gapSize + (playerIndex * (boxWidth + gapSize));
    // x = boxWidth * playerIndex;
    ctx.textAlign = "left"
    ctx.fillStyle = colours.borderPurple;
    ctx.fillRect(x, 327, 213, 37);
    ctx.fillStyle = colours.black;
    ctx.fillRect(x + 2, 329, 209, 34);
    ctx.font = "16px dotumChePixel";
    ctx.fillStyle = colours.white;
    ctx.textBaseline = "middle"
    ctx.fillText(player.name.toUpperCase(), x + 10, 346)
    ctx.font = "12px cryptOfTomorrow";
    ctx.textBaseline = "top";
    ctx.fillText("HP", x + 110, 348);
    ctx.fillStyle = colours.darkRed;
    ctx.fillRect(x + 128, 348, 76, 9)
    ctx.fillStyle = player.colour;
    ctx.fillRect(x + 128, 348, (player.health / player.maxHealth) * 76, 9)
    ctx.textAlign = "right"
    ctx.fillStyle = colours.white
    ctx.fillText(player.health, x + 160, 334)
    ctx.fillText("/", x + 170, 334)
    ctx.fillText(player.maxHealth, x + 204, 334)

}

gameCanvas.width = 640;
gameCanvas.height = 480;
ctx.fillStyle = colours.black;
ctx.fillRect(0, 365, gameCanvas.width, 115);
ctx.fillStyle = colours.borderPurple;
ctx.fillRect(0, 362, gameCanvas.width, 3);
// Do textbox stuff
team = characters.filter(character => character.constructor.name == "Player").slice(0, 3)
for (let i = 0; i < team.length; i++) {
    active = i == 0;
    renderPlayer(active, i, team, ctx)
}