function rand(n){
    return Math.trunc(Math.random()*n);
}

let stopDuration;
let isSlotSpinning = false;
function spinSlot(choiceNum){
    isSlotSpinning = true;
    let elemTextSlot = document.getElementsByClassName("js-text-slot");

    elemButtonStart.disabled = true;
    for (let text of elemTextSlot){
        text.classList.add("slot-mode");
        let loopDuration = choiceNum*0.14;
        text.style.animationDuration = `${loopDuration}s`;
        text.style.animationIterationCount = "infinite";
    }
    if (roll.isShorten){
        stopDuration = 1500;
    } else {
        stopDuration = 3000;
    }
    setTimeout(() => {
        let unit = -30;
        let randSelectIdx = rand(choiceNum);
        roll.setIdx(randSelectIdx);
        let randSelectPx = unit*(choiceNum+randSelectIdx);
        for (let text of elemTextSlot){
            text.classList.remove("slot-mode");
            text.style.transform = `translateY(${randSelectPx}px)`;
        }
        let restartDuration = 500;
        setTimeout(()=>{
            elemButtonStart.disabled = false;
            isSlotSpinning = false;
        }, restartDuration);
    }, stopDuration);
}

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

// 出目
class Roll{
    constructor(){
        this.idx;
        this.isEnhanced;
        this.isShorten;
        this.isAutoSlot;
        this.enhanceTimeLeft = 0;
        this.shortenTimeLeft = 0;
        this.autoSlotTimeLeft = 0;
        this.choiceMoney = 10;
        this.choiceMoneyIncrease = 10;
        this.choiceSlotEnhance = 3;
        this.choiceSlotShorten = 3;
        this.choiceAutoSlot = 3;
        if (localStorage.getItem("choiceMoney")===null){
            localStorage.setItem("choiceMoney", 10);
            localStorage.setItem("choiceMoneyIncrease", 10);
            localStorage.setItem("choiceSlotEnhance", 3);
            localStorage.setItem("choiceSlotShorten", 3);
            localStorage.setItem("choiceAutoSlot", 3);
        } else {
            this.choiceMoney = parseInt(localStorage.getItem("choiceMoney"));
            this.choiceMoneyIncrease = parseInt(localStorage.getItem("choiceMoneyIncrease"));
            this.choiceSlotEnhance = parseInt(localStorage.getItem("choiceSlotEnhance"));
            this.choiceSlotShorten = parseInt(localStorage.getItem("choiceSlotShorten"));
            this.choiceAutoSlot = parseInt(localStorage.getItem("choiceAutoSlot"));
        }
        
        this.choice = [
            `所持金+${this.choiceMoney}%`,
            `所持金獲得量+${this.choiceMoneyIncrease}%`,
            `スロット強化${this.choiceSlotEnhance}秒`,
            `スロット間隔短縮${this.choiceSlotShorten}秒`,
            `オートスロット${this.choiceAutoSlot}秒`,
        ];
        this.choiceNum = this.choice.length;
    }

    clear(){
        this.choiceMoney = 10;
        this.choiceMoneyIncrease = 10;
        this.choiceSlotEnhance = 3;
        this.choiceSlotShorten = 3;
        this.choiceAutoSlot = 3;
        this.choice = [
            `所持金+${this.choiceMoney}%`,
            `所持金獲得量+${this.choiceMoneyIncrease}%`,
            `スロット強化${this.choiceSlotEnhance}秒`,
            `スロット間隔短縮${this.choiceSlotShorten}秒`,
            `オートスロット${this.choiceAutoSlot}秒`,
        ];
    }

