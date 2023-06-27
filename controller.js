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
}