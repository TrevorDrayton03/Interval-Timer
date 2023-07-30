import { useEffect, useState } from 'react'
import { Audio } from "expo-av";

const useSetSounds = () => {
  const [singleBellSound, setSingleBellSound] = useState();
  const [tripleBellSound, setTripleBellSound] = useState();
  const [beepSound, setBeepSound] = useState();

  useEffect(() => {
    async function playSingleBell() {
      let { sound } = await Audio.Sound.createAsync(
        require("../../src/sounds/single-bell(1.5s).mp3")
      );
      setSingleBellSound(sound);
    }
    async function playTripleBell() {
      let { sound } = await Audio.Sound.createAsync(
        require("../../src/sounds/triple-bell(1.5s).mp3")
      );
      setTripleBellSound(sound);
    }
    async function playBeep() {
      let { sound } = await Audio.Sound.createAsync(
        require("../../src/sounds/beep.mp3")
      );
      setBeepSound(sound);
    }
    playSingleBell()
    playTripleBell()
    playBeep()
  }, [])

  return {
    beepSound,
    singleBellSound,
    tripleBellSound
  }

}

export default useSetSounds