# API

## POST /req

요청 예시

```json
{
  "query": "현재 페이지에서 뉴스 읽어줘",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

응답 예시

```json
{
  "text": "현재 페이지의 뉴스입니다.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRGUiLCJpYXQiOjE1MTYyMzkwMjJ9.1bxegY2QzMgmi4VjfhxtumdUCSGl8ohztW8878wScAA",
  "action": {
    "type": "read",
    "selector": "article.main .news"
  }
}
```

### 요청

- `query`: 사용자가 음성인식을 통해 말한 요청문 |
- `token`: 이전에 저장해 두고 있던 토큰. (권장, 없다면 공백) |

### 응답

- `text`: 서버에서 응답한 메세지. (대답)
- `token`: 서버에서 가져온 토큰. 업데이트 되는 경우가 많으니 받자마자 저장할 것.
- `action`: 클라이언트에서 실행할 동작
  - `type`: 클라이언트에서 실행할 동작의 유형
    - "read": 페이지의 `selector`로 선택한 엘리먼트를 읽습니다.
  - `selector`: 페이지의 엘리먼트 선택
