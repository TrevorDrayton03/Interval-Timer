import { StyleSheet } from "react-native";

let background = "#121212";
let primary = "#BB86FC";
let primaryVariant = "#3700B3";
let secondary = "#03DAC6";
let surface = "#212121";
let error = "#CF6679";
let onPrimary = "#121212";
let onSecondary = "white";
let onBackground = "white";
let onSurface = "white";
let onError = "#FFFFFF";

export const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: background,
  },
  storeButtonModalView: {
    backgroundColor: background,
  },
  storeButtonInputModalContainer: {
    backgroundColor: background,
  },
  fightClockModalContainer: {
    backgroundColor: background,
  },
  timerModalContainer: {
    backgroundColor: background,
  },
  timerModal: {
    backgroundColor: background,
  },
  button: {
    borderColor: primary,
    backgroundColor: primary,
  },
  onSurface: {
    color: onSurface,
  },
  onPrimary: {
    color: onPrimary,
  },
  primary: {
    color: primary,
  },
  secondary: {
    color: secondary,
  },
  surface: {
    backgroundColor: surface,
  },
  storeButtonScrollView: {
    backgroundColor: surface,
  },
});

export default darkTheme;
