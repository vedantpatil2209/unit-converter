// Select elements
const inputValue = document.querySelector("#inputValue");
const category = document.querySelector("#category");
const startUnit = document.querySelector("#startunits");
const targetUnit = document.querySelector("#targetunits");
const convertButton = document.querySelector("#convertButton");
const result = document.querySelector("#result");


const units = {
    length: {
        m: 1,
        km: 1000,
        cm: 0.01
    },
    weight: {
        g: 1,
        kg: 1000,
        lb: 453.592
    },
    temperature: ["c", "f", "k"]
};


function updateUnits() {
    const selectedCategory = category.value;

    startUnit.innerHTML = "";
    targetUnit.innerHTML = "";

    if (selectedCategory === "temperature") {
        const tempUnits = ["c", "f", "k"];

        tempUnits.forEach(unit => {
            startUnit.innerHTML += `<option value="${unit}">${unit.toUpperCase()}</option>`;
            targetUnit.innerHTML += `<option value="${unit}">${unit.toUpperCase()}</option>`;
        });

    } else {
        const selectedUnits = units[selectedCategory];

        for (let unit in selectedUnits) {
            startUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
            targetUnit.innerHTML += `<option value="${unit}">${unit}</option>`;
        }
    }
}


category.addEventListener("change", updateUnits);


updateUnits();


convertButton.addEventListener("click", function () {
    const value = parseFloat(inputValue.value);

    if (isNaN(value)) {
        result.innerText = "Please enter a valid number";
        return;
    }

    const from = startUnit.value;
    const to = targetUnit.value;
    const selectedCategory = category.value;

    let finalValue;

    
    if (selectedCategory === "temperature") {

        let tempInC;


        if (from === "c") tempInC = value;
        else if (from === "f") tempInC = (value - 32) * 5 / 9;
        else if (from === "k") tempInC = value - 273.15;


        if (to === "c") finalValue = tempInC;
        else if (to === "f") finalValue = (tempInC * 9 / 5) + 32;
        else if (to === "k") finalValue = tempInC + 273.15;

    } else {

        const baseValue = value * units[selectedCategory][from];
        finalValue = baseValue / units[selectedCategory][to];
    }


    finalValue = finalValue.toFixed(4);

    result.innerText = `Result: ${finalValue} ${to}`;
});