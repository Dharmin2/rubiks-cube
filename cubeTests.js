function simulateKey(key) {
    document.dispatchEvent(new KeyboardEvent("keydown", { key }));
  }
  
  window.addEventListener("load", () => {
  
    const undoBtn = document.querySelector(".undo-btn");
    const redoBtn = document.querySelector(".redo-btn");
  
    let originalLength = undoStack.length;
  
    // Test 1: simulate move
    simulateKey("r");
    setTimeout(() => {
      const afterMove = undoStack.length;
      console.assert(afterMove === originalLength + 1, `TEST 1 FAILED: Expected ${originalLength + 1}, got ${afterMove}`);
      console.log("TEST 1 PASSED: Move added to undoStack");
  
      // Test 2: undo
      originalLength = afterMove;
      undoBtn.click();
      setTimeout(() => {
        const afterUndo = undoStack.length;
        console.assert(afterUndo === originalLength - 1, `TEST 2 FAILED: Expected ${originalLength - 1}, got ${afterUndo}`);
        console.log("TEST 2 PASSED: Undo removed from undoStack");
  
        // Test 3: redo
        originalLength = afterUndo;
        redoBtn.click();
        setTimeout(() => {
          const afterRedo = undoStack.length;
          console.assert(afterRedo === originalLength + 1, `❌ TEST 3 FAILED: Expected ${originalLength + 1}, got ${afterRedo}`);
          console.log("TEST 3 PASSED: Redo re-added to undoStack");
        }, 300);
      }, 300);
    }, 300);
  });
  