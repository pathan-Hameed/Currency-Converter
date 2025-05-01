const BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn");

const msg = document.querySelector("#msg");

console.log(dropdown);
for (let select of dropdown) {
  for (conCurr in countryList) {
    // console.log(conCurr);
    const newOption = document.createElement("option");
    newOption.innerText = conCurr;
    newOption.value = conCurr;
    if (select.name === "from" && conCurr === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && conCurr === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let conCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${conCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const updatExRate = async () => {
  let amountInput = document.querySelector(".amount input");
  let amountVal = amountInput.value;
  if (amountVal === "" || amountVal < 1) {
    amountVal = 1;
    amountInput.value = "1";
  }

  const fromCurr = document.querySelector(".from select").value.toLowerCase();
  const toCurr = document.querySelector(".to select").value.toLowerCase();

  const URL = `${BASE_URL}/${fromCurr}.json`;

  try {
    const response = await fetch(URL);
    const data = await response.json();

    // The exchange rate from `fromCurr` to `toCurr`
    const rate = data[fromCurr][toCurr];
    const convertedAmount = (rate * amountVal).toFixed(2);

    msg.innerText = `${amountVal} ${fromCurr.toUpperCase()} = ${convertedAmount} ${toCurr.toUpperCase()}`;
  } catch (error) {
    msg.innerText = "Something went wrong. Please try again.";
    console.error(error);
  }
};

btn.addEventListener("click", async (event) => {
  event.preventDefault();
  updatExRate();
});

window.addEventListener("load", () => {
  updatExRate();
});
