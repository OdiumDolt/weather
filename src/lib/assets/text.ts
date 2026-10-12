export const MODES = ["hot", "cold"] as const
export type Modes = typeof MODES[number];

export const modeText: Record<Modes, string> = {
    hot: "Which is hotter?",
    cold: "Which is colder?"
}