    rollUpdate(register=true){
        this.choice = [
            `所持金+${this.choiceMoney}%`,
            `所持金獲得量+${this.choiceMoneyIncrease}%`,
            `スロット強化${this.choiceSlotEnhance}秒`,
            `スロット間隔短縮${this.choiceSlotShorten}秒`,
            `オートスロット${this.choiceAutoSlot}秒`,
        ];
        slotUi.registerChoice(this.choice);
        updateButtonPriceState();
        if (register){
            localStorage.setItem("choiceMoney", this.choiceMoney);
            localStorage.setItem("choiceMoneyIncrease", this.choiceMoneyIncrease);
            localStorage.setItem("choiceSlotEnhance", this.choiceSlotEnhance);
            localStorage.setItem("choiceSlotShorten", this.choiceSlotShorten);
            localStorage.setItem("choiceAutoSlot", this.choiceAutoSlot);
            localStorage.setItem("priceMoney", priceMoney);
            localStorage.setItem("priceMoneyIncrease", priceMoneyIncrease);
            localStorage.setItem("priceSlotEnhance", priceSlotEnhance);
            localStorage.setItem("priceSlotShorten", priceSlotShorten);
            localStorage.setItem("priceAutoSlot", priceAutoSlot);
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
        let elemResultText = document.getElementById("js-result");
        let idx = this.getIdx();
        let rollStr = this.choice[idx];
        let num = this.getNumFromStr(rollStr);
        if (this.isEnhanced){
            num *= 2;
        }
        let result;

        if (rollStr.slice(0, 6)==="所持金獲得量"){
            moneyIncrease *= 1+num/100;
            moneyIncrease = Math.ceil(moneyIncrease);
            elemMoneyIncrease.textContent = moneyIncrease;
            result = "所持金獲得量+" + num + "%";
        } else if (rollStr.slice(0, 3)==="所持金"){
            money *= 1+num/100;
            money = Math.ceil(money);
            elemMoney.textContent = money;
            result = "所持金+" + num + "%";
        } else if (rollStr.slice(0, 6)==="スロット強化"){
            if (this.isEnhanced){
                num /= 2;
            }
            this.isEnhanced = true;
            elemIsEnhanced.disabled = false;
            let elemEnhanceTimeLeft = document.getElementById("js-enhance-time-left");
            if (this.enhanceTimeLeft<=0){
                this.enhanceTimeLeft = this.choiceSlotEnhance;
                let set = setInterval(() => {
                    this.enhanceTimeLeft--;
                    elemEnhanceTimeLeft.textContent = this.enhanceTimeLeft;
                    if (this.enhanceTimeLeft<=0){
                        clearInterval(set);
                        this.isEnhanced = false;
                        elemIsEnhanced.disabled = true;
                    }
                }, 1000);
            } else {
                this.enhanceTimeLeft = this.choiceSlotEnhance;
            }
            elemEnhanceTimeLeft.textContent = this.enhanceTimeLeft;
            result = "スロット強化" + num + "秒";
        } else if (rollStr.slice(0, 8)==="スロット間隔短縮"){
            this.isShorten = true;
            elemIsShorten.disabled = false;
            let elemShortenTimeLeft = document.getElementById("js-shorten-time-left");
            if (this.shortenTimeLeft<=0){
                this.shortenTimeLeft = num;
                let set = setInterval(() => {
                    this.shortenTimeLeft--;
                    elemShortenTimeLeft.textContent = this.shortenTimeLeft;
                    if (this.shortenTimeLeft<=0){
                        clearInterval(set);
                        this.isShorten = false;
                        elemIsShorten.disabled = true;
                    }
                }, 1000);
            } else {
                this.shortenTimeLeft = num;
            }
            elemShortenTimeLeft.textContent = this.choiceSlotShorten;
            result = "スロット間隔短縮" + num + "秒";
        } else if (rollStr.slice(0, 7)==="オートスロット"){
            elemAutoSlot.disabled = false;
            if (this.autoSlotTimeLeft<=0){
                this.autoSlotTimeLeft = num;
                let elemAutoSlotTimeLeft = document.getElementById("js-auto-slot-time-left");
                let set = setInterval(() => {
                    this.autoSlotTimeLeft--;
                    elemAutoSlotTimeLeft.textContent = this.autoSlotTimeLeft;
                    if (!isSlotSpinning){
                        spinSlot(this.choiceNum);
                    }
                    if (this.autoSlotTimeLeft<=0){
                        clearInterval(set);
                        elemAutoSlot.disabled = true;
                    }
                }, 1000);
            } else {
                this.autoSlotTimeLeft = num;
            }
            result = "オートスロット" + num + "秒";
        }

        elemResultText.textContent = result;
    }
}
let roll = new Roll();
let elemButtonStart = document.getElementById("js-button-start");
elemButtonStart.onclick = ()=>{
    spinSlot(roll.choiceNum);
};

// スロット
class SlotUi {

    registerChoice(choice){
        let elemSlot = document.getElementById("js-slot");
        let choiceNum = choice.length;
        while (elemSlot.hasChildNodes()){
            elemSlot.removeChild(elemSlot.lastChild);
        }

        for (let i=0; i<choiceNum*10; i++){
            if (i===2){
                let elem = document.createElement("div");
                elem.setAttribute("class", "hit");
                elemSlot.appendChild(elem);
            }
            let elem = document.createElement("p");
            elem.setAttribute("class", "js-text-slot");
            elem.textContent = choice[i%choiceNum];
            elemSlot.appendChild(elem);
        }
    }

