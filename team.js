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
            case 0:
                if (controller.keyPressed("right")) {
                    currentPlayer.selectedAction += 1
                    controller.rightPressed = true
                } else if (!controller.right) {
                    controller.rightPressed = false;
                }
                if (controller.keyPressed("left")) {
                    currentPlayer.selectedAction -= 1
                    controller.leftPressed = true
                } else if (!controller.left) {
                    controller.leftPressed = false;
                }
                if (currentPlayer.selectedAction > 4) {
                    currentPlayer.selectedAction -= 5
                }
                if (currentPlayer.selectedAction < 0) {
                    currentPlayer.selectedAction += 5
                }
                if (controller.keyPressed("interact")) {
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
                    controller.interactPressed = true
                } else if (!controller.interact) {
                    controller.interactPressed = false
                }
                if (controller.keyPressed("return")) {
                    this.activePlayer = Math.max(this.activePlayer - 1, 0);
                    controller.returnPressed = true
                } else if (!controller.return) {
                    controller.returnPressed = false
                }
                break;
            case 1:
                if (controller.keyPressed("up")) {
                    currentPlayer.target--;
                    if (currentPlayer.target < 0) {
                        currentPlayer.target += enemyTeamLength
                    }
                    controller.upPressed = true;
                } else {
                    controller.upPressed = false;
                }
                if (controller.keyPressed("down")) {
                    currentPlayer.target++;
                    if (currentPlayer.target >= enemyTeamLength) {
                        currentPlayer.target -= enemyTeamLength
                    }
                    controller.downPressed = true;
                } else {
                    controller.downPressed = false;
                }
        }
    }
}