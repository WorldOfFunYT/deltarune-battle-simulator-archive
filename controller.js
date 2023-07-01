class Controller {
    constructor() {
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.interact = false; // Z
        this.return = false; // X
        this.other = false; // C
        this.upPressed = false;
        this.downPressed = false;
        this.leftPressed = false;
        this.rightPressed = false;
        this.interactPressed = false; // Z
        this.returnPressed = false; // X
        this.otherPressed = false; // C

        this.#addKeyListeners();
    }
    #addKeyListeners() {
        document.onkeydown = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    this.up = true;
                    break;
                case 'ArrowDown':
                    this.down = true;
                    break;
                case 'ArrowLeft':
                    this.left = true;
                    break;
                case 'ArrowRight':
                    this.right = true;
                    break;
                case 'z':
                    this.interact = true;
                    break;
                case 'x':
                    this.return = true;
                    break;
                case 'c':
                    this.other = true;
                    break;
            }
        }
        document.onkeyup = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    this.up = false;
                    break;
                case 'ArrowDown':
                    this.down = false;
                    break;
                case 'ArrowLeft':
                    this.left = false;
                    break;
                case 'ArrowRight':
                    this.right = false;
                    break;
                case 'z':
                    this.interact = false;
                    break;
                case 'x':
                    this.return = false;
                    break;
                case 'c':
                    this.other = false;
                    break;
            }
        }
    }

    keyPressed(key, action) {
        if (!action) return this.#keyPress(key)
        if (this.#keyPress(key)) {
            action();
            switch (key) {
                case "up":
                    this.upPressed = true;
                    break;
                case "down":
                    this.downPressed = true;
                    break;
                case "left":
                    this.leftPressed = true;
                    break;
                case "right":
                    this.rightPressed = true;
                    break;
                case "interact":
                    this.interactPressed = true;
                    break;
                case "return":
                    this.returnPressed = true;
                    break;
                case "other":
                    this.otherPressed = true;
                    break;
            }
        }
    }
    #getKeyVariables(key) {
        switch (key) {
            case "up":
                return [this.up, this.upPressed]
            case "down":
                return [this.down, this.downPressed]
            case "left":
                return [this.left, this.leftPressed]
            case "right":
                return [this.right, this.rightPressed]
            case "interact":
                return [this.interact, this.interactPressed]
            case "return":
                return [this.return, this.returnPressed]
            case "other":
                return [this.other, this.otherPressed]
        }
    }
    #keyPress(key) {
        const keyVariables = this.#getKeyVariables(key)
        return keyVariables[0] && !keyVariables[1]
        // switch (key) {
        //     case "up":
        //         return this.up && !this.upPressed
        //     case "down":
        //         return this.down && !this.downPressed
        //     case "left":
        //         return this.left && !this.leftPressed
        //     case "right":
        //         return this.right && !this.rightPressed
        //     case "interact":
        //         return this.interact && !this.interactPressed
        //     case "return":
        //         return this.return && !this.returnPressed
        //     case "other":
        //         return this.other && !this.otherPressed
        // }

    }
}