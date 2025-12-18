import { createTheme } from "@mui/material/styles";

const dark = createTheme({
    shadows: [
        'none',
        '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
        '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
        '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
        '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
        ...Array(20).fill(''),
    ],
    palette: {
        mode: "dark",
        primary: {
            main: "#1877F2",
        },
        secondary: {
            main: "#42B72A",
        },
        info: {
            main: "#1877F2",
        },
        background: {
            default: "#18191A",
            paper: "#242526",
        },
        text: {
            primary: "#E4E6EB",
            secondary: "#B0B3B8",
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                ":root": {
                    "--color-primary": "#1877F2",
                    "--color-secondary": "#42B72A",
                    "--color-accent": "#F02849",
                    "--color-bg": "#18191A",
                    "--color-text": "#E4E6EB",
                    "--color-muted-bg": "#242526",
                    "--text-muted-foreground": "#B0B3B8",
                    "--color-overlay": "rgba(0, 0, 0, 80%)",
                    "--color-primary-hsl": "214, 89%, 52%",
                    "--color-secondary-hsl": "106, 63%, 45%",
                    "--color-accent-hsl": "349, 87%, 55%",
                }
            }
        }
    }
});

const light = createTheme({
    shadows: [
        'none',
        '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
        '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
        '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
        '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)',
        ...Array(20).fill(''),
    ],
    palette: {
        mode: "light",
        primary: { main: "#1877F2" },
        secondary: { main: "#42B72A" },
        info: { main: "#1877F2" },
        background: {
            default: "#F0F2F5",
            paper: "#FFFFFF",
        },
        text: {
            primary: "#1C1E21",
            secondary: "#65676B",
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                ":root": {
                    "--color-primary": "#1877F2",
                    "--color-secondary": "#42B72A",
                    "--color-accent": "#F02849",
                    "--color-overlay": "rgba(255, 255, 255, 80%)",
                    "--color-bg": "#F0F2F5",
                    "--color-text": "#1C1E21",
                    "--color-muted-bg": "#FFFFFF",
                    "--text-muted-foreground": "#65676B",
                    "--color-primary-hsl": "214, 89%, 52%",
                    "--color-secondary-hsl": "106, 63%, 45%",
                    "--color-accent-hsl": "349, 87%, 55%",
                },
            },
        },
    },
});

const themes = { light, dark }

export default themes;