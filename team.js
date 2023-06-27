class Team {
    constructor(members) {
        this.members = members;
        this.tp = 0;
        this.activePlayer = 0;
    }
    handleControls(controller) {
        if (!this.members[this.activePlayer]) return
        if (controller.right && !controller.rightPressed) {
            this.members[this.activePlayer].selectedAction += 1
            controller.rightPressed = true
        } else if (!controller.right) {
            controller.rightPressed = false;
        }
        if (controller.left && !controller.leftPressed) {
            this.members[this.activePlayer].selectedAction -= 1
            controller.leftPressed = true
        } else if (!controller.left) {
            controller.leftPressed = false;
        }
        if (this.members[this.activePlayer].selectedAction > 4) {
            this.members[this.activePlayer].selectedAction -= 5
        }
        if (this.members[this.activePlayer].selectedAction < 0) {
            this.members[this.activePlayer].selectedAction += 5
        }

        if (controller.interact && !controller.interactPressed) {
            this.activePlayer += 1;
            controller.interactPressed = true
        } else if (!controller.interact) {
            controller.interactPressed = false
        }
        if (controller.return && !controller.returnPressed) {
            this.activePlayer = Math.max(this.activePlayer - 1, 0);
            controller.returnPressed = true
        } else if (!controller.return) {
            controller.returnPressed = false
        }
    }
}