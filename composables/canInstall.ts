declare global {
  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
  }
}

export const useInstallPrompt = () => {
  const deferredPrompt = useState<BeforeInstallPromptEvent | null>(
    "pwa-deferred-prompt",
    () => null
  );
  const isSupported = useState("pwa-install-supported", () => false);

  onMounted(() => {
    if (!("beforeinstallprompt" in window)) {
      isSupported.value = false;
      console.warn("PWA Install Prompt not supported");
      return;
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      deferredPrompt.value = event as BeforeInstallPromptEvent;
      isSupported.value = true;
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    onBeforeUnmount(() => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    });
  });

  const showPrompt = async () => {
    if (!deferredPrompt.value) return false;

    deferredPrompt.value.prompt();
    const choiceResult = await deferredPrompt.value.userChoice;
    deferredPrompt.value = null;

    return choiceResult.outcome === "accepted";
  };

  return {
    canInstall: computed(
      () => isSupported.value && deferredPrompt.value !== null
    ),
    showPrompt,
  };
};
