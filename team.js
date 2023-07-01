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
            case 0: // Action selecting
                controller.keyPressed("right", () => currentPlayer.selectedAction++)
                if (!controller.right) {
                    controller.rightPressed = false;
                }
                controller.keyPressed("left", () => currentPlayer.selectedAction--)
                if (!controller.left) {
                    controller.leftPressed = false;
                }
                if (currentPlayer.selectedAction > 4) {
                    currentPlayer.selectedAction -= 5
                }
                if (currentPlayer.selectedAction < 0) {
                    currentPlayer.selectedAction += 5
                }
                controller.keyPressed("interact", () => {
                    if (currentPlayer.selectedAction == 4) {

                        this.activePlayer += 1;
                        if (this.activePlayer >= this.members.length) {
                            this.activePlayer = 0;
                            this.turn++;
                        }
                    } else if (currentPlayer.selectedAction == 2) {
                        currentPlayer.menu = 2
                    } else {
                        currentPlayer.menu = 1
                    }
                })
                if (!controller.interact) {
                    controller.interactPressed = false
                }

                controller.keyPressed("return", () => {
                    this.activePlayer = Math.max(this.activePlayer - 1, 0);
                    controller.returnPressed = true
                });

                if (!controller.return) {
                    controller.returnPressed = false
                }
                break;
            case 1:
                controller.keyPressed("up", () => currentPlayer.target--)
                if (!controller.up) {
                    controller.upPressed = false;
                }
                controller.keyPressed("down", () => {
                    currentPlayer.target++;
                })
                if (!controller.down) {
                    controller.downPressed = false;
                }
                if (currentPlayer.target < 0) {
                    currentPlayer.target += enemyTeamLength
                }
                if (currentPlayer.target >= enemyTeamLength) {
                    currentPlayer.target -= enemyTeamLength
                }
                controller.keyPressed("return", () => currentPlayer.menu = 0)
                if (!controller.return) {
                    controller.returnPressed = false;
                }
        }
    }
}