/* ==========================================================
   中 / 英文切换
   ========================================================== */
(function () {
    const STORAGE_KEY = "site-lang";
    const toggleBtn = document.getElementById("lang-toggle");
    if (!toggleBtn) return;

    function applyLanguage(lang) {
        // 纯文本元素：data-en / data-zh
        document.querySelectorAll("[data-en]").forEach((el) => {
            el.textContent = lang === "zh" ? el.dataset.zh : el.dataset.en;
        });

        // 含内联标签（如书名 <span class="work-title">）的富文本：data-en-html / data-zh-html
        document.querySelectorAll("[data-en-html]").forEach((el) => {
            el.innerHTML = lang === "zh" ? el.dataset.zhHtml : el.dataset.enHtml;
        });

        document.documentElement.setAttribute("lang", lang);
        toggleBtn.textContent = lang === "zh" ? "EN" : "中文";
        toggleBtn.dataset.lang = lang;
        localStorage.setItem(STORAGE_KEY, lang);
    }

    toggleBtn.addEventListener("click", function () {
        const next = toggleBtn.dataset.lang === "zh" ? "en" : "zh";
        applyLanguage(next);
    });

    // 初始化：优先读取上次选择，否则回退到页面当前语言（默认英文）
    const saved = localStorage.getItem(STORAGE_KEY);
    const initial = saved || document.documentElement.getAttribute("lang") || "en";
    applyLanguage(initial);
})();

/* ==========================================================
   一键复制 WeChat/QQ
   ========================================================== */
document.addEventListener("DOMContentLoaded", function () {
    const copyBtn = document.getElementById("copy-btn");
    if (!copyBtn) return;

    copyBtn.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("data-id");
        const originalText = `Wechat/QQ`;
        const btn = this;

        function showSuccess() {
            btn.innerText = "ID Copied! ✓";
            btn.classList.add("copied");
            setTimeout(() => {
                btn.innerText = originalText;
                btn.classList.remove("copied");
            }, 1500);
        }

        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(targetId)
                .then(showSuccess)
                .catch(() => fallbackCopy(targetId, showSuccess));
        } else {
            fallbackCopy(targetId, showSuccess);
        }
    });

    function fallbackCopy(text, callback) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.width = "2em";
        textArea.style.height = "2em";
        textArea.style.padding = "0";
        textArea.style.border = "none";
        textArea.style.outline = "none";
        textArea.style.background = "transparent";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                callback();
            } else {
                prompt("Please copy manually:", text);
            }
        } catch (err) {
            prompt("Please copy manually:", text);
        }

        document.body.removeChild(textArea);
    }
});