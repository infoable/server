class RequiredNotExist extends Error {
  constructor(col) {
    this.expose = true;
    this.message = col ? col + " 항목이 없습니다." : "필수 항목이 없습니다";
    this.status = 400;
  }
}

module.exports = RequiredNotExist;
