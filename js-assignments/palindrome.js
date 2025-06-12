function isPalindrome(str) {
    const lowercaseStr = str.toLowerCase();
    const filteredStr = lowercaseStr.split('').filter((char) => (char !== '?' && char !== ' ' && char !== '!' && char !== '.' && char !== ',')).join('');
    const reversedStr = filteredStr.split('').reverse().join('');
    return filteredStr === reversedStr;
  }

console.log(isPalindrome("jimij"))