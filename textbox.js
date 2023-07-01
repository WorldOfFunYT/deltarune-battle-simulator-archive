class TextBox {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d");
        this.textIndex = 0;
        this.x = 0;
        this.y = this.canvas.height - 115;
    }

    update() {
        this.y = this.canvas.height - 115;
        this.textIndex += 0.5
        this.ctx.fillStyle = colours.black;
        this.ctx.fillRect(this.x, this.y, gameCanvas.width, 115);
        this.ctx.fillStyle = colours.borderPurple;
        this.ctx.fillRect(this.x, this.y - 3, gameCanvas.width, 3);

    }
    text(text = [], startX = 30, statusEffects = ["none", "none", "none"]) {
        const statusColours = {
            "none": colours.white,
            "tired": colours.blue,
            "grey": colours.grey
        }
        const pixelLimit = 590;
        this.ctx.fillStyle = colours.white;
        this.ctx.font = "32px eightBitOperator"
        ctx.textBaseline = "top"
        let textLines = [];
        for (let i = 0; i < text.length; i++) {
            let words = text[i].split(" ");
            let currentWords = words[0] + " ";
            for (let j = 1; j < words.length; j++) {
                let tempWords = currentWords + words[j] + " ";
                if (this.ctx.measureText(tempWords).width >= pixelLimit) {
                    textLines.push(currentWords.trim());
                    currentWords = words[j] + " ";
                } else {
                    currentWords = tempWords;
                }
            }
            textLines.push(currentWords.trim());
        }

        for (let i = 0; i < textLines.length; i++) {
            let joinedString = "";
            for (let j = 0; j < textLines.slice(0, i).length; j++) {
                joinedString += textLines.slice(0, i)[j]
            }
            if (this.textIndex > joinedString.length) {
                this.ctx.fillStyle = statusColours[statusEffects[i]]

                this.ctx.fillText(textLines[i].substring(0, this.textIndex - joinedString.length), this.x + startX, this.y + 10 + i * 28, 600)
            }

        }
    }


    #capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    enemySelect(enemyList, ctx, currentPlayer) {
        const targetID = currentPlayer.target
        const statusEffectsList = enemyList.map(e => e.statusEffect)
        this.text(enemyList.map(e => e.name), 80, statusEffectsList)
        ctx.fillStyle = colours.red;
        ctx.fillRect(55, this.y + 20 + targetID * 28, 16, 16);
        this.text(statusEffectsList.map((e) => { if (e == "tired") { return "(Tired)" } else { return "e" } }), 256, ["grey"])
        for (let i = 0; i < enemyList.length; i++) {
            // Health bar
            ctx.fillStyle = colours.darkRed;
            ctx.fillRect(420, this.y + 15 + (i * 30), 81, 16)
            ctx.fillStyle = colours.green;
            ctx.fillRect(420, this.y + 15 + (i * 30), (enemyTeam[0].health / enemyTeam[0].maxHealth) * 81, 16)

            // Mercy Bar
            ctx.fillStyle = colours.mercyOrange;
            ctx.fillRect(520, this.y + 15 + (i * 30), 81, 16)
            ctx.fillStyle = colours.yellow;
            ctx.fillRect(520, this.y + 15 + (i * 30), (enemyTeam[0].mercy / 100) * 81, 16)

            // Text
            ctx.scale(1, 0.5);
            ctx.font = "24px eightBitOperator"

            // Labels
            ctx.fillStyle = colours.white
            ctx.fillText("HP", 424, (this.y + 2) * 2)
            ctx.fillText("MERCY", 524, (this.y + 2) * 2)

            // Percentages
            ctx.font = "28px eightBitOperator"
            ctx.fillText(`${Math.floor((enemyTeam[0].health / enemyTeam[0].maxHealth) * 100)}%`, 424, (this.y + 16 + i * 30) * 2)
            ctx.fillStyle = colours.darkRed
            ctx.fillText(`${enemyTeam[0].mercy}%`, 524, (this.y + 16 + i * 30) * 2)
            ctx.scale(1, 2);
        }

    }

}