async function setGridTemplates(canvas) {
    if (game.user.isGM) {
        if (canvas.grid.isSquare) {
            if (game.settings.get("core", "gridTemplates")) {
                await game.settings.set("core", "gridTemplates", false);
            }
        } else {
            if (!game.settings.get("core", "gridTemplates")) {
                await game.settings.set("core", "gridTemplates", true);
            }
        }
    }
}

async function setGridTemplatesWrapper() {
    await setGridTemplates(game.canvas)
}
  
Hooks.on('canvasInit', setGridTemplates);

async function hexGridHightlight(template, data)  {
    setGridTemplatesWrapper();
    
    if (canvas.grid.isHexagonal) {
        const collisionType = "move";
      
        const gridPositions = template._getGridHighlightPositions()
        
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
}
// hacky hook to add collisions highlights like square
Hooks.on("refreshMeasuredTemplate", hexGridHightlight);
Hooks.on("drawMeasuredTemplate", setGridTemplatesWrapper);
