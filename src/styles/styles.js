import { StyleSheet } from "react-native";

// Global Style Sheet
export const styles = StyleSheet.create({
  // SHARED
  text: {
    fontSize: 24,
  },
  container: {
    flex: 1
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  pickerRow: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#212121",
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 20
  },
  // MinuteSecondPicker
  picker: {
    height: 50,
    width: 110,
    marginVertical: 0,
  },
  pickerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // Timer
  timerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  timerColumn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  timerRow: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  timerModal: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  timerModalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  timerText: {
    fontSize: 30,
  },
  timerOkButton: {
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 15,
    padding: 20,
    fontSize: 30,
  },
  // FightClock
  fightClockComplete: {
    fontWeight: "bold",
  },
  // StoreButton
  storeButtonTextInputContainer: {
    borderWidth: 2,
    borderColor: "#121212",
    borderRadius: 15,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  storeButtonModalContainer: {
    alignItems: "center",
    flex: 5,
  },
  storeButtonRowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  storeButtonRow1: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  storeButtonRow2: {
    flex: 0.8,
    textAlign: "center",
    fontSize: 14,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  storeButtonRow3: {
    flex: 0.8,
    textAlign: "center",
    fontSize: 14,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
    marginRight: 5,
  },
  storeButtonBlackBar1: {
    flex: 1,
    height: 2,
    backgroundColor: "black",
    marginLeft: 10,
    marginRight: 10,
  },
  storeButtonBlackBar2: {
    flex: 1,
    height: 1,
    backgroundColor: "gray",
    marginTop: 20,
  },
  storeButtonRow4: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
  },
  storeButtonRow5: {
    flex: 0.8,
    textAlign: "center",
    fontSize: 14,
  },
  storeButtonColumnContainer: {
    flex: 1,
    flexDirection: "column",
    // padding: 10,
    backgroundColor: '#303030',
    borderRadius: 15,
    // borderColor: "#03DAC6",
    borderColor: "#121212",
    borderWidth: 2,
    margin: 4,
    padding: 25,
    marginLeft: 10,
    marginRight: 10
  },
  // storeButtonFooter: {
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  // },
  // storeButtonFooterContainer: {
  //   flexDirection: 'column',
  //   flex: 0.5,
  //   justifyContent: "center",
  // },
  saveCurrentTimer: {
    flexDirection: "row",
    flex: 0.85,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 0,
    padding: 0
  },
  backButton: {
    flexDirection: "row",
    flex: .85,
    justifyContent: "flex-start",
  },
  fightClockBackColumn: {
    flexDirection: "row",
    flex: .11,
    justifyContent: "flex-end",
  },
  fightClockBackButton: {
    flexDirection: "row",
    flex: .23,
    justifyContent: "flex-end",
  },
  buttonsContainer: {
    flex: .2,
    flexDirection: "row",
    // justifyContent: "space-around",
    alignItems: "flex-end",
    paddingBottom: 0,
  },
  storeButtonInputModalContainer: {
    flex: 1,
    justifyContent: "center",
  },
  storeButtonInputModalTitle: {
    textAlign: "center",
    padding: 10,
    fontSize: 24,
  },
  storeButtonTextInput: {
    fontSize: 20,
    width: "100%",
    textAlign: "center",
  },
  storeButtonButtonInputContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  storeButtonScrollView: {
    width: "100%",
  },
  // IncrementDecrementButton
  incButtonRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  incButton: {
    marginLeft: 50,
  },
  // App
  smallerContainer: {
    flexDirection: "column",
    flex: 1.4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  titleContainer: {
    flexDirection: "row",
    flex: .5,
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#212121",
    borderRadius: 15,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  durationContainer: {
    flexDirection: "column",
    flex: .7,
    alignItems: "center",
    justifyContent: "center",
  },
  fightClockContainer: {
    flexDirection: "row",
    flex: 0.5,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  storeButtonContainer: {
    flexDirection: "row",
    flex: 0.84,
    justifyContent: "flex-start",
  },
  column: {
    flex: 0.4,
    alignItems: "center",
  },
  settingsRow: {
    flex: .1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#212121",
    borderRadius: 15,
  },
  columnStoreButton: {
    flex: .75,
    alignItems: "center",
  },
  settingsBackButton: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
    padding: 15,
    paddingLeft: 30
  },
  // timerBackRow: {
  //   flexDirection: "row",
  //   flex: 1,
  //   justifyContent: 'flex-start',
  // },
  timerBackButton: {
    flexDirection: "row",
    flex: .22,
    justifyContent: "flex-end",
  },
  timerBackColumn: {
    flexDirection: "column",
    flex: .15,
  },
  trainingTime: {
    fontSize: 40,
  },
  titleText: {
    fontSize: 28,
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginBottom: 20,
  },
});

export default styles;