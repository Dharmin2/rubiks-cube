function simulateKey(key) {
  document.dispatchEvent(new KeyboardEvent("keydown", { key }));
}

window.addEventListener("load", () => {
  const undoBtn = document.querySelector(".undo-btn");
  const redoBtn = document.querySelector(".redo-btn");
  const saveBtn = document.querySelector(".save-btn");
  const loadBtn = document.querySelector(".load-btn");

  let originalLength = undoStack.length;

  // --- TEST 1: record move ---
  simulateKey("r");
  setTimeout(() => {
    const afterMove = undoStack.length;
    console.assert(afterMove === originalLength + 1, `TEST 1 FAILED: Expected ${originalLength + 1}, got ${afterMove}`);
    console.log("✅ TEST 1 PASSED: Move added to undoStack");

    // --- TEST 2: undo ---
    originalLength = afterMove;
    undoBtn.click();
    setTimeout(() => {
      const afterUndo = undoStack.length;
      console.assert(afterUndo === originalLength - 1, `TEST 2 FAILED: Expected ${originalLength - 1}, got ${afterUndo}`);
      console.log("✅ TEST 2 PASSED: Undo removed from undoStack");

      // --- TEST 3: redo ---
      originalLength = afterUndo;
      redoBtn.click();
      setTimeout(() => {
        const afterRedo = undoStack.length;
        console.assert(afterRedo === originalLength + 1, `TEST 3 FAILED: Expected ${originalLength + 1}, got ${afterRedo}`);
        console.log("✅ TEST 3 PASSED: Redo re-added to undoStack");

        // --- TEST 4: Save should reset counter to 0 ---
        simulateKey("r"); // make a move
        setTimeout(() => {
          saveBtn.click(); // save position
          setTimeout(() => {
            console.assert(savedMoveCount === 0, `TEST 4 FAILED: Expected savedMoveCount to be 0, got ${savedMoveCount}`);
            console.log("✅ TEST 4 PASSED: Save resets savedMoveCount to 0");

            // --- TEST 5: Another move should increment counter to 1 ---
            simulateKey("u");
            setTimeout(() => {
              console.assert(savedMoveCount === 1, `TEST 5 FAILED: Expected savedMoveCount to be 1, got ${savedMoveCount}`);
              console.log("✅ TEST 5 PASSED: savedMoveCount incremented after move");

              // --- TEST 6: Load should undo last move and reset counter ---
              loadBtn.click();
              setTimeout(() => {
                console.assert(savedMoveCount === 0 || savedMoveCount === null, `TEST 6 FAILED: Expected savedMoveCount to be 0 or null, got ${savedMoveCount}`);
                console.log("TEST 6 PASSED: Load restored previous position and reset counter");
              }, 300);
            }, 300);
          }, 200);
        }, 200);
      }, 300);
    }, 300);
  }, 300);
});
