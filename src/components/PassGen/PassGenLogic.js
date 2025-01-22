export default class PassGen {
  constructor() {
    this.previousPasswords = [];
    this.currentPointer = this.previousPasswords.length;
  }

  /**
   *
   * @returns {String:password}
   */
  gererate(length, checkState) {
    let generatedPass = "";
    const passLength = length;
    const checkedState = this.checkedState(checkState);
    const maxValue = checkedState.length - 1;
    if (maxValue < 0) return generatedPass;
    for (let i = 0; i < passLength; i++) {
      const randomNumber = this.getRandomNumber(0, maxValue);
      generatedPass += this[checkedState[randomNumber]]();
    }
    this.savePass(generatedPass);
    return generatedPass;
  }
  /**
   * save password
   * @param {String} generatedPass
   */
  savePass(generatedPass) {
    this.currentPointer = this.previousPasswords.length;
    this.previousPasswords.push(generatedPass);
    if (this.previousPasswords.length > 20) this.previousPasswords.shift();
  }

  /**
   *
   * @returns {array:String}
   */
  checkedState(checkState) {
    const checkedArr = [];
    checkState.uppercase && checkedArr.push("getRandomUpper");
    checkState.lowercase && checkedArr.push("getRandomLower");
    checkState.number && checkedArr.push("getRandomNumber");
    checkState.symbol && checkedArr.push("getRandomSymbol");
    return checkedArr;
  }
  /**
   * Random Uppercase Charecter
   * @returns {String}
   */
  getRandomUpper() {
    return String.fromCharCode(this.getRandomNumber(65, 90));
  }
  /**
   * Random Lowercase Charecter
   * @returns {String}
   */
  getRandomLower() {
    return String.fromCharCode(this.getRandomNumber(97, 122));
  }
  /**
   * Random Number Inbetween
   * @param {number,number}
   * @returns {Number}
   */
  getRandomNumber(from = 0, to = 9) {
    return Math.round(Math.random() * (to - from) + from);
  }
  /**
   * Random Symbol
   * @returns {String}
   */
  getRandomSymbol() {
    const symbols = "~`!@#$%^&*_-+;,?";
    return symbols[this.getRandomNumber(0, symbols.length - 1)];
  }
  // previous pass
  prev() {
    this.currentPointer -= 1;
    if (this.previousPasswords.length < 1 || this.currentPointer < 0) {
      this.currentPointer += 1;
      return;
    }
    return this.previousPasswords[this.currentPointer];
  }
  // next pass
  next() {
    this.currentPointer += 1;
    if (
      this.previousPasswords.length < 1 ||
      this.currentPointer > this.previousPasswords.length - 1
    ) {
      this.currentPointer -= 1;
      return;
    }
    return this.previousPasswords[this.currentPointer];
  }
}
