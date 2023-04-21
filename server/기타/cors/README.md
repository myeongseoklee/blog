# **CORS 정책을 고려한 API 작성하기**

진행하고 있는 프로젝트에서 인증/인가 로직에서 개선사항으로 refresh token을 cookie로 전송하기로 결정했다.

그런데 기능을 설계하던 중 문제가 생겼는데, 바로 CORS 정책 때문이었다.

현재 진행하고 있는 프로젝트의 client server와 api server는 도메인이 다르기 때문에 서로 쿠키를 주고받기 위해서는 CORS 정책을 잘 지켜줘야 한다.

그렇게 기본이라고 강조했던 CORS 정책인데. 막상 개발하려니 어렴풋하게만 알고 있다는 느낌이 들었고, 그전에 진행해온 프로젝트에서 CORS에 대해 크게 고려하지 않고 개발해왔었다는 생각이 들어 조금 부끄러웠다.

'CORS를 잘 모르면 삽질을 많이 하게 될 것이다.', 'BackEnd의 도움 없이 FrontEnd가 CORS를 해결하는 것은 불가능하다.'는 이야기를 들어왔던 터라, 이번 기회에 CORS 정책에 대해 정리하고 넘어가고자 한다.

특히 현재 진행중인 프로젝트의 주된 문제, **Cross-site 간 cookie 전송** 을 중점으로 다뤄보고자 한다.

