function inputPositionFixer() {
  const rtlTypingInput = document.querySelectorAll(".rtlTypingInput");
  rtlTypingInput.forEach((rtlTypingInput, index) => {
    rtlTypingInput.addEventListener("beforeinput", function (e) {
      const start = rtlTypingInput.selectionStart;
      const end = rtlTypingInput.selectionEnd;
      const val = rtlTypingInput.value;

      // 1. जब नया अक्षर या नंबर टाइप किया जाए (राइट-टू-लेफ्ट कर्सर मूवमेंट)
      if (e.inputType === "insertText" && e.data) {
        e.preventDefault();
        const newVal = val.slice(0, start) + e.data + val.slice(end);
        rtlTypingInput.value = newVal;
        rtlTypingInput.setSelectionRange(start, start);
      }

      // 2. जब मोबाइल कीबोर्ड का क्रॉस (Backspace) बटन दबाया जाए
      else if (e.inputType === "deleteContentBackward") {
        e.preventDefault();
        if (start !== end) {
          // यदि कुछ टेक्स्ट सेलेक्ट है, तो उसे हटाएं
          const newVal = val.slice(0, start) + val.slice(end);
          rtlTypingInput.value = newVal;
          rtlTypingInput.setSelectionRange(start, start);
        } else if (start > 0) {
          // ठीक पीछे वाले एक डिजिट/अक्षर को हटाएं
          const newVal = val.slice(0, start - 1) + val.slice(end);
          rtlTypingInput.value = newVal;
          rtlTypingInput.setSelectionRange(start - 1, start - 1);
        }
      }

      // 3. जब Delete बटन दबाया जाए
      else if (e.inputType === "deleteContentForward") {
        e.preventDefault();
        if (start !== end) {
          const newVal = val.slice(0, start) + val.slice(end);
          rtlTypingInput.value = newVal;
          rtlTypingInput.setSelectionRange(start, start);
        } else if (start < val.length) {
          const newVal = val.slice(0, start) + val.slice(start + 1);
          rtlTypingInput.value = newVal;
          rtlTypingInput.setSelectionRange(start, start);
        }
      }
    });

    // 4. मोबाइल और डेस्कटॉप के 'Cut' बटन के लिए
    rtlTypingInput.addEventListener("cut", function (e) {
      e.preventDefault();
      const start = rtlTypingInput.selectionStart;
      const end = rtlTypingInput.selectionEnd;
      const val = rtlTypingInput.value;

      if (start !== end) {
        const selectedText = val.slice(start, end);
        if (e.clipboardData) {
          e.clipboardData.setData("text/plain", selectedText);
        }
        const newVal = val.slice(0, start) + val.slice(end);
        rtlTypingInput.value = newVal;
        rtlTypingInput.setSelectionRange(start, start);
      }
    });
  });
}
