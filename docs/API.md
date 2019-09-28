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
