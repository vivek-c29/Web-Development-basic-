const BASE_URL =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg=document.querySelector(".msg");

window.addEventListener("load",()=>{
    updateExchangeRate();
});

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);

    }
    select.addEventListener("change", (evt) => {
        updateFlage(evt.target);
    })
}

const updateFlage = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate= async()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }
    fromCurrVal=fromCurr.value.toLowerCase();
    toCurrVal=toCurr.value.toLowerCase();

    const URL = `${BASE_URL}/${fromCurrVal}.json`;
    // console.log(URL[fromCurrVal][toCurrVal]);
    let response = await fetch(URL);
    console.log(response);
    let data=await response.json();
    let rate=data[fromCurrVal][toCurrVal];
    console.log(rate);
    console.log(amtVal);
    let finalAmount=amtVal*rate;
    console.log(finalAmount);
    msg.innerText=(`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`);
}