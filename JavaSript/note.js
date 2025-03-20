document.addEventListener("DOMContentLoaded", function () {
  const blocks = document.querySelectorAll("blockquote");

  blocks.forEach(function (block) {
    const firstParagraph = block.firstElementChild;
    
    // 检查 blockquote 是否以 "[!NOTE]" 开头
    if (firstParagraph && firstParagraph.textContent.trim().startsWith("[!NOTE]")) {
      // 替换 "[!NOTE]" 为一个自定义的 div 并添加样式
      block.classList.add("custom-note");
      firstParagraph.textContent = firstParagraph.textContent.replace("[!NOTE]", "注意");
    }
    
    // 你也可以根据需要处理其他类似 [!WARNING] 等类型
  });
});
