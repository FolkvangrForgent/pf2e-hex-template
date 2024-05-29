async function setGridTemplates(canvas) {
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

async function setGridTemplates2() {
  await setGridTemplates(game.canvas)
}
  
Hooks.on('canvasInit', setGridTemplates);
Hooks.once('ready', setGridTemplates2);
