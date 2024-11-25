/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom Colors
        landing: {
          from: "#ffb88e",
          to: "#ea5753",
        },
        primary: {
          100: "#1F2C47",
          200: "#192339",
          300: "#131A2B",
          400: "#121B2B",
          500: "#06090E",
        },
        upgrade: {
          from: "#FF0F7B",
          to: "#F89B29",
        },
        routes: {
          dashboard: "#ea5753",
          conversation: "#24B26D",
          composer: "#007E8F",
          illustrator: "#8D5A97",
          impression: "#A64253",
          settings: "#D8E2DC",

          bg: {
            conversation: "#34D587",
            composer: "#00B4CC",
            illustrator: "#A273AB",
            impression: "#BF5F6F",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        clockwise: {
          from: { transform: "rotateZ(0deg)" },
          to: { transform: "rotateZ(360deg)" },
        },
        "counter-clockwise": {
          from: { transform: "rotateZ(360deg)" },
          to: { transform: "rotateZ(0deg)" },
        },
        steam: {
          "0%, 100%": {
            "background-position": "0 0",
          },
          "50%": {
            "background-position": "400% 0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        rotate: "clockwise 20s linear infinite",
        "counter-rotate": "counter-clockwise 20s linear infinite",
        steam: "steam 30s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
