function calculateNumber(var1, var2) {
  return Math.round(var1) + Math.round(var2);
}

function testCalculateNumber() {
  const a = 1;
  const b = 2;
  console.log(calculateNumber(a, b));
}

function returnRandomNumberBetween1and100() {
  return Math.floor(Math.random() * 100) + 1;
}