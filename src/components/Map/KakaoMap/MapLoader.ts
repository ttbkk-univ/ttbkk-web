import { env } from '../../../env';

function addScript(type: string, src: string, id: string): HTMLScriptElement {
  const script = document.createElement('script');
  script.async = true;
  script.type = type;
  script.src = src;
  script.id = id;
  document.head.appendChild(script);
  return script;
}

export function loadKakaoMap(callback?: (...args: any[]) => any): any {
  const kakaoMapScriptId = 'kakaoMap';
  const isExisting = document.getElementById(kakaoMapScriptId);

  if (!isExisting) {
    const script = addScript(
      'text/javascript',
      `//dapi.kakao.com/v2/maps/sdk.js?appkey=${env.kakao.mapApiKey}&libraries=services,clusterer&autoload=false`,
      kakaoMapScriptId,
    );
    script.onload = (): void => {
      callback?.();
    };
  }
}
