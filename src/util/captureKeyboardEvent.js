export default function captureKeyboardEvent(e, ...keys) {
    return e instanceof KeyboardEvent && keys.includes(e.key);
}