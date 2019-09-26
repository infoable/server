const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

module.exports = {
  url: "https://www.naver.com",
  actions: ["스포츠 뉴스", "실시간 검색어"],
  actionIds: {
    스포츠뉴스: "sportsNews",
    실시간검색어: "trends"
  },
  execute: {
    trends: async function(query) {
      const r = await axios("https://www.naver.com");
      const $ = cheerio.load(r.data);

      let keywords = $(
        ".PM_CL_realtimeKeyword_rolling_base > .ah_roll_area > .ah_l > .ah_item"
      )
        .map(function(idx, el) {
          return $(this).text();
        })
        .get();
      return `실시간 검색어입니다. ${keywords.join(" ")}`;
    },
    sportsNews: async function() {
      const r = await axios({
        url: "https://sports.news.naver.com/index.nhn",
        method: "get",
        responseEncoding: null
      });

      const $ = cheerio.load(r.data);
      const headline = '"' + $(".main_headline > a").attr("title") + '"';
      if (headline.match(/^\[.+?중계\]$/)) headline = null;
      const news = $(".main_headline > ul.main_headline_small > li > a")
        .map(function(idx, el) {
          return '"' + $(this).attr("title") + '"';
        })
        .get();

      return `오늘 스포츠 뉴스입니다. ${[headline, ...news]
        .filter(e => e)
        .join(", ")}`;
    }
  }
};
