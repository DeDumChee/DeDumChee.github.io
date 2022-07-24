let bitCount = 0;
let silCount = 0;
let gallCount = 0;
let totalMoney = 0;
let bitHolder = document.getElementById('bronzeNumber').innerHTML;
let silHolder = document.getElementById('silverNumber').innerHTML;
let gallHolder = document.getElementById(`goldNumber`).innerHTML;


function canAfford(amount) {
    amount = Math.abs(amount);
    let bitWorth = bitCount;
    let silWorth = silCount*10;
    let gallWorth = gallCount*100;
    totalMoney = bitWorth + silWorth + gallWorth;
    if (amount <= totalMoney) {
        return(true);
    } else {
        return(false);
    }
}

function convertCurrency() {
    let silConvert = Math.floor(bitCount/10);
    let gallConvert = Math.floor(silCount/10);

    if (silConvert > 0) {
        silCount += silConvert;
        bitCount -= 10*silConvert;
        gallConvert = Math.floor(silCount/10);
    }

    if (gallConvert > 0) {
        gallCount += gallConvert;
        silCount -= 10*gallConvert;
    }

    if (bitCount < 0) {
        if (silCount > 0) {
            silCount -= 1;
            bitCount += 10;
        } else if (gallCount > 0) {
            gallCount -= 1;
            silCount += 9;
            bitCount += 10;
        } else {
            alert(`You can't afford that!`);
        }
    }
    
    if (silCount < 0) {
            gallCount -= 1;
            silCount += 10;
    }


    document.getElementById('bronzeNumber').innerHTML = bitCount;
    document.getElementById('silverNumber').innerHTML = silCount;
    document.getElementById('goldNumber').innerHTML = gallCount;
}

function manageBit(amount) {
    if (amount < 0) {
        if (canAfford(amount)) {
            bitCount += amount;
            convertCurrency();
        }
    } else {
        bitCount += amount;
        convertCurrency();
    }
}