import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useDownload = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [isInstallButtonVisible, setIsInstallButtonVisible] = useState(false);
  const [isiOS, setIsIOS] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isInStandaloneMode, setIsInStandaloneMode] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(userAgent);
    const inStandalone = (window.navigator as any).standalone === true;

    setIsIOS(ios);
    setIsInStandaloneMode(inStandalone);

    if (ios && !inStandalone) {
      setIsInstallButtonVisible(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!ios) {
        setIsInstallButtonVisible(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (isiOS) {
      toast.info(
        'iOS에서 PWA를 설치하려면 Safari 브라우저에서 공유 버튼을 누르고 "홈 화면에 추가"를 선택하세요.'
      );
    } else if (deferredPrompt) {
      (deferredPrompt as any).prompt();
      const choiceResult = await (deferredPrompt as any).userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("다운로드 수락");
      } else {
        console.log("다운로드 취소");
      }
      setDeferredPrompt(null);
      setIsInstallButtonVisible(false);
    }
  };
  return {
    isInstallButtonVisible,
    handleInstallClick,
  };
};
