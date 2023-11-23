# 정보통신대학원 졸업논문시스템 프론트엔드

## 스택

- **Next.js**, app router 사용
  - 경로가 `/`면 `pages/index.tsx` -> `app/page.tsx`
  - 경로가 `/hello/3`이면 `pages/hello/[id].tsx` (또는 `.../[id]/index.tsx`) -> `app/hello/[id]/page.tsx`
  
## 컨벤션 변경사항

### 디렉토리 구조

- `@/components/common` -> `@/components`
- `@/components/page/hello` -> `@/app/...`: 이제 [이름이 소문자로 시작하는
  몇몇 이름의 특수한 파일들](https://nextjs.org/docs/app/building-your-application/routing#file-conventions)을
  제외하고는 어떤 이름이라도 경로에 노출되지 않습니다. 따라서 그냥 페이지
  폴더에 페이지와 밀접하게 관련된 컴포넌트도 같이 넣는 게 좋을 거 같았습니다.
- `@/utils`, `@/hooks`, `@/types` 삭제: 가능하면 의미있는 이름을 지어주세요.
  utility나 type는 의미가 아니라 유형으로 엮여있어서 어울리지 않다고
  생각했습니다. (물론 어떤 것들이 있을지 몰라서 미리 폴더를 만들어놓지
  않았으니, `@/api`처럼 폴더 이름을 잘 붙여주세요)
- `@/styles` 삭제: 스타일은 컴포넌트에 묶여있는 녀석입니다. 컴포넌트 폴더에
  같이 넣어주세요. 전역 스타일은 그냥 app 폴더에 넣는 게 어떨까요?

### 아키텍쳐

**UI 컴포넌트의 구분**

🚧 작업중...

- 우선 [Atomic Pattern](https://atomicdesign.bradfrost.com/chapter-2/)의 mental
  model을 약간 가져간다고 생각하면 좋을 것 같습니다.
- `atom`은 `Surface`, `Style`, `Span`처럼 분해할 수가 없고, 
