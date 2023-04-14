# **let's Git it 프로젝트 회고**

let's Git it은 현재(2023년 4월 기준) 운영 중이며, 실제 사용자의 피드백(버그, 의견 등)를 받아 서비스를 개선하고 있습니다.
프로젝트 운영을 시작한 지 한 달이 지나서야 회고를 작성합니다.

처음 프로젝트를 기획할 당시 저는 유저들의 사용자 기반의 피드백을 받고, 서비스를 개선하는 경험을 하고 싶었습니다.
그러려면 사용자가 가볍고 재미있게 이용해볼 수 있으면서 나름의 의미 있는 서비스를 기획하고자 했습니다.

이러한 기획 의도 아래 let's Git it이 탄생하게 되었습니다.

<br />

## 📌 let's Git it 소개

let's Git it은 **개발 동기부여를 위한 깃허브 랭킹 서비스**입니다. 랭킹 산출에 필요한 데이터는 Github 유저들의 사용 데이터(pr, commit, fork, star 등) 14가지를 기반으로 점수를 산출하여 랭킹을 제공하고 있습니다.

주요 기능으로는 Top 100 ranker의 목록과 자신의 랭킹과 티어 검색 및 지표 분석 제공, 랭킹 및 지표를 타인과의 비교할 수 있는 기능, 그리고 개발 관련 질문과 사이드 프로젝트, 채용 정보 등을 공유할 수 있는 커뮤니티 게시판이 있습니다.

