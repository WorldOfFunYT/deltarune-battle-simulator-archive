class TextBox {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext("2d");
        // How many characters are shown
        this.textIndex = 0;

        this.x = 0;
        this.y = this.canvas.height - 115;
    }

    update() {
        // Make sure y is accurate to canvas y
        this.y = this.canvas.height - 115;
        // Update how many characters are shown
        this.textIndex += 0.5
        // Draw the textbox background
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

        // How wide the text can be before wrapping
        const pixelLimit = 590;

        // Set up font
        this.ctx.fillStyle = colours.white;
        this.ctx.font = "32px eightBitOperator"
        ctx.textBaseline = "top"

        // Wrap the text into lines
        let textLines = []; // Array to store the resulting lines of text

        for (let i = 0; i < text.length; i++) { // Iterate over each line of text
            let words = text[i].split(" "); // Split the line into an array of words
            let currentWords = words[0] + " "; // Initialize the current line with the first word

            for (let j = 1; j < words.length; j++) { // Iterate over each word in the line
                let tempWords = currentWords + words[j] + " "; // Create a temporary line by appending the current word
                if (this.ctx.measureText(tempWords).width >= pixelLimit) { // Check if the width of the temporary line exceeds the limit
                    textLines.push(currentWords.trim()); // Add the current line to the result array
                    currentWords = words[j] + " "; // Start a new line with the current word
                } else {
                    currentWords = tempWords; // Update the current line with the temporary line
                }
            }

            textLines.push(currentWords.trim()); // Add the last line to the result array
        }

        for (let i = 0; i < textLines.length; i++) { // Iterate over each line in the textLines array
            let joinedString = ""; // Initialize an empty string to join previous lines

            // Iterate over previous lines and concatenate them into joinedString
            for (let j = 0; j < textLines.slice(0, i).length; j++) {
                joinedString += textLines.slice(0, i)[j];
            }

            if (this.textIndex > joinedString.length) { // Check if the textIndex is beyond the length of joinedString
                this.ctx.fillStyle = statusColours[statusEffects[i]]; // Set the fill color based on a corresponding status effect

                // Render the partially visible text on the canvas
                this.ctx.fillText(
                    textLines[i].substring(0, this.textIndex - joinedString.length),
                    this.x + startX,
                    this.y + 10 + i * 28,
                    600
                );
            }
        }

    }

    enemySelect(enemyList, ctx, currentPlayer) {
        const targetID = currentPlayer.target

        // List of status effects for each character
        const statusEffectsList = enemyList.map(e => e.statusEffect)

        // Write names of enemies, with colour
        this.text(enemyList.map(e => e.name), 80, statusEffectsList)

        // Draw the SOUL
        ctx.fillStyle = colours.red;
        ctx.fillRect(55, this.y + 20 + targetID * 28, 16, 16);

        // Draw the status text
        this.text(statusEffectsList.map((e) => { if (e == "tired") { return "(Tired)" } else { return "e" } }), 256, ["grey"])

        for (let i = 0; i < enemyList.length; i++) {
            // Draw the Health bar
            ctx.fillStyle = colours.darkRed;
            ctx.fillRect(420, this.y + 15 + (i * 30), 81, 16)
            ctx.fillStyle = colours.green;
            ctx.fillRect(420, this.y + 15 + (i * 30), (enemyTeam[0].health / enemyTeam[0].maxHealth) * 81, 16)

            // Draw the Mercy Bar
            ctx.fillStyle = colours.mercyOrange;
            ctx.fillRect(520, this.y + 15 + (i * 30), 81, 16)
            ctx.fillStyle = colours.yellow;
            ctx.fillRect(520, this.y + 15 + (i * 30), (enemyTeam[0].mercy / 100) * 81, 16)

            // Setup for text
            ctx.scale(1, 0.5);
            ctx.font = "24px eightBitOperator"

            // Labels for bars
            ctx.fillStyle = colours.white
            ctx.fillText("HP", 424, (this.y + 2) * 2)
            ctx.fillText("MERCY", 524, (this.y + 2) * 2)

            // Percentages
            ctx.font = "28px eightBitOperator"

            // Health
            ctx.fillText(`${Math.floor((enemyTeam[0].health / enemyTeam[0].maxHealth) * 100)}%`, 424, (this.y + 16 + i * 30) * 2)

            // Mercy
            ctx.fillStyle = colours.darkRed
            ctx.fillText(`${enemyTeam[0].mercy}%`, 524, (this.y + 16 + i * 30) * 2)
            ctx.scale(1, 2);
        }

    }

}