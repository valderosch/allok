import { Dimensions } from "react-native";
const {width, height} = Dimensions.get("window")

export const COLORS = {
    primary: "#0098ED", // Primary color
    secondary: "#D9F1F9", // BG Color
    uactive: "#888888", // Muted color

    white: "#FFFFFF", 
    black: "#000000",
    red: "#F55624",
    yellow: "#F5C724",
    green: "#5EF466",
    blue: "#5A99E2",
    textPrimary: "#F2F2F2",
    textSecondary: "#2F2F2F",
    textMuted: "#838383", 
}

export const SIZES = {
    textPrimary: 23,
    textSecondary: 15,
}
