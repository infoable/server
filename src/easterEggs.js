function randomPicker(arr) {
  let i = Math.floor(Math.random() * arr.length);
  return arr[i];
}

module.exports = [
  {
    test: /(제작진|크레딧|제작자|개발자|제작)/g,
    exec: () => "모바일 개발 정찬효, 서버 및 웹 개발 김도영, 디자인 곽승채"
  },
  {
    test: /끝말잇기/g,
    exec: () => {
      const words = ["기둥돓", "수산화바륨", "터븀", "나트륨", "역추진로켓"];

      return `끝말잇기요? 좋아요. 제가 먼저 하죠. ${randomPicker(words)}`;
    }
  }
];
