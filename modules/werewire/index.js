character = new Enemy(
    "Werewire", // Name
    240, // Health
    8, // Attack
    0, // Defence
    {}, // Sprites
    [
        { text: "Smorgasboard 2", condition: "encounter", subCondition: ["werewire", "tasque"] },
        { text: "Werewire appeared.", condition: "encounter" },
        { text: "Werewire is trying to revert a setting they accidentally set. " },
    ],
    "tired"
)
characters.push(character)