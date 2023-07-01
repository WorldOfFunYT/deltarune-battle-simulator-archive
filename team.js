class Team {
    constructor(members) {
        this.members = members;
        this.tp = 0;
        this.activePlayer = 0;
        this.turn = 0;
        this.showFlavourText = true;
    }
    handleControls(controller, enemyTeamLength) {
        const currentPlayer = this.members[this.activePlayer]
        if (!currentPlayer) return
        switch (currentPlayer.menu) {
            case 0: // Selecting an action
                // Right key pressed
                controller.keyPressed("right", () => currentPlayer.selectedAction++);
                // Left key pressed
                controller.keyPressed("left", () => currentPlayer.selectedAction--);
                // Make sure selected action isn't out of range
                if (currentPlayer.selectedAction > 4) {
                    currentPlayer.selectedAction -= 5;
                }
                if (currentPlayer.selectedAction < 0) {
                    currentPlayer.selectedAction += 5;
                }
                // Selecting an action
                controller.keyPressed("interact", () => {
                    if (currentPlayer.selectedAction == 4) { // If you are defending (go to next player)
                        this.activePlayer += 1;
                        if (this.activePlayer >= this.members.length) {
                            this.activePlayer = 0;
                            this.turn++;
                        }
                    } else if (currentPlayer.selectedAction == 2) { // If you are choosing an item (Go to action select)
                        currentPlayer.menu = 2;
                    } else { // Anything else (Go to enemy select)
                        currentPlayer.menu = 1;
                    }
                })
                // Going back to previous character (if there is a previous character to go to)
                controller.keyPressed("return", () => {
                    this.activePlayer = Math.max(this.activePlayer - 1, 0);
                });

                break;
            case 1: // Selecting an enemy
                controller.keyPressed("up", () => currentPlayer.target--) // Choosing enemy above
                controller.keyPressed("down", () => currentPlayer.target++) // Choosing enemy below

                // Making sure target is valid id
                if (currentPlayer.target < 0) {
                    currentPlayer.target += enemyTeamLength
                }
                if (currentPlayer.target >= enemyTeamLength) {
                    currentPlayer.target -= enemyTeamLength
                }

                controller.keyPressed("return", () => currentPlayer.menu = 0) // Going back to action select
                break;
        }
    }
}