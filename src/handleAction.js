const User = require("../src/User");

const matches = [
  {
    test: /안녕( Able)?/g,
    exec: () => "Able에 오신 것을 환영합니다. 무엇을 도와드릴까요?"
  },
  {
    test: /접속(하고 있는)? 사이트/g,
    exec: whereIAm
  },
  {
    test: /^(.+?)에? 접속$/,
    exec: connect
  },
  {
    test: /(.+)(액션)? 실행$/,
    exec: executeAction
  },
  {
    test: /액션/g,
    exec: availableActions
  }
];

const sites = {
  네이버: require("./_naver")
};
/**
 * @param {string} query
 * @param {User} user
 */
function connect(query, user) {
  const goto = query.replace(/^(.+?)에? 접속$/, "$1");
  if (!sites[goto]) {
    return "사이트에 대한 정보가 없습니다.";
  }
  user.currentPage = sites[goto].url;
  return `${goto}에 접속합니다.`;
}
function availableActions(query, user) {
  const actions = sites["네이버"].actions;
  return `현재 사이트에서 ${actions.join(", ")} 액션을 실행하실 수 있습니다.`;
}
function whereIAm(query, user) {
  if (!user.currentPage) {
    return "접속하고 있는 사이트가 없습니다.";
  }
  return `${user.currentPage}에 접속하고 있습니다.`;
}
async function executeAction(query, user) {
  const action = query.replace(/(.+?)액션? 실행$/, "$1");
  const Id = sites["네이버"].actionIds[action.replace(/ /g, "")];
  console.log(Id);
  if (!Id) {
    return "실행할 수 있는 액션이 아닙니다.";
  }
  return await sites["네이버"].execute[Id](query);
}

/**
 * @param {string} query
 * @param {User} user
 */
module.exports = async (query, user) => {
  query = query
    .replace(/(해줘|해 줘|알려 줘|알려줘|이?야)(\?)?$/, "")
    .replace(/^(에이블|Able)[,]?/, "");

  for (const m of matches) {
    if (query.match(m.test)) {
      return await m.exec(query, user, m.test);
    }
  }
  return "무슨 말인지 모르겠습니다.";
};
