async function rrrrr(canvas) {
  console.warn(canvas)
  console.warn(canvas.grid)
  console.warn(canvas.grid.type)
  if (canvas.grid.type === CONST.GRID_TYPES.HEXODDR || canvas.grid.type === CONST.GRID_TYPES.HEXEVENR || canvas.grid.type === CONST.GRID_TYPES.HEXODDQ || canvas.grid.type === CONST.GRID_TYPES.HEXEVENQ ) {
    if (!game.settings.get("core", "gridTemplates")) {
      await game.settings.set("core", "gridTemplates", true);
    }
  } else {
    if (game.settings.get("core", "gridTemplates")) {
      await game.settings.set("core", "gridTemplates", false);
    }
  }
}
Hooks.on('canvasInit', rrrrr);
Hooks.once('canvasReady', rrrrr);
