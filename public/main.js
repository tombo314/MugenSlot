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
            let unit = -24;
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
        this.choice = [
            "所持金+10%",
            "所持金増加量+10%",
            "スロット間隔短縮30秒",
            "スロット強化30秒",
        ];
        this.choiceNum = this.choice.length;
    }

    setIdx(idx){
        this.idx = idx;
        this.apply();
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

    apply(){
        let idx = this.getIdx();
        let rollStr = this.choice[idx];
        let num = this.getNumFromStr(rollStr);

        if (rollStr.slice(0, 6)==="所持金増加量"){
            moneyIncrease *= 1+num/100;
            moneyIncrease = Math.ceil(moneyIncrease);
            elemUnitMoney.textContent = moneyIncrease;
        } else if (rollStr.slice(0, 3)==="所持金"){
            money *= 1+num/100;
            money = Math.ceil(money);
            elemMoney.textContent = money;
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
                    transform: translateY(${-48*this.choiceNum}px);
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
let savedMoney = localStorage.getItem("money");
let money;
if (savedMoney===null){
    money = 0;
} else {
    money = parseInt(savedMoney);
    elemMoney.textContent = money;
}
let moneyIncrease = 1;
let elemUnitMoney = document.getElementById("js-unit-money");
elemUnitMoney.textContent = moneyIncrease;
setInterval(() => {
    money += moneyIncrease;
    elemMoney.textContent = money;
    localStorage.setItem("money", money);
    localStorage.setItem("moneyIncrease", moneyIncrease);
}, 1000);

// リセットボタン
let elemButtonReset = document.getElementById("js-button-reset");
elemButtonReset.onclick = ()=>{
    money = 0;
    moneyIncrease = 0;
    elemMoney.textContent = 0;
    elemUnitMoney.textContent = 0;
    localStorage.setItem("money", 0);
    localStorage.setItem("moneyIncrease", 0);
}