class Character {
    constructor(name, health, attack, defence, sprites) {
        this.name = name;
        this.health = health / 2;
        this.attack = attack;
        this.defence = defence;
        this.maxHealth = health;
        this.sprites = sprites;
        this.statusEffect = "none";
        for (let sprite in this.sprites) {
            let spriteUrl = this.sprites[sprite]
            this.sprites[sprite] = new Image()
            this.sprites[sprite].src = `./modules/${this.name.toLowerCase()}/assets/` + spriteUrl
        }
    }
}

class Player extends Character {
    constructor(name, health, attack, defence, colour, sprites) {
        super(name, health, attack, defence, sprites)
        this.colour = colour;
        this.selectedAction = 0;
        this.menu = 1;
        this.target = 0;
    }
}

class Enemy extends Character {
    constructor(name, health, attack, defence, sprites, flavourText, statusEffect = "none") {
        super(name, health, attack, defence, sprites)
        this.flavourText = flavourText;
        this.targets = []
        this.statusEffect = statusEffect;
        this.mercy = 50;
    }
}