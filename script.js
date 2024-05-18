//  Zakladni data pro vylepšení a peníze
const ClickerData = {
    balance: 0,
    upgrades: [
        {
            name: "click",
            owned: 0,
            costBase: 10,
            rateGrowth: 1.06,
            costNext: 10,
            perSecond: 0,
        },
        {
            name: "fishing",
            owned: 0,
            costBase: 100,
            rateGrowth: 1.06,
            costNext: 100,
            perSecond: 2,
        },
        {
            name: "mining",
            owned: 0,
            costBase: 400,
            rateGrowth: 1.08,
            costNext: 400,
            perSecond: 5,
        },
        {
            name: "gardening",
            owned: 0,
            costBase: 1000,
            rateGrowth: 1.085,
            costNext: 1000,
            perSecond: 15,
        },
        {
            name: "engineering",
            owned: 0,
            costBase: 7500,
            rateGrowth: 1.09,
            costNext: 7500,
            perSecond: 50,
        },
    ],
};

//  Zakladni funkce pro přidani peněz za kliknutí
function Userclicking(){
    const ClickUpgradesOwned = ClickerData.upgrades[0].owned;
    ClickerData.balance += 1 + ClickUpgradesOwned;
    document.querySelector('.CurrentBalance').innerHTML=ClickerData.balance;
}

//  Funkce pro zakoupeni vylepšení
function BuyUpgrade(UpgradeIndex){
    const Upgrade = ClickerData.upgrades[UpgradeIndex];
    const UpgradeNextCost = Math.ceil(Upgrade.costBase*(Math.pow(Upgrade.rateGrowth, Upgrade.owned)));
    if(ClickerData.balance >= UpgradeNextCost){
        ClickerData.balance -= UpgradeNextCost;
        Upgrade.owned++;
        Upgrade.costNext=Math.ceil(Upgrade.costBase*(Math.pow(Upgrade.rateGrowth, Upgrade.owned)));
        document.querySelector('.CurrentBalance').innerHTML=ClickerData.balance;
        document.querySelector(`.${Upgrade.name}-owned`).innerHTML = Upgrade.owned;
        document.querySelector(`.${Upgrade.name}-price`).innerHTML = Upgrade.costNext;
    }else{
        alert("Not enough money to buy this upgrade");
    }
} 
setInterval(function(){
    ClickerData.upgrades.forEach(Upgrade =>{
        ClickerData.balance += Upgrade.perSecond*Upgrade.owned;
        document.querySelector('.CurrentBalance').innerHTML=ClickerData.balance;
    })
},1000);

function save(){
    localStorage.clear();
    ClickerData.upgrades.map((upgrades) => {
        const obj = JSON.stringify({
            SOwned: upgrades.owned,
            SCostNext: upgrades.costNext,
        });
        console.log(obj); 
        localStorage.setItem(upgrades.name, obj);
    });
    localStorage.setItem('balance', JSON.stringify(ClickerData.balance));
    console.log(localStorage);
}

function load(){
    if(localStorage.getItem('balance')!==null){
        ClickerData.balance = parseFloat(localStorage.getItem('balance'));
        document.querySelector('.CurrentBalance').innerHTML=ClickerData.balance;
    }else{
        alert("Zadny save nenalezen");
    }
    ClickerData.upgrades.map((upgrades) => {
        if(localStorage.getItem(upgrades.name)!==null){
            const SavedData = JSON.parse(localStorage.getItem(upgrades.name));
            upgrades.owned = SavedData.SOwned;
            upgrades.costNext = SavedData.SCostNext;
            document.querySelector(`.${upgrades.name}-owned`).innerHTML = upgrades.owned;
            document.querySelector(`.${upgrades.name}-price`).innerHTML = upgrades.costNext;
        }
    });
}

// Add format for numbers? 1000=1k
// Prestige?
// Load?
// Reset progress?
// Talents/Perks?

/*  Funkce pro nastaveni peněz přes konzoli
    Pro použití - GameEarn(cislo) do konzole    */
function GameEarn(Number){
    ClickerData.balance += Number;
    document.querySelector('.CurrentBalance').innerHTML=ClickerData.balance;
    return ClickerData.balance; //Bez toho - Undefined
}