async function loadApp() {
    const { app } = await import("./api.js");
}
loadApp();