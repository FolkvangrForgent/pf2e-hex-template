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

// attempt to work around when pf2e sets template style
Hooks.once('ready', setGridTemplates2);

// hook to add collisions like square has
Hooks.on("refreshMeasuredTemplate", (template, data) => {
    if (canvas.grid.isHex) {
        collisionType = "move";
      
        gridPositions = template._getGridHighlightPositions()
        
        canvas.interface.grid.getHighlightLayer(template.highlightId).clear();
        
        for (const position of gridPositions) {
            const hasCollision = CONFIG.Canvas.polygonBackends[collisionType].testCollision(
                template.center,
                {
                    x: position.x + (canvas.grid.size / 2),
                    y: position.y + (canvas.grid.size / 2),
                },
                {
                    type: collisionType,
                    mode: "any",
                });
            if (hasCollision) {
                canvas.interface.grid.highlightPosition(template.highlightId, {
                    x: position.x,
                    y: position.y,
                    border: 0x000001,
                    color: 0x000000,
                });
            } else {
                canvas.interface.grid.highlightPosition(template.highlightId, {
                    x: position.x,
                    y: position.y,
                    border: template.document.borderColor,
                    color: template.document.fillColor,
                });
            }
        }
    }
});
