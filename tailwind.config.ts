import type {Config} from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  safelist: [
    "bg-sky-500/85",
    "bg-lime-500/85",
    "bg-amber-500/85",
    "bg-red-500/85",
    "hover:bg-red-500/60",
    "hover:bg-amber-500/60",
    "hover:bg-lime-500/60",
    "hover:bg-sky-500/60",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      fontFamily: {
        inter: [
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Helvetica",
          "sans-serif",
        ],
        outfit: ["var(--font-outfit)", "sans-serif"],
      },
      screens: {
        xs: "480px",
        sml: "860px",
        "2xl": "1400px",
      },
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
        "secondary-background": {
          DEFAULT: "hsl(var(--secondary-background))",
          foreground: "hsl(var(--secondary-background-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {height: "0"},
          to: {height: "var(--radix-accordion-content-height)"},
        },
        "accordion-up": {
          from: {height: "var(--radix-accordion-content-height)"},
          to: {height: "0"},
        },
        "slide-down-and-fade": {
          from: {opacity: "0", transform: "translateY(-2px)"},
          to: {opacity: "100%", transform: "translateY(0)"},
        },
        "slide-up-and-fade": {
          from: {opacity: "100%", transform: "translateY(0)"},
          to: {opacity: "0", transform: "translateY(-2px)"},
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-down-and-fade": "slide-down-and-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up-and-fade": "slide-up-and-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backgroundImage: {
        cyanBlue: "linear-gradient(to right, #00bcd4, #1e3a8a, #00bcd4)",
      },
      boxShadow: {
        "bottom-shadow": "0 15px 15px rgba(0, 0, 0, 0.1)",
        "left-shadow": "-10px 0 15px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
