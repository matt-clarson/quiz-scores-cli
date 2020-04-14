type AssertionCb = () => void;
type WaitConfig = {
  timeout: number;
};

export const wait = (
  cb: AssertionCb,
  config: WaitConfig = { timeout: 3000 }
): Promise<void> =>
  new Promise((resolve, reject) => {
    let elapsed = 0;
    const interval = 100;
    let intervalId = setInterval(() => {
      elapsed += interval;
      try {
        cb();
        clearInterval(intervalId);
        resolve();
      } catch (error) {
        if (elapsed >= config.timeout) reject(error);
      }
    }, interval);
  });
