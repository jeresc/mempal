import React from "react";

function AutoResizeTextarea() {
  const textArea = document.querySelector("textarea");
  const textRowCount = textArea ? textArea.value.split("\n").length : 0;
  const rows = textRowCount + 1;

  return (
    <div className='flex items-center justify-center'>
      <textarea aria-placeholder='Enter text here.' placeholder='Enter text here.' rows={rows} />
    </div>
  );
}

export {AutoResizeTextarea};
