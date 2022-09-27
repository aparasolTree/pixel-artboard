/// <reference types="vite/client" />

interface Theme {
    type: string;
    bgPrimary: string;
    bgSecondary: string;
    bgTertiary: string;
    ftPrimary: string;
    ftSecondary: string;
    ftTertiary: string;
}

interface DefaultTheme {
    theme: Theme;
    toggleTheme: () => void;
}