    setKeyframes(choice){
        let keyframes = `
            @keyframes slot{
                0%{
                    transform: translateY(${-60*choice.length}px);
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
let slotUi = new SlotUi();

// リセットボタン
let elemButtonReset = document.getElementById("js-button-reset");
elemButtonReset.onclick = ()=>{
    let ok = confirm("リセットしますか？");
    if (!ok){
        return;
    }
    roll.clear();
    slotUi.registerChoice(roll.choice);
    let elemResultText = document.getElementById("js-result");
    elemResultText.textContent = "";
    elemStar.visibility = "hidden";
    money = 0;
    moneyIncrease = 1;
    elemMoney.textContent = money;
    elemMoneyIncrease.textContent = moneyIncrease;
    elemPriceMoney.textContent = 100;
    elemPriceMoneyIncrease.textContent = 100;
    elemPriceSlotEnhance.textContent = 100;
    elemPriceSlotShorten.textContent = 100;
    elemPriceAutoSlot.textContent = 100;
    localStorage.clear();
    localStorage.setItem("money", 0);
    localStorage.setItem("moneyIncrease", 0);
    localStorage.setItem("priceMoney", 100);
    localStorage.setItem("priceMoneyIncrease", 100);
    localStorage.setItem("priceSlotEnhance", 100);
    localStorage.setItem("priceSlotShorten", 100);
    localStorage.setItem("priceAutoSlot", 100);
    localStorage.setItem("choiceMoney", 10);
    localStorage.setItem("choiceMoneyIncrease", 10);
    localStorage.setItem("choiceSlotEnhance", 3);
    localStorage.setItem("choiceSlotShorten", 3);
    localStorage.setItem("choiceAutoSlot", 3);
    localStorage.setItem("isEnhanced", false);
    localStorage.setItem("isShorten", false);
    localStorage.setItem("isAutoSlot", false);
};

// 998スターを表示
let elemStar = document.getElementById("js-star");
if (money>=998244353){
    elemStar.visibility = "visible";
} else {
    elemStar.visibility = "hidden";
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

// 所持金を増加させる
setInterval(() => {
    money += moneyIncrease;
    elemMoney.textContent = money;
    localStorage.setItem("money", money);
    localStorage.setItem("moneyIncrease", moneyIncrease);
    updateButtonPriceState();
}, 1000);

// スロットのUIを作る
roll.rollUpdate();
slotUi.registerChoice(roll.choice);
slotUi.setKeyframes(roll.choice);

elemButtonPriceMoney.onclick = ()=>{
    money -= priceMoney;
    elemMoney.textContent = money;
    roll.choiceMoney += 10;
    priceMoney += 100;
    roll.rollUpdate();
    elemPriceMoney.textContent = priceMoney;
};
elemButtonPriceMoneyIncrease.onclick = ()=>{
    money -= priceMoneyIncrease;
    elemMoney.textContent = money;
    roll.choiceMoneyIncrease += 10;
    priceMoneyIncrease += 100;
    roll.rollUpdate();
    elemPriceMoneyIncrease.textContent = priceMoneyIncrease;
};
elemButtonPriceSlotEnhance.onclick = ()=>{
    money -= priceSlotEnhance;
    elemMoney.textContent = money;
    roll.choiceSlotEnhance += 3;
    priceSlotEnhance += 100;
    roll.rollUpdate();
    elemPriceSlotEnhance.textContent = priceSlotEnhance;
};
elemButtonPriceSlotShorten.onclick = ()=>{
    money -= priceSlotShorten;
    elemMoney.textContent = money;
    roll.choiceSlotShorten += 3;
    priceSlotShorten += 100;
    roll.rollUpdate();
    elemPriceSlotShorten.textContent = priceSlotShorten;
};
elemButtonPriceAutoSlot.onclick = ()=>{
    money -= priceAutoSlot;
    elemMoney.textContent = money;
    roll.choiceAutoSlot += 3;
    priceAutoSlot += 100;
    roll.rollUpdate();
    elemPriceAutoSlot.textContent = priceAutoSlot;
};

let elemIsEnhanced = document.getElementById("js-is-enhanced");
roll.isEnhanced = localStorage.getItem("isEnhanced");
if (roll.isEnhanced===null || roll.isEnhanced==="false"){
    roll.isEnhanced = false;
    elemIsEnhanced.disabled = true;
} else {
    elemIsEnhanced.disabled = false;
}

let elemIsShorten = document.getElementById("js-is-shorten");
roll.isShorten = localStorage.getItem("isShorten");
if (roll.isShorten===null || roll.isShorten==="false"){
    roll.isShorten = false;
    elemIsShorten.disabled = true;
} else {
    elemIsShorten.disabled = false;
}

let elemAutoSlot = document.getElementById("js-auto-slot");
roll.isAutoSlot = localStorage.getItem("isAutoSlot");
if (roll.isAutoSlot===null || roll.isAutoSlot==="false"){
    roll.isAutoSlot = false;
    elemAutoSlot.disabled = true;
} else {
    elemAutoSlot.disabled = false;
}

let elemButtonExplain = document.getElementById("js-explain");
let elemBlackSheet = document.getElementById("js-black-sheet");
elemButtonExplain.onclick = ()=>{
    elemBlackSheet.style.visibility = "visible";
};
let elemButtonClose = document.getElementById("js-button-close");
elemButtonClose.onclick = ()=>{
    elemBlackSheet.style.visibility = "hidden";
};