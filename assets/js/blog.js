document.addEventListener("DOMContentLoaded", function () {
  const codeBlocks = document.querySelectorAll(".blog-post-content pre code");

  codeBlocks.forEach(function (codeElement, index) {
    const preElement = codeElement.parentNode;
    if (!preElement || preElement.tagName !== "PRE") return;

    // Add line-numbers class for the plugin
    preElement.classList.add("line-numbers");

    let language = "plaintext";
    const classes = codeElement.className.split(" ");
    for (const cls of classes) {
      if (cls.startsWith("language-")) {
        language = cls.replace("language-", "");
        break;
      }
    }

    const container = document.createElement("div");
    container.className = "code-block-container";

    const header = document.createElement("div");
    header.className = "code-block-header";

    const title = document.createElement("span");
    title.className = "code-block-title";
    title.textContent = language.charAt(0).toUpperCase() + language.slice(1);
    header.appendChild(title);

    const copyButton = document.createElement("button");
    copyButton.className = "copy-button";
    copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
    copyButton.onclick = function () {
      const codeText = codeElement.textContent;
      navigator.clipboard
        .writeText(codeText)
        .then(function () {
          copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
          setTimeout(function () {
            copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
          }, 2000);
        })
        .catch(function (error) {
          console.error("Error copying text: ", error);
          copyButton.innerHTML = '<i class="fas fa-times"></i> Error!';
          setTimeout(function () {
            copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
          }, 2000);
        });
    };
    header.appendChild(copyButton);

    container.appendChild(header);
    preElement.parentNode.insertBefore(container, preElement);
    container.appendChild(preElement);

    if (!codeElement.classList.contains("language-none")) {
      // Make sure Prism is available before highlighting
      if (typeof Prism !== "undefined") {
        Prism.highlightElement(codeElement);
      }
    }
  });
});
