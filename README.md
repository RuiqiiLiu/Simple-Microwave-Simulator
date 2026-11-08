# Simple-Microwave-Simulator

A rough interactive microwave model built with HTML, CSS, and JavaScript. It demonstrates how cooking time, button presses, and the door influence the microwave's behavior.

## Controls and behavior

- **+30 seconds:** Add cooking time before starting or while paused, up to 99:30. This button is disabled during cooking and the completion flash.
- **Start/Stop:** One button that starts or resumes cooking when time remains and the door is closed. While cooking, it becomes Stop; pressing it pauses the countdown and keeps the remaining time.
- **Clear:** Reset the time to zero. Available only while idle, ready, or paused; disabled during cooking and the completion flash.
- **Open/Close door:** Opening the door pauses cooking. Closing it does not automatically resume cooking; press Start to resume.
- **Completion:** When the countdown reaches zero, cooking stops and the light flashes for three seconds before returning to idle. With reduced-motion settings, the light stays on during those three seconds instead of flashing.

States are tracked internally rather than shown as labels. Reheat, Popcorn, Defrost, and Power Level settings are not included.

## Files

- `index.html` — page structure and controls.
- `style.css` — microwave appearance and animations.
- `script.js` — event listeners, countdown, and behavior logic.
- `README.md` — project description and instructions.

No external libraries or package dependencies are required.

## Install and run

No package installation, build step, or local server is required. Keep `index.html`, `style.css`, and `script.js` in the same folder, then open `index.html` in a modern web browser.

### Download ZIP

1. Open [Simple-Microwave-Simulator on GitHub](https://github.com/RuiqiiLiu/Simple-Microwave-Simulator).
2. Select **Code → Download ZIP**.
3. Extract the ZIP archive.
4. Open the extracted folder and double-click `index.html`.

### Clone with Git

With Git installed, run:

```sh
git clone https://github.com/RuiqiiLiu/Simple-Microwave-Simulator.git
cd Simple-Microwave-Simulator
```

Then open `index.html` in your browser.

To download later updates, run `git pull` inside the cloned folder after committing or otherwise saving any local changes.

## AI use: Codex

OpenAI Codex assisted with refining the appliance rules, implementing and updating the HTML, CSS, and JavaScript, explaining events and event listeners, and reviewing this README.
