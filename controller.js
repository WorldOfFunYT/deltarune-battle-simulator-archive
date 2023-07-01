class Controller {
    constructor() {
        // Movement
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        // Z, X, C
        this.interact = false;
        this.return = false;
        this.other = false;
        // Is pressed
        // Movement
        this.upPressed = false;
        this.downPressed = false;
        this.leftPressed = false;
        this.rightPressed = false;
        // Z, X, C
        this.interactPressed = false;
        this.returnPressed = false;
        this.otherPressed = false;

        // So the first 7 variables get toggled on key press
        this.#addKeyListeners();
    }
    #addKeyListeners() {
        // Handling pressing keys
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

        // Handling releasing keys
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
        if (!action) return this.#keyPress(key) // If no action, return whether the key is pressed
        // If the key is pressed
        if (this.#keyPress(key)) {
            // Do the action
            action();
            // Toggle if the key is pressed
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
        // Return the key and its keyPressed variant in an array
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
        // Return if the key is pressed
        return keyVariables[0] && !keyVariables[1]

    }

    update() {
        // Turn off the keyPressed variable if key isn't pressed
        if (!this.up) {
            this.upPressed = false;
        }
        if (!this.down) {
            this.downPressed = false;
        }
        if (!this.left) {
            this.leftPressed = false;
        }
        if (!this.right) {
            this.rightPressed = false;
        }
        if (!this.interact) {
            this.interactPressed = false;
        }
        if (!this.return) {
            this.returnPressed = false;
        }
        if (!this.other) {
            this.otherPressed = false;
        }
    }
}