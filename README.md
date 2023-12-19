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
  참고로 `/app/` 안에 _로 시작하는 폴더 안에 있는 모든 것들은 무시됩니다.
- `@/utils`, `@/hooks`, `@/types` 삭제: 가능하면 의미있는 이름을 지어주세요.
  utility나 type는 의미가 아니라 유형으로 엮여있어서 어울리지 않다고
  생각했습니다. (물론 어떤 것들이 있을지 몰라서 미리 폴더를 만들어놓지
  않았으니, `@/api`처럼 폴더 이름을 잘 붙여주세요)
- `@/styles` 삭제: 스타일은 컴포넌트에 묶여있는 녀석입니다. 컴포넌트 폴더에
  같이 넣어주세요. 전역 스타일은 그냥 app 폴더에 넣는 게 어떨까요?

### 아키텍쳐

**UI 컴포넌트의 구분**

🚧 아래의 가이드는 다른 대형 프로젝트에 적용하는 게 어떨까요.. 이걸 다
적용하기에는 그렇게 규모가 크지 않은 것 같아요

- 우선 [Atomic Pattern](https://atomicdesign.bradfrost.com/chapter-2/)의 mental
  model을 약간 가져간다고 생각하면 좋을 것 같습니다.
- **atom**은 `Surface`, `Style`, `Span`처럼 분해할 수가 없고, 어떤 UI를 만들 때
  보통 직접 사용하기 힘든 요소들을 담고 있다고 생각하면 됩니다.

  * atom은 화면 상에서 명확하게 구분하기 어럽습니다. 대신, 추상적으로 React 계층
    상에서 작용한다고 보면 됩니다.
  
- **molecule**은 `Button`, `TextInput`, `Checkbox`, `Dropdown`처럼 기존에 페이지를
  만들 때 쓰는 요소들에 해당하는데, 중요한 조건은 molecule 한 개가 단 하나의
  역할만을 가지게 된다는 것입니다. 추가적으로, 이 molecule은 화면 상에서도 쪼갤
  수 없어야 합니다. 손으로 위의 버튼이나 체크박스같은 컴포넌트의 반을 가리면
  어색해지거나, 그 기능이 온전하지 않아집니다.

  * molecule까지는 무조건 stateless해야 합니다. 물론 너무 쓰기 귀찮은 prop의
    경우 param을 선택적으로 받게 하고, param이 `undefined`면 저장한 state로
    대체하게 할 수는 있습니다.
  
- **organism**은 
