function wait(selector) {
  return new Promise((resolve) => {
    const existing = document.querySelector(selector);
    if (existing) return resolve(existing);

    const obs = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el) {
        obs.disconnect();
        resolve(el);
      }
    });

    obs.observe(document.body, { childList: true, subtree: true });
  });
}

function moveTimeInfo() {
  const timeInfo = document.querySelector(".time-info");
  const volume = document.querySelector(".volume");
  if (!timeInfo || !volume) return;

  if (volume.nextElementSibling === timeInfo) return;

  volume.insertAdjacentElement("afterend", timeInfo);
}

function moveButtons() {
  const leftControls = document.querySelector(
    "#left-controls .left-controls-buttons",
  );
  const repeat = document.querySelector(".repeat");
  const shuffle = document.querySelector(".shuffle");
  const previous = document.querySelector(".previous-button");

  if (!leftControls || !repeat || !shuffle || !previous) return;
  if (leftControls.contains(repeat)) return;

  leftControls.insertBefore(shuffle, previous);
  leftControls.appendChild(repeat);
}

function init() {
  console.log("Extension loaded");

  const layoutObserver = new MutationObserver(() => {
    moveTimeInfo();
    moveButtons();
  });
  layoutObserver.observe(document.body, { childList: true, subtree: true });

  moveTimeInfo();
  moveButtons();
}

wait("ytmusic-player-bar").then(init);
