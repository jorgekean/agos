const themes = {
    FuseOriginal: {
        name: "FuseOriginal",
        primary: "#0e7490",
        primary2: "#06b6d4",
        primary3: "#38bdf8",
        primary4: "#bae6fd",
        primary5: "#e0f2fe",
        secondary: "#c2410c",
        secondary2: "#f97316",
        secondary3: "#fdba74",
        secondary4: "#fed7aa",
        secondary5: "#FFFBF7",
        navigation: "#ffffff",
        navigationtext: "#0e7490",
        fuselighttext: "#FAFCFF",
        fusedarktext: "#001736",
    },
    WTWPurple: {
        name: "WTWPurple",
        primary: "#48086f",
        primary2: "#7f35b2",
        primary3: "#c2a8f0",
        primary4: "#d8c6f5",
        primary5: "#efe2fa",
        secondary: "#9e0085",
        secondary2: "#c900ac",
        secondary3: "#e377dc",
        secondary4: "#f0bde6",
        secondary5: "#FFFAFE",
        navigation: "#ffffff",
        navigationtext: "#48086f",
        fuselighttext: "#FDFBFF",
        fusedarktext: "#280144",
    },
    WTWGreen: {
        name: "WTWGreen",
        primary: "#15494C",      // Deep, dark teal base (same as original)
        primary2: "#2A666A",     // Slightly lighter shade for hovers
        primary3: "#34A88F",     // A rich, elegant emerald for primary actions
        primary4: "#88D4C2",     // A softer, muted teal for highlights
        primary5: "#E8F7F4",     // Very light tint for backgrounds
        secondary: "#4DC4AD",    // A complementary vibrant-yet-soft teal
        secondary2: "#6FE3BF",   // Lighter version for secondary hovers
        secondary3: "#A3E4D7",
        secondary4: "#D1F2EB",
        secondary5: "#F0FAF8",
        navigation: "#FFFFFF",
        navigationtext: "#15494C", // High contrast text
        fuselighttext: "#F8FBFB",
        fusedarktext: "#0A2022",    // A near-black with a hint of green
    },
    WTWBrand: {
        name: "WTWBrand",
        primary: "#48086f",
        primary2: "#7f35b2",
        primary3: "#c2a8f0",
        primary4: "#d8c6f5",
        primary5: "#efe2fa",
        secondary: "#9e0085",
        secondary2: "#c900ac",
        secondary3: "#e377dc",
        secondary4: "#f0bde6",
        secondary5: "#FFFAFE",
        navigation: "#48086f",
        navigationtext: "#FFFAFE",
        fuselighttext: "#FDFBFF",
        fusedarktext: "#280144",
    },
} as const;

export type ThemeKey = keyof typeof themes;
export default themes;