> 본 글은 CORS에 대한 포스팅이기 때문에 이러한 결정을 하게 된 배경은 따로 [포스팅](https://growth-msleeffice.tistory.com/146) 해두었다.

<br />

---

## **CORS(Cross-Origin Resource Sharing)**

교차 출처 리소스 공유(Cross-Origin Resource Sharing, CORS)는 추가 HTTP 헤더를 사용하여, 한 출처에서 실행 중인 웹 애플리케이션이 다른 출처의 선택한 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제입니다. 웹 애플리케이션은 리소스가 자신의 출처(도메인, 프로토콜, 포트)와 다를 때 교차 출처 HTTP 요청을 실행합니다.

> 출처 : [MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)

<br/>

## **FrontEnd가 해야 할 일**

브라우저에서 **cross-site간 인증 정보를 포함한 요청(credentialed request)** 시, 브라우저는 브라우저가 제공하는 비동기 리소스 요청 API인 XMLHttpRequest나 fetch API 요청에서 별도의 옵션 없이 인증 정보(HTTP cookie와 HTTP Authentication)를 함부로 요청에 담지 않는다.

cross-site 요청에 인증과 관련된 정보를 담으려면 특정 플래그를 설정해야 하는데, 그것이 바로 (with)credentials 옵션이다.

따라서, cross-site간 fetch api 요청 시 credentials 옵션에 'include' 또는 axios 요청일 경우 withCredentials에 true 옵션을 주어야 한다.

하지만, 이 뿐만이 아니다. **브라우저는 preflight 요청이 필요 없는 simple request의 경우 Access-Control-Allow-Credentials : true 헤더가 없는 응답을 거부하고, preflight가 필요한 요청의 경우 preflight 응답에 Access-Control-Allow-Credentials : true 헤더가 없는 경우 본 요청에 대한 응답을 거부한다.** 따라서 호출된 리소스에 대한 응답을 브라우저는 제공하지 않는다.

> withCredentials 옵션은 총 3가지 값을 사용할 수 있다.
>
> same-origin(default) : 같은 출처 간 요청에만 인증 정보를 담는다.
>
> include : 모든 요청에 인증 정보를 담는다.
>
> omit : 모든 요청에 인증 정보를 담지 않는다.

참고로, CORS 관련 Request Header는 브라우저가 자동으로 지정하기 때문에 직접 개발자가 지정해줄 필요가 없다.

<br/>

## **BackEnd가 해야 할 일**

cross-site 간 리소스 공유 시, 브라우저는 credentials 모드가 include인 경우 모든 요청에 인증 정보를 담게 되므로, 서버는 응답 시, 모든 요청을 허용한다는 의미의 **Access-Control-Allow-Origin** 헤더에 \*(와일드카드)를 사용하면 안되고, 반드시 **명시적인 URL**을 지정해야 한다.

또한 응답 헤더에는 반드시 **Access-Control-Allow-Credentials : true**가 존재해야 한다,

### Response Header

📌 **Access-Control-Allow-Headers** : Access-Control-Request-Headers를 포함하는 preflight request의 응답에 사용되는 헤더로, 실제 요청때 사용할 수 있는 HTTP 헤더의 목록을 나열한다.

<br/>

📌 **Access-Control-Allow-Origin** : Access-Control-Allow-Origin 응답 헤더는 이 응답이 주어진 origin으로부터의 요청 코드와 공유될 수 있는지를 나타냅니다.

서버가 와일드 카드 대신에 하나의 origin을 지정하는 경우 서버는 Vary 응답 헤더에 Origin을 포함해야 한다.

<br/>

📌 **Access-Control-Allow-Methods** : 예비 요청에 대한 Response Header에 사용되며, 서버의 리소스에 접근할 수 있는 HTTP Method 방식을 지정한다.

자격 증명이 있는 요청에서는 와일드 카드를 사용하지 않고 구체적인 메소드를 적어주어야 한다.

<br/>

📌 **Access-Control-Expose-Headers** : cross-origin 요청에 대한 응답으로 브라우저에서 실행중인 스크립트가 사용할 수 있는 응답 헤더를 지정할 수 있다. 기본적으로 CORS 허용 목록에 포함된 응답 헤더만 노출된다. 클라이언트가 다른 헤더에 접근할 수 있도록 하려면 헤더를 나열해주어야 한다.

자격 증명이 있는 요청에서는 와일드 카드를 사용하지 않고 구체적인 헤더를 적어주어야 한다.

CORS 허용 목록에 포함된 응답 헤더 : Cache-Control / Content-Language / Content-Length / Content-Type / Expires / Last-Modified / Pragma

<br/>

📌 **Access-Control-Allow-Credentials** : credentials 플래그가 true일 때 요청에 대한 응답을 표시할 수 있는지를 boolean으로 나타냅니다.

<br/>

📌 **Vary** : 요청 메시지의 메서드 및 URL을 제외하고 응답 내용에 영향을 준 부분을 설명한다. 대부분 이 헤더는 콘텐츠 협상이 사용 중일 때 캐시 키를 생성하는 데 사용된다.

> Vary: User-Agent -> 이렇게 설정되어 있으면, 모바일 유저에게 데스크탑 유저를 위한 캐시 컨텐츠가 제공되지 않게 할 수 있다.

<br />

---

### **Cookie 설정**

또한 CORS 응답에 설정된 쿠키에는 일반적인 third-party cookie 정책이 적용된다.

따라서, cross-site간 cookie를 주고 받기 위해서는 **sameSite 속성을 'none'으로 변경하고 쿠키를 secure 쿠키**로 만들어 주어야 한다.

📌 **sameSite** : CSRF 공격을 방지하기 위한 설정이다. cross-site 요청에 대한 cookie 전송 정책을 결정할 수 있다.

Strict - 동일 사이트 요청에만 쿠키 전송

Lax(default) - Strict보다 완화된 정책으로 동일 사이트로의 redirect 요청이 발생하거나 페이지가 이동할 때, "안전한" HTTP 메서드를 사용한 cross-site 요청, 그리고 동일 사이트 요청에 쿠키를 전송한다. 안전한 http 메서드라 함은 Get을 사용하는 요청 중 앵커태그(\<a href>), form의 get 메소드(\<form method=get>) 등을 말함.

None - sameSite를 검증하지 않는 정책

> 출처 : https://www.hahwul.com/2020/01/18/samesite-lax/

<br/>

📌 **secure** : https 프로토콜을 사용한 요청에만 쿠키를 전송.

<br/>

📌 **domain** : domain은 쿠키를 수신할 수 있는 host를 지정한다. 도메인이 지정되지 않으면 현재 문서 URI를 기준으로 적용되며 서브도메인을 포함하지 않는다. 따라서 도메인을 지정해야 서브도메인들이 항상 포함되므로 도메인을 명시하는 것이 좋다.

<br/>

📌 **path** : cookie 헤더를 전송하기 위하여, 요청된 url 내에 반드시 존재해야 하는 url 경로이다. 간단히, domain의 하위 url 정도로 생각하면 된다.

<br/>

📌 **httpOnly** : XSS 공격을 방지하기 위한 설정이다. httpOnly 쿠키는 자바스크립트의 Document.cookie API로 접근할 수 없고, 서버에게 전송되기만 한다.

<br/>

---

## **예시 코드**

```js
// 아래 코드는 예시 코드로, 실제 프로젝트의 코드와는 다릅니다.

// main.ts
async function bootstrap() {

  const app: NestExpressApplication = await NestFactory.create(AppModule);
  // other something...
  app.enableCors({
      origin: `https://${process.env.CORS_ORIGIN}`,
      methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'OPTIONS'],
      credentials: true,
  })
  // other something...
  await app.listen(PORT);
}
bootstrap()

// auth.controller.ts
const login = (req, res) => {
  // do something...
  const refreshToken = this.authService.getCookieWithRefreshToken();

  await this.userService.saveRefreshToken(refreshToken, userId);

  res
    .cookie('x_auth', refreshToken, {
      domain: `https://${process.env.CORS_ORIGIN}`,
      path: '/',
      httpOnly: true,
      maxAge: Number(jwtConstants.jwtRefreshExpiresIn) * 1000,
      sameSite: 'none' as const,
      secure: true,
      signed: true,
    })
    .json({ success: true });
};
```

<br />

> 출처 :
>
> > [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
> >
> > [CORS는 왜 이렇게 우리를 힘들게 하는걸까?](https://evan-moon.github.io/2020/05/21/about-cors/#sopsame-origin-policy)
