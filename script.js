const cashRegister = (price, cash, cid) => {

  const currencyObj = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.10,
    "QUARTER": 0.25,
    "ONE": 1.00,
    "FIVE": 5.00,
    "TEN": 10.00,
    "TWENTY": 20.00,
    "ONE HUNDRED": 100.00
  }

  //1. cash is less than price
    if (cash < price) {
            return {
            status: "INCORRECT_PAYMENT",
            change: []
        }
    }
//********************************

  let cidTotal = 0;
  for (let element of cid) {
    cidTotal += element[1];
  }
  cidTotal = cidTotal.toFixed(2);
  // cidTotal (in cash register) === 335.41

  let changeNeeded = (cash - price);
  let answer = [];

  //2a. cid (cash-in-drawer) is less than the change due
  if (changeNeeded > cidTotal) {
    return { status: "INSUFFICIENT_FUNDS", change: answer };

//********************************

  //3. If cid is exactly equal to the change due.
  } else if (changeNeeded.toFixed(2) === cidTotal) {
    return { status: "CLOSED", change: cid };

    
  //4a. & 4b. All other cases: change due is less than the total cid, and exact change can be made
  } else {
    cid = cid.reverse();
    for (let innerArr of cid) {
      let current = [innerArr[0], 0];
      // current === ['Quarter', 0]

      // We want 0.50 change. if 0.50 >= 0.25 (quarter in currencyObj) 
      // && the cid element (quarter) has enough in the cashRegister (example has 4.25)
      while (changeNeeded >= currencyObj[innerArr[0]] && innerArr[1] > 0) {
        current[1] += currencyObj[innerArr[0]];
        innerArr[1] -= currencyObj[innerArr[0]];
        changeNeeded -= currencyObj[innerArr[0]];
        changeNeeded = changeNeeded.toFixed(2);
      }
      if (current[1] > 0) {
        answer.push(current);
      }
    }
  }

  //2b. Cannot return the exact change
  if (changeNeeded > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

    answer = answer.reverse()
  return { status: "OPEN", change: answer};
}

// Example function call
console.log(cashRegister(19.5, 20, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
]));
