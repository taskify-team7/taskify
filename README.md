# 코드잇 FE 4기 중급 프로젝트 7팀

## Taskify

[Taskify 사용하하러 가기](https://taskify-two-gray.vercel.app/)

## Authors

- [Byeong Hyeon Yun](https://www.github.com/78-artilleryman)
  - 팀장
  - 모달 구현
  - PWA 작성
  - GA와 Sentry 연결
- [Jueon An](https://www.github.com/vinoankr)
  - 유저 기능 전반
  - 레이아웃 및 라우팅
  - 카드 드래그 앤 드롭 구현
- [Lee jin woo](https://www.github.com/yeeZinu)
  - 공용 컴포넌트 작성
  - My Page 구현
  - 대쉬보드 관리 및 수정,삭제 구현
- [Ryu Gwang Hyeon](https://www.github.com/RyuGwangHyeon)
  - 랜딩페이지 작성
  - 404 에러페이지 작성
  - Loading 구현

## Tech Stack

![](https://img.shields.io/badge/React-000000?logo=React)
![](https://img.shields.io/badge/Typescript-000000?logo=Typescript)
![](https://img.shields.io/badge/Module_CSS-000000?logo=cssmodules)
![](https://img.shields.io/badge/React_Query-000000?logo=reactquery)
![](https://img.shields.io/badge/Setnry-362D59?logo=sentry)
![](https://img.shields.io/badge/Google_Analytics-E37400?logo=googleanalytics)

## 기능 구현

### 1. 로그인 & 회원가입 기능

Taskify의 모든 기능과 혜택을 이용하려면 로그인 또는 회원가입이 필요합니다. 아직 회원이 아니신가요? 걱정 마세요! 아래의 단계를 따라 쉽게 가입하실 수 있습니다.
![Untitled](https://github.com/taskify-team7/taskify/assets/86054169/6c31dcac-af7b-42b3-aacd-1b82ae478089)

### 2. 할일 목록 생성 및 관리

"Taskify를 이용하여 할 일을 작성하는 방법을 설명해 드릴게요. 먼저, 할 일의 내용을 간단하게 작성하세요. 그 다음으로는 해당 할 일과 관련된 태그를 선택하고, 
이 작업을 수행할 담당자를 지정하세요. 마지막으로는 할 일의 마감 시간을 선택하고, 이 정보들을 확인한 후에 할 일을 생성하시면 됩니다. 
이렇게 생성된 할 일은 당신의 일정에 자동으로 추가됩니다.

![할일생성움짤](https://github.com/taskify-team7/taskify/assets/86054169/860be98c-3e2f-4ba5-b36b-dc89665109b1)

### 3. 할 일 드래그 앤 드롭 기능

원하시는 할 일을 원하시는 컬럼으로 자유롭게 이동이 가능합니다.
(단 이동된 할 일들은 생성된 날짜가 빠른 순서로 자동 정렬이 되는 점 참고 바랍니다.)

![화면 기록 2024-04-30 오후 11 28 29](https://github.com/taskify-team7/taskify/assets/86054169/68242050-bd21-459f-8ccb-4c147b59d0d8)

### 4. 개인 및 팀 프로젝트에 대한 협업 기능

Taskify의 대시보드는 팀원들과의 협업을 간편하게 할 수 있는 기능을 제공합니다. 각 대시보드에는 구성원을 초대하여 함께 작업하고 일정을 공유할 수 있습니다. 
더불어, 구성원 관리와 초대 내역 관리도 손쉽게 할 수 있습니다. 이를 통해 팀원들과의 협업을 효율적으로 관리할 수 있습니다.

![Untitled (1)](https://github.com/taskify-team7/taskify/assets/86054169/98d3b83d-c6f4-4062-9876-ec93ef345362)

### 5. 회원정보 수정

Taskify에서는 사용자들이 자신의 프로필을 원하는 대로 개인화할 수 있습니다. 사용자는 자신의 닉네임과 프로필 이미지를 선택하여 변경할 수 있습니다. 
더불어, 비밀번호도 필요에 따라 언제든지 변경할 수 있습니다. 다만, 이메일은 현재 변경이 불가능합니다. 
이를 통해 사용자들은 자신의 계정을 더욱 편리하게 관리할 수 있습니다.”

마이페이지 가는 방법 ✨
상단에 프로필 클릭 → 마이페이지 버튼 클릭

![Untitled (2)](https://github.com/taskify-team7/taskify/assets/86054169/a0670b7c-a386-4ec1-93ba-8876e00ac0ca)

### 6. 애플리케이션 다운로드

Taskify는 편리하게 모바일 기기에 설치하여 사용할 수 있습니다. URL을 입력하지 않고도 Taskify에 더 빠르게 액세스하고 싶으신가요? 그렇다면 아래의 단계를 따라 Taskify를 다운로드하고 설치하세요.

#### 웹사이트(크롬)
상단에 다운로드 버튼 클릭

<img width="867" alt="스크린샷 2024-05-01 오전 12 21 42" src="https://github.com/taskify-team7/taskify/assets/86054169/55e42b8a-1fd0-4750-8476-c3dcdedcba48">


#### 아이폰

1. 사파리로 서비스 접속(서비스 URL https://taskify-two-gray.vercel.app/)
2. 사파리 하단에 있는 공유버튼 클릭
3. 클릭 후 아래도 드래그하여 “홈 화면에 추가” 메뉴 클릭

![image](https://github.com/taskify-team7/taskify/assets/86054169/0d82f94b-b86e-4824-a8be-99db65a4f0e6)

#### 안드로이드

1. Android 기기에서 Chrome 을 엽니다.
2. 설치하려는 PWA가 있는 웹사이트로 이동합니다.
3. **설치**를 탭합니다.
