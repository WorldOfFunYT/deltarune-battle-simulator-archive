class Character {
    constructor(name, health, sprites) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.sprites = sprites;
        for (let sprite in this.sprites) {
            this.sprites[sprite] = `./modules/${this.name.toLowerCase()}/assets/` + this.sprites[sprite]
        }
    }
}

class Player extends Character {
    constructor(name, health, colour, sprites) {
        super(name, health, sprites)
        this.colour = colour;
    }
}

class Enemy extends Character {
    constructor(name, health, sprites) {
        super(name, health, sprites)
    }
}