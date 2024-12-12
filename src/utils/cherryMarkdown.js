// src/utils/cherryInstance.js

import 'cherry-markdown/src/sass/themes/diy.scss'
import Cherry from "cherry-markdown";
import 'cherry-markdown/dist/cherry-markdown.css';

let cherryInstance = null; // 单例实例

export function getCherryInstance() {
    if (!cherryInstance) {
        cherryInstance = new Cherry({
            id: "markdown-container",
            value: `# 公式测试`,
            externals: {
              echarts: window.echarts,
              katex: window.katex || null,
              MathJax: window.MathJax,
            },
            nameSpace: 'cherry',
            themeSettings: {
                // 主题列表，用于切换主题
                themeList: [
                    {className: 'div', label: 'div'},
                    {className: 'default', label: 'default'},
                    {className: 'dark', label: 'dark'},
                    {className: 'light', label: 'light'},
                    {className: 'green', label: 'green'},
                    {className: 'red', label: 'red'},
                    {className: 'violet', label: 'violet'},
                    {className: 'blue', label: 'blue'},
                    {className: 'orange', label: 'orange'},
                ],
                // 目前应用的主题
                mainTheme: 'div',
                // 目前应用的代码块主题
                codeBlockTheme: 'default',
            },
            engine: {
                syntax: {
                    mathBlock: {
                        plugins: true, // 默认加载插件
                        engine: 'MathJax', // katex或MathJax
                        src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js', // 如果使用MathJax plugins，则需要使用该url通过script标签引入
                    },
                    inlineMath: {
                        engine: 'MathJax', // katex或MathJax
                        src: "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"
                    },
                    header: {
                        anchorStyle: "autonumber",
                        strict: false,
                    },
                },
            },
            toolbars: {
                // 定义顶部工具栏
                toolbar: ['bold', 'italic', 'strikethrough', '|',
                    'color', 'ruby', '|',
                    'list', 'panel', 'detail', '|',
                    'theme', {insert: ['image', 'audio', 'video', 'link', 'code', 'formula', 'toc', 'table', 'drawIo']},
                    'togglePreview', 'switchModel',
                ],
                // 定义侧边栏，默认为空
                sidebar: [],
                // 定义顶部右侧工具栏，默认为空
                toolbarRight: [],
                // 定义选中文字时弹出的“悬浮工具栏”，默认为 ['bold', 'italic', 'underline', 'strikethrough', 'sub', 'sup', 'quote', '|', 'size', 'color']
                bubble: false,
                // 定义光标出现在行首位置时出现的“提示工具栏”，默认为 ['h1', 'h2', 'h3', '|', 'checklist', 'quote', 'table', 'code']
                float: false,
            },
        });
    }
    return cherryInstance;
}