/* ==========================================================
   中 / 英切换
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

        // 富文本元素：data-en-html / data-zh-html
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

    // 初始化：优先读取上次选择，否则回退到页面当前语言
    const saved = localStorage.getItem(STORAGE_KEY);
    const initial = saved || document.documentElement.getAttribute("lang") || "en";
    applyLanguage(initial);
})();

/* ==========================================================
   复制按钮
   ========================================================== */
document.addEventListener("DOMContentLoaded", function () {
    const copyBtn = document.getElementById("copy-btn");
    if (!copyBtn) return;

    copyBtn.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("data-id");
        const currentLang = document.documentElement.getAttribute("lang") || "en";
        const btn = this;
        const originalText = currentLang === "zh" ? btn.dataset.zh : btn.dataset.en;

        navigator.clipboard.writeText(targetId).then(() => {
            btn.innerText = currentLang === "zh" ? "已复制 ID！✓" : "ID Copied! ✓";
            btn.classList.add("copied");
            setTimeout(() => {
                btn.innerText = originalText;
                btn.classList.remove("copied");
            }, 1500);
        });
    });
});