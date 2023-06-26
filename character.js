class Character {
    constructor(name, health) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
    }
}

class Player extends Character {
    constructor(name, health, colour) {
        super(name, health)
        this.colour = colour;
    }
}

class Enemy extends Character {
    constructor(name, health) {
        super(name, health)
    }
}