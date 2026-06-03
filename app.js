const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const btn=document.querySelector("form button")
const dropdowns =document.querySelectorAll(".dropdown select")

const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");


for(let select of dropdowns) {
    for(code in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=code;
        newOption.value=code;
        if(select.name==="from" && code==="USD"){
            newOption.selected="selected";
        } else if(select.name==="to" && code==="INR"){
            newOption.selected="selected";
        } 

        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag=(ele)=>{
    let currCode=ele.value;
    let countCode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countCode}/flat/64.png`;
    let img=ele.parentElement.querySelector("img");
    img.src=newsrc;
}
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
    }

    const fromCurrency = fromCurr.value.toLowerCase();  
    const toCurrency = toCurr.value.toLowerCase();      

    const URL = `${BASE_URL}/${fromCurrency}.json`;  


    try {
    let response = await fetch(URL);
    if (!response.ok) {
        msg.innerText = "Failed to fetch exchange rate.";
        return;
    }
    let data = await response.json();
    let rate = data[fromCurrency][toCurrency];
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } catch (error) {
    msg.innerText = "Error fetching data. Please try again.";
    console.error(error);
    }

}

btn.addEventListener("click", (evt) => {
evt.preventDefault();
updateExchangeRate();

});
window.addEventListener("load", () => {
updateExchangeRate();
});
