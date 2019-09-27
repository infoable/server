class RequiredNotExist extends Error {
  constructor(col) {
    super(col ? col + " 항목이 없습니다." : "필수 항목이 없습니다");
    this.expose = true;
    this.status = 400;
  }
}

module.exports = RequiredNotExist;
