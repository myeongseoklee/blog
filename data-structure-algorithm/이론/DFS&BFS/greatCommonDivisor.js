function gcd(num1, num2) {
  const remain = num1 % num2;
  if (remain === 0) return num2;

  return gcd(num2, remain);
}

console.log(gcd(192, 162)); // 6
