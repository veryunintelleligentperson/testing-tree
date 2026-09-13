addLayer("p", {
    name: "Skybox", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    image: "https://robloxskyboxwikii.fandom.com/wiki/File:TheSkybox.jpeg", 
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#aac1ff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "skyboxes", // Name of prestige currency
    baseResource: "studs", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        if (hasUpgrade('p', 15)) mult = mult.times(2.5)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for skyboxes", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
    11: {
    title: "Niche Start",
    description: "Double your stud gain.",
    cost: new Decimal(1),
        },
        12: {
    title: "Synergize",
    description: "Studs are boosted by how much skyboxes you have.",
    cost: new Decimal(2),
     effect() {
        return player[this.layer].points.add(1).pow(0.5)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
            13: {
    title: "Synergize Two: Electric Boogaloo",
    description: "Studs boost skybox gain now.",
    cost: new Decimal(5),
        effect() {
        return player.points.add(1).pow(0.15)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
            14: {
    title: "Triple",
    description: "Stud gain is tripled.",
    cost: new Decimal(10),
        },
                    15: {
    title: "Dual Booster",
    description: "Stud and skybox gain are multiplied by 2.5.",
    cost: new Decimal(20)     
        },
                    21: {
    title: "Exponentation",
    description: "Stud gain is raised to the power of 1.05.",
    cost: new Decimal(100)
        },
    },
    layerShown(){return true}
})

