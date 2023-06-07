import { StyleSheet } from "react-native";

// Global Style Sheet
export const styles = StyleSheet.create({
    // SHARED
    text: {
        fontSize: 24,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    row: {
        flex: 1,
        flexDirection: "row",
    },
    // MinuteSecondPicker
    picker: {
        height: 50,
        width: 110,
        marginVertical: 0,
        padding: 0,
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
        paddingHorizontal: 20,
    },
    timerColumn: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: 10,
    },
    timerRow: {
        flex: .4,
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
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    timerModalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    timerModalContainer: {
        flex: 1,
    },
    timerText: {
        fontSize: 30,
    },
    timerOkButton: {
        borderWidth: 2,
        borderColor: "gray",
        borderRadius: 15,
        padding: 20,
        fontSize: 30
    },
    // FightClock
    fightClockModalContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        fontSize: 24
    },
    fightClockComplete: {
        fontWeight: "bold",
        fontSize: 40
    },
    // StoreButton
    storeButtonTextInputContainer: {
        borderWidth: 2,
        borderColor: "gray",
        borderRadius: 15,
        margin: 20,
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
    storeButtonModalView: {
        flex: 1,
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
        flex: .8,
        textAlign: "center",
        fontSize: 14,
        marginTop: 20,
        marginBottom: 20,
        fontWeight: "bold"
    },
    storeButtonRow3: {
        flex: .8,
        textAlign: "center",
        fontSize: 14,
        marginTop: 20,
        marginBottom: 20,
        fontWeight: "bold",
        marginRight: 5
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
        marginTop: 20
    },
    storeButtonRow4: {
        flex: 1,
        textAlign: "center",
        fontSize: 14
    },
    storeButtonRow5: {
        flex: .8,
        textAlign: "center",
        fontSize: 14
    },
    storeButtonColumnContainer: {
        flex: 1,
        flexDirection: "column",
        padding: 10
    },
    storeButtonFooterContainer: {
        flex: .5,
        justifyContent: "flex-end",
    },
    storeButtonFooter: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    storeButtonInputModalContainer: {
        flex: 1,
        justifyContent: "center",
    },
    storeButtonInputModalTitle: {
        textAlign: "center",
        padding: 10,
        fontSize: 24
    },
    storeButtonTextInput: {
        fontSize: 20,
        width: "100%",
        textAlign: "center"
    },
    storeButtonButtonInputContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    storeButtonScrollView: {
        width: "100%"
    },
    // IncrementDecrementButton
    incButtonRow: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },
    incButton: {
        marginRight: 10
    },
    // App
    smallerContainer: {
        flexDirection: "column",
        flex: 1.4,
        alignItems: "center",
        justifyContent: "center"
    },
    titleContainer: {
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    startButtonContainer: {
        flexDirection: "row",
        flex: .6,
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    storeButtonContainer: {
        flexDirection: "row",
        flex: .82,
        justifyContent: "flex-start",
    },
    column: {
        flex: .25,
        alignItems: "flex-start",
    },
    trainingTime: {
        fontSize: 28,
    },
    button: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginBottom: 20
    }
})

export default styles;