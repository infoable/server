class UniqueError extends Error {
  constructor(col) {
    super(
      col ? "이미 존재하는 " + col + "입니다." : "이미 존재하는 항목입니다."
    );
    this.expose = true;
    this.status = 422;
  }
}

module.exports = UniqueError;
