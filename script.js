//Zakladni data pro vylepšení a peníze
const ClickerData = {
    balance: 0,
    upgrades: [
        {
            name: "Click",
            owned: 0,
            costBase: 10,
            rateGrowth: 1.04,
            costNext: 10,
            PerSecond: 0,
        },
        {
            name: "Fishing",
            owned: 0,
            costBase: 100,
            rateGrowth: 1.06,
            costNext: 100,
            PerSecond: 2,
        },
        {
            name: "Mining",
            owned: 0,
            costBase: 400,
            rateGrowth: 1.08,
            costNext: 400,
            PerSecond: 5,
        },
        {
            name: "Gardening",
            owned: 0,
            costBase: 1000,
            rateGrowth: 1.085,
            costNext: 1000,
            PerSecond: 15,
        },
        {
            name: "Engineering",
            owned: 0,
            costBase: 7500,
            rateGrowth: 1.09,
            costNext: 7500,
            PerSecond: 50,
        },
    ],
};

//Zakladni funkce pro přidani peněz za kliknutí
function Userclicking(){
    const ClickUpgradesOwned = ClickerData.upgrades[0].owned;
    ClickerData.balance += 1 + ClickUpgradesOwned;
    document.querySelector('.CurrentBalance').innerHTML=ClickerData.balance;
}