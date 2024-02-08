function rand(n){
    return Math.trunc(Math.random()*n);
}

function enableButtonStart(choiceNum){
    let elemButtonStart = document.getElementById("js-button-start");
    let elemTextSlot = document.getElementsByClassName("js-text-slot");

    elemButtonStart.onclick = ()=>{
        elemButtonStart.disabled = true;
        for (let text of elemTextSlot){
            text.classList.add("slot-mode");
            let loopDuration = choiceNum*0.14;
            text.style.animationDuration = `${loopDuration}s`;
            text.style.animationIterationCount = "infinite";
        }
        let spinDuration = 3000;
        setTimeout(() => {
            let unit = -30;
            let randSelectIdx = rand(choiceNum);
            roll.setIdx(randSelectIdx);
            let randSelectPx = unit*(choiceNum+randSelectIdx);
            for (let text of elemTextSlot){
                text.classList.remove("slot-mode");
                text.style.transform = `translateY(${randSelectPx}px)`;
            }
            let restartDuration = 800;
            setTimeout(()=>{
                elemButtonStart.disabled = false;
            }, restartDuration);
        }, spinDuration);
    };
}

// 出目
class Roll{
    constructor(){
        this.idx;
        this.choiceMoney = 10;
        this.choiceMoneyIncrease = 10;
        this.choiceSlotShorten = 5;
        this.choiceSlotEnhance
        this.choice = [
            "所持金+10%",
            "所持金獲得量+10%",
            "スロット間隔短縮5秒",
            "スロット強化5秒",
            "オートスロット5秒",
        ];
        this.choiceNum = this.choice.length;
    }

    enhance(rollStr){
        if (rollStr==="所持金"){
        }
    }

    setIdx(idx){
        this.idx = idx;
        this.applyRoll();
    }

    getIdx(){
        return (this.idx+2)%this.choiceNum;
    }

    getNumFromStr(str){
        let num = "";
        for (let c of str){
            if ("0"<=c && c<="9"){
                num += c;
            }
        }
        return parseInt(num);
    }

    applyRoll(){
        let idx = this.getIdx();
        let rollStr = this.choice[idx];
        let num = this.getNumFromStr(rollStr);

        if (rollStr.slice(0, 6)==="所持金獲得量"){
            moneyIncrease *= 1+num/100;
            moneyIncrease = Math.ceil(moneyIncrease);
            elemMoneyIncrease.textContent = moneyIncrease;
        } else if (rollStr.slice(0, 3)==="所持金"){
            money *= 1+num/100;
            money = Math.ceil(money);
            elemMoney.textContent = money;
        } else if (rollStr.slice(0, 6)==="スロット強化"){
        }
    }
}
let roll = new Roll();

// 回すボタン
enableButtonStart(roll.choiceNum);

// スロット
class SlotUi {
    constructor(choice){
        this.choice = choice;
        this.choiceNum = choice.length;
    }

    registerChoice(){
        let elemSlot = document.getElementById("js-slot");
        let choiceNum = this.choice.length;

        for (let i=0; i<choiceNum*10; i++){
            if (i===2){
                let elem = document.createElement("div");
                elem.setAttribute("class", "hit");
                elemSlot.appendChild(elem);
            }
            let elem = document.createElement("p");
            elem.setAttribute("class", "js-text-slot");
            elem.textContent = this.choice[i%choiceNum];
            elemSlot.appendChild(elem);
        }
    }

    setKeyframes(){
        let keyframes = `
            @keyframes slot{
                0%{
                    transform: translateY(${-60*this.choiceNum}px);
                }
                100%{
                    transform: translateY(0);
                }
            }
        `;
        let style = document.getElementsByTagName("style")[0];
        style.insertAdjacentHTML("afterbegin", keyframes);
    }
}
let slotUi = new SlotUi(roll.choice);
slotUi.registerChoice();
slotUi.setKeyframes();

// 所持金
let elemMoney = document.getElementById("js-money");
let elemMoneyIncrease = document.getElementById("js-unit-money");
let money = parseInt(localStorage.getItem("money"));
let moneyIncrease = parseInt(localStorage.getItem("moneyIncrease"));
if (isNaN(money)){
    money = 0;
    moneyIncrease = 1;
    localStorage.setItem("money", 0);
    localStorage.setItem("moneyIncrease", 1);
}
moneyIncrease = Math.max(moneyIncrease, 1);
elemMoney.textContent = money;
elemMoneyIncrease.textContent = moneyIncrease;

