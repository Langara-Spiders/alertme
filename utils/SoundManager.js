import Sound from "react-native-sound";
import bottomNavClick from "../assets/sounds/bottom_nav_click.mp3";
import clickEffect from "../assets/sounds/button_click_effect.mp3";
import switchClick from "../assets/sounds/switch_click.mp3";
import useStore from "../store/useStore";

let clickSound = null;
let switchSound = null;
let bottomNavSound = null;

const initializeSound = () => {
  Sound.setCategory("Playback", true);
  if (!clickSound) {
    clickSound = new Sound(clickEffect, (error) => {
      if (error) {
        console.log("Failed to load the click sound", error);
      }
    });
  }
  if (!switchSound) {
    switchSound = new Sound(switchClick, (error) => {
      if (error) {
        console.log("Failed to load the switch sound", error);
      }
    });
  }
  if (!bottomNavSound) {
    bottomNavSound = new Sound(bottomNavClick, (error) => {
      if (error) {
        console.log("Failed to load the bottom nav sound", error);
      }
    });
  }
};

const playClickSound = () => {
  const { switchValues } = useStore.getState(); // Get the current sound preferences
  if (switchValues.applicationSound && clickSound) {
    clickSound.play((success) => {
      if (!success) {
        console.log("Click sound playback failed");
      }
    });
  }
};

const playSwitchSound = () => {
  const { switchValues } = useStore.getState(); // Get the current sound preferences
  if (switchValues.applicationSound && switchSound) {
    switchSound.play((success) => {
      if (!success) {
        console.log("Switch sound playback failed");
      }
    });
  }
};

const playBottomNavSound = () => {
  const { switchValues } = useStore.getState(); // Get the current sound preferences
  if (switchValues.applicationSound && bottomNavSound) {
    bottomNavSound.play((success) => {
      if (!success) {
        console.log("Bottom nav sound playback failed");
      }
    });
  }
};

const releaseSound = () => {
  if (clickSound) {
    clickSound.release();
    clickSound = null;
  }
  if (switchSound) {
    switchSound.release();
    switchSound = null;
  }
  if (bottomNavSound) {
    bottomNavSound.release();
    bottomNavSound = null;
  }
};

export {
  initializeSound,
  playClickSound,
  playSwitchSound,
  playBottomNavSound,
  releaseSound,
};
