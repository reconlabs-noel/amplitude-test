# Amplitude 테스트

`src/utils/amplitude.ts`에 앰플리튜드 이벤트 전송을 위한 모듈들을 class로 구현하였습니다.

해당 파일에서 export 되는 것은 클래스의 인스턴스이기 때문에, 한 앱에 한 amplitude만 존재할 수 있습니다.

환경변수로 원하는 Amplitude의 api key를 주시면 테스트할 수 있습니다.