// 所持金を増加させる
setInterval(() => {
    money += moneyIncrease;
    elemMoney.textContent = money;
    localStorage.setItem("money", money);
    localStorage.setItem("moneyIncrease", moneyIncrease);
    updateButtonPriceState();
}, 1000);

// リセットボタン
let elemButtonReset = document.getElementById("js-button-reset");
elemButtonReset.onclick = ()=>{
    money = 0;
    moneyIncrease = 1;
    elemMoney.textContent = money;
    elemMoneyIncrease.textContent = moneyIncrease;
    localStorage.setItem("money", 0);
    localStorage.setItem("moneyIncrease", 0);
}

// 998スターを表示
function addStar(){
    let star = document.createElement("div");
    star.setAttribute("class", "star");
    let text = document.createElement("p");
    text.textContent = 998;
    star.appendChild(text);
    let wrapper = document.getElementById("js-wrapper-star");
    wrapper.appendChild(star);
}

// 強化
let priceMoney = parseInt(localStorage.getItem("priceMoney"));
let priceMoneyIncrease = parseInt(localStorage.getItem("priceMoneyIncrease"));
let priceSlotEnhance = parseInt(localStorage.getItem("priceSlotEnhance"));
let priceSlotShorten = parseInt(localStorage.getItem("priceSlotShorten"));
let priceAutoSlot = parseInt(localStorage.getItem("priceAutoSlot"));

if (isNaN(priceMoney)){
    priceMoney = 100;
    priceMoneyIncrease = 100;
    priceSlotEnhance = 100;
    priceSlotShorten = 100;
    priceAutoSlot = 100;
    localStorage.setItem("priceMoney", 100);
    localStorage.setItem("priceMoneyIncrease", 100);
    localStorage.setItem("priceSlotEnhance", 100);
    localStorage.setItem("priceSlotShorten", 100);
    localStorage.setItem("priceAutoSlot", 100);
}

let elemPriceMoney = document.getElementById("js-price-money");
let elemPriceMoneyIncrease = document.getElementById("js-price-money-increase");
let elemPriceSlotEnhance = document.getElementById("js-price-slot-enhance");
let elemPriceSlotShorten = document.getElementById("js-price-slot-shorten");
let elemPriceAutoSlot = document.getElementById("js-price-auto-slot");

elemPriceMoney.textContent = priceMoney;
elemPriceMoneyIncrease.textContent = priceMoneyIncrease;
elemPriceSlotEnhance.textContent = priceSlotEnhance;
elemPriceSlotShorten.textContent = priceSlotShorten;
elemPriceAutoSlot.textContent = priceAutoSlot;

if (money>=998244353){
    addStar();
}

let elemButtonPriceMoney = document.getElementById("js-button-price-money");
let elemButtonPriceMoneyIncrease = document.getElementById("js-button-price-money-increase");
let elemButtonPriceSlotEnhance = document.getElementById("js-button-price-slot-enhance");
let elemButtonPriceSlotShorten = document.getElementById("js-button-price-slot-shorten");
let elemButtonPriceAutoSlot = document.getElementById("js-button-price-auto-slot");

function updateButtonPriceState(){
    if (priceMoney<=money){
        elemButtonPriceMoney.disabled = false;
    } else {
        elemButtonPriceMoney.disabled = true;
    }
    if (priceMoneyIncrease<=money){
        elemButtonPriceMoneyIncrease.disabled = false;
    } else {
        elemButtonPriceMoneyIncrease.disabled = true;
    }
    if (priceSlotEnhance<=money){
        elemButtonPriceSlotEnhance.disabled = false;
    } else {
        elemButtonPriceSlotEnhance.disabled = true;
    }
    if (priceSlotShorten<=money){
        elemButtonPriceSlotShorten.disabled = false;
    } else {
        elemButtonPriceSlotShorten.disabled = true;
    }
    if (priceAutoSlot<=money){
        elemButtonPriceAutoSlot.disabled = false;
    } else {
        elemButtonPriceAutoSlot.disabled = true;
    }
}
updateButtonPriceState();