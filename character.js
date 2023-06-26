class Character {
    constructor(name, health, sprites) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.sprites = sprites;
        for (let sprite in this.sprites) {
            let spriteUrl = this.sprites[sprite]
            this.sprites[sprite] = new Image()
            this.sprites[sprite].src = `./modules/${this.name.toLowerCase()}/assets/` + spriteUrl
        }
    }
}

class Player extends Character {
    constructor(name, health, colour, sprites) {
        super(name, health, sprites)
        this.colour = colour;
        this.selectedAction = 0;
    }
}

class Enemy extends Character {
    constructor(name, health, sprites) {
        super(name, health, sprites)
    }
}