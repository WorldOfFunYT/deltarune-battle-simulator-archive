class TextBox {
    constructor(ctx) {
        this.ctx = ctx;
        this.textIndex = 0;
        this.x = 0;
        this.y = 365;
    }

    update() {
        this.textIndex += 0.5
        this.ctx.fillStyle = colours.black;
        this.ctx.fillRect(this.x, this.y, gameCanvas.width, 115);
        this.ctx.fillStyle = colours.borderPurple;
        this.ctx.fillRect(this.x, this.y - 3, gameCanvas.width, 3);

    }
    text(text = [], startX = 30) {
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

                this.ctx.fillText(textLines[i].substring(0, this.textIndex - joinedString.length), this.x + startX, this.y + 10 + i * 28, 600)
            }

        }
    }
    enemySelect(enemyList) {
        const text = ["asdfdf", "asdgdfh"]
        this.text(enemyList.map(e => e.name), 80)
    }

}