- [let's GIT it 바로가기](https://let-s-git-it.vercel.app/)

![시연영상](./images/%EC%8B%9C%EC%97%B0%EC%98%81%EC%83%81.gif)

<br />

📆 2023.01.11 ~ 2023.03.02 <br />

## 📌 담당역할

### Auth API 개발

- Github oauth 2.0 기반 인증 API, JWT access token을 이용한 인가 API 개발
  - XSS, CSRF 공격에 대한 보안을 위해 access token을 client private 변수로 사용, refresh token을 httpOnly secure cookie로 발행
- 유저의 활동 정보(post, comment 관련)를 담은 user 객체 반환하는 권한 부여 로직 개발(guard, strategy)
- accessToken 재발급, 로그아웃 API 개발

### Comment API 개발

- depth, groupOrder attribute를 활용한 게시판 댓글/대댓글 CRUD API 개발
- 게시판 댓글/대댓글 좋아요 생성/삭제 API 개발

### User API 개발

- 마이페이지 조회/수정 API 개발

### Database schema 설계

![ERD]()

### 공통

- 컨트롤러, 서비스, 레포지토리 레이어의 Unit test 작성
- httpExceptionFilter 작성
- Swagger를 활용한 API 문서 작성

### DevOps

- AWS infrastructure 구축
- CI/CD 파이프라인 구축

<br />

## 📌 Stack

<br />

## 배운 점

## 아쉬운 점

- 엔티티 중심으로 모듈이 구성된 것. 도메인 단위로 구성되었다면 좋았겠다.
- 무한 댓글로직을 하지 못한 것. 댓글의 대댓글의 대댓글
- comment 엔티티를 효율적으로 설계 못한 것 같은 느낌? 아직은 느낌인데, 어트리뷰트 수를 최소화 하려고 설계 했는데 설계하고 나니 댓글과 대댓글을 가져오는 쿼리가 복잡해짐. 일단 이건 테스트를 해봐야 알 수 있을듯.

## 개선 사항

- 브라우저와 서버 통신 간 보안 향상을 위해 HTTPS로 EC2 도메인 연동
- API 문서 관리 효율을 위해 Swagger 도입
- XSS, CSRF 공격에 대한 보안을 위해 access token을 client private 변수로 사용, refresh token을 httpOnly secure cookie로 발행

  - 배운 것

    - XSS, CSRF 공격에 대한 개념
    - cookie와 local storage, jwt 토큰에 대한 개념
    - 이것들로 access token과 refresh token의 lifecycle을 설계
    - 그런데 이러한 것들을 클라우드 서버 환경에 적용하려니 쉽지 않았음 특히, CloudFront!!!
    - aws route53 : https://bosungtea9416.tistory.com/entry/AWS-Route-53%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EB%8F%84%EB%A9%94%EC%9D%B8-%EC%83%9D%EC%84%B1-%EB%B0%8F-%EC%97%B0%EA%B2%B0?category=955613
    - aws cloudfront 서버 : https://bosungtea9416.tistory.com/31?category=955613
    - aws certificate manager : https://bosungtea9416.tistory.com/entry/AWS-CloudFront%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-HTTPS-%EC%A0%81%EC%9A%A9

  - 이 세 가지 클라우드 서비스의 아키텍쳐가 위의 로직을 구현하는데 큰 허들이었고, 허들을 넘는 과정에서 수많은 트러블 슈팅이 있었음

    - 일단 cloudfront를 배포하고 나서는 배포 되기까지의 시간이 꽤 걸리는데, 그 새를 참지 못하고 여러가지를 계속 수정해대서 수정한 것들이 제대로 수정한 것인지 확인하는 것이 어려웠음. -> 공식문서에 보니까 기다리라고 하더라..
    - 어려웠던 것이 정책작업 부분.

      - 캐시키 제어(Cache policy)와 오리진 요청 제어(origin request policy) : 헤더와 쿠키 부분이 중요. 리프레쉬 토큰으로 엑세스 토큰 요청할 때나 인가가 필요한 작업에서 요청 헤더의 cookie와 authorization에 접근할 수 있어야 하는데 헤더와 쿠키 부분에 캐시 키 제어 정책을 '없음'으로 해서 클라이언트 요청에 있는 것들이 cloudfront에서 걸러져서 오리진 서버로 오지 않음... 잘 알고 설정해야함... 그런데 나는 엣지 로케이션에 캐싱하는 기능을 사용할 생각은 일단 없어서 Legacy cache settings를 선택해서 '모두'를 사용했다.

      - 응답 헤더 추가 또는 제어 : 처음에는 이 부분을 굉장히 오해를 했는데, 오리진 서버에서 내보내는 응답에 있는 cookie가 cloudfront에 걸러져서 나가는 줄 알았다. 그리고 signed URI나 signed Cookie에 대한 문서를 먼저 보게 되어서 해당 내용을 적용 해야 cookie가 나가는 줄알았다. 그런데 그런것은 아니고 cors와 관련된 설정들을 그냥 cloudfront에서 처리할 수 있는 기능이었다. 아직 개발 서버에서 리프레시 토큰이 나가는지 확인은 안되엇는데 일단 응답 헤더정책을 적용하지 않더라도 오리진의 응답 헤더가 그대로 나가는 것으로 문서를 읽어봤을땐 이해했었다. 만약 그게 아니라면 응답헤더를 정책을 만들어야 할 것 같다.

    - 그 다음 어려웠던 것이 [cloudfront에서 https 사용](https://docs.aws.amazon.com/ko_kr/AmazonCloudFront/latest/DeveloperGuide/using-https.html)

      - 처음에는 elb와 route53 CM으로만 하면 되는 줄 알았는데, 우리 프로젝트는 elb 대신 cloudfront를 사용하고 있었다. 몰랐네;
      - 처음 보는 주소들.. 원본 이름, 원본 도메인, 오리진, [대체 도메인](https://docs.aws.amazon.com/ko_kr/AmazonCloudFront/latest/DeveloperGuide/CNAMEs.html) 비슷해 보이는데 의미가 다른 용어들, 잊고 있었던 CNAME, A 등등 여러가지 개념들이 복합적으로 밀려들어와서 Route53 레코드를 넣는 것부터 애먹었다. 주소들을 넣고나서 **반복적인 리디렉션 문제**가 발생하기도 하고 **502, 504, 403**에러들이 계속 발생했다. 어느 순간에는 요청에 응답이 30초씩 걸리기도 했는데, 이건 정확한 원인은 모르겠다.
      - 그래도 다행인 것은 route53 -> cf -> elb 구조로 비교적 쉽게 로드밸런싱을 추가할 수 있어서 괜찮을 것 같다. 그리고 보통 elb 앞에 cf를 많이 넣는다고 한다. 지금은 잘 못하지만 엣지 로케이션에 캐싱하는 것을 좀 학습해서 사용하면 캐싱 기능이 매우 강력하기 때문에 cf를 많이 넣는단다. 아직 우리는 도입만 해보는 단계이다 보니 처음에 캐싱이 되어서 db 데이터가 수정되어도 응답데이터가 안변해가지고... 적잖이 놀랐어서 캐싱 기능을 운영서버에서도 꺼놓은 상태이다..;

    - 트러블 슈팅에 참고한 자료 :
      - https://docs.aws.amazon.com/ko_kr/AmazonCloudFront/latest/DeveloperGuide/troubleshooting-response-errors.html
      - https://repost.aws/ko/knowledge-center/custom-origin-cloudfront-fails
      - https://repost.aws/ko/knowledge-center/cloudfront-domain-https
      - https://repost.aws/ko/knowledge-center/cloudfront-x-cachemiss-error
      - https://developer.mozilla.org/ko/docs/Web/HTTP/Headers

  - 사용한 툴
    - DNS CHECKER(DNS Test) : https://dnschecker.org/#A
    - SSL Labs(SSL Server Test) : https://www.ssllabs.com/ssltest
    -
  -

- (예정) 에러 로깅 시스템 구축
- (예정) DB 쿼리 성능 최적화
- (예정) 클린 코드, 클린 아키텍처 적용

## 📌 Collaboration Tools

<div display:inline>
<img src="https://img.shields.io/badge/Trello-0052CC?style=flat&logo=Trello&logoColor=white"/>
<img src="https://img.shields.io/badge/Notion-0052CC?style=flat&logo=Notion&logoColor=white"/>
<img src="https://img.shields.io/badge/Slack-4A154B?style=flat&logo=Slack&logoColor=white"/>
</div>

<br />

## 📌 BE Technical Stacks

### 💻 언어

<div display:inline>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"/>
</div>

### 💻 Frameworks & DB

<div display:inline>
<img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=Node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=NestJS&logoColor=white"/>
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white"/>
</div>

### 💻 Cloud Service & CI/CD

<div display:inline>
<img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=flat&logo=Amazon EC2&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazon RDS-527FFF?style=flat&logo=Amazon RDS&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazon S3-569A31?style=flat&logo=Amazon S3&logoColor=white"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=Docker&logoColor=white"/>
<img src="https://img.shields.io/badge/Github Actions-2088FF?style=flat&logo=GithubActions&logoColor=white"/>
</div>

<br>
