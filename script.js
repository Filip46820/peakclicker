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
const prefixes = [
    {divider:1,suffix:''},
    {divider:1e3,suffix:'k'},
    {divider:1e6,suffix:'M'},
    {divider:1e9,suffix:'B'},
    {divider:1e12,suffix:'T'},
    {divider:1e15,suffix:'Qa'},
    {divider:1e18,suffix:'Qi'},
    {divider:1e21,suffix:'Sx'},
    {divider:1e24,suffix:'Sp'},
    {divider:1e27,suffix:'Oc'},
    {divider:1e30,suffix:'N'},
    {divider:1e33,suffix:'Dc'},
    {divider:1e36,suffix:'Udc'},
    {divider:1e39,suffix:'Ddc'},
    {divider:1e42,suffix:'Tdc'},
    {divider:1e45,suffix:'Qdc'},
];
//Prelozi cislo na zkracenou formu podle poctu mist => 1k = 1000...
function format(Balance){
    if(Balance==1){
        document.querySelector('.CurrentBalance').innerHTML=Balance.toFixed(2);
        return;
    }
for(let i=0;i<prefixes.length;i++){
    if(Balance>prefixes[i].divider){
        document.querySelector('.CurrentBalance').innerHTML=(Balance/prefixes[i].divider).toFixed(2)+prefixes[i].suffix;
    }
}
return;
}


//  Zakladni funkce pro přidani peněz za kliknutí
function Userclicking(){
    const ClickUpgradesOwned = ClickerData.upgrades[0].owned;
    ClickerData.balance += 1 + ClickUpgradesOwned;
    format(ClickerData.balance);
}

//  Funkce pro zakoupeni vylepšení
function BuyUpgrade(UpgradeIndex){
    const Upgrade = ClickerData.upgrades[UpgradeIndex];
    const UpgradeNextCost = Math.ceil(Upgrade.costBase*(Math.pow(Upgrade.rateGrowth, Upgrade.owned)));
    if(ClickerData.balance >= UpgradeNextCost){
        ClickerData.balance -= UpgradeNextCost;
        format(ClickerData.balance);
        Upgrade.owned++;
        Upgrade.costNext=Math.ceil(Upgrade.costBase*(Math.pow(Upgrade.rateGrowth, Upgrade.owned)));
        document.querySelector(`.${Upgrade.name}-owned`).innerHTML = Upgrade.owned;
        document.querySelector(`.${Upgrade.name}-price`).innerHTML = Upgrade.costNext;
    }else{
        alert("Not enough money to buy this upgrade");
    }
} 
setInterval(function(){
    ClickerData.upgrades.forEach(Upgrade =>{
        ClickerData.balance += Upgrade.perSecond*Upgrade.owned;
        format(ClickerData.balance);
    })
},1000);


/*Funkce pro načtení a uložení všeho*/
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
        format(ClickerData.balance);
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


// Prestige?
// Talents/Perks?

/*  Funkce pro nastaveni peněz přes konzoli
    Pro použití - GameEarn(cislo) do konzole    */
function GameEarn(Number){
    ClickerData.balance += Number;
    format(ClickerData.balance);
    return ClickerData.balance; //Bez toho - Undefined
}