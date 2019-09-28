# API

## GET /api/list

### 요청 예시

URL

```
/api/list?host=www.naver.com
```

### 응답 예시

```json
{
  "success": "true",
  "actions": ["뉴스로 이동", "실시간 검색어"]
}
```

사이트를 호스트로 주면, 그 사이트에서 사용할 수 있는 액션을 응답합니다.

### 요청 방법

URL query에 사이트의 호스트를 적습니다.

## /api/:action_name

Action의 이름을 통해 액션을 어떻게 실행해야 할지가 적혀있는 데이터를 가져 옵니다.

### 요청 예시

```
/api/뉴스로 이동?host=www.naver.com
```

### 응답 예시

```json
{
  "success": true,
  "data": {
    "name": "뉴스로 이동",
    "works": [
      {
        "type": "redirect",
        "to": "https://news.naver.com/"
      }
    ]
  }
}
```

### 응답

- `name` - 응답 데이터의 이름입니다. (action_name과 동일함)
- `works` - 실행해야 할 동작들입니다.
- `works.type` - 실행해야 할 동작의 종류입니다. (현재 `to`로 리다이텍트 시키는 `redirect`와 `selector`를 선택해서 읽는 `read`가 있습니다.)

## GET /api/site/:site_name

Visiable 서버에 저장된 `site_name`의 `host`를 가져 옵니다.

### 요청 예시

```
/api/site/네이버
```

### 응답 예시

```json
{
  "success": true,
  "host": "www.naver.com"
}
```
