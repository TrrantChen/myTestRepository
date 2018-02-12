<style>
    .CodeMirror {
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
        font-size: 16px;
    }

    .code-container {
        position: relative;
    }

    .tool-container-style {
        top: 4px;
        right: 20px;
        z-index: 1000;
    }

    .position-absolute {
        position: absolute;
    }

    .position-fixed {
        position: fixed;
    }
</style>
<template>
    <div class="code-container">
        <div ref="tool_container" class="tool-container-style position-absolute">
            <button @click="fullScreen" title="全屏/恢复">zoom in / out</button>
            <button @click="format" title="格式化">format</button>
        </div>
        <textarea ref="textArea" :value="value">
        </textarea>
    </div>
</template>
<script>
    import CodeMirror from 'codemirror/lib/codemirror'   // CodeMirror，必要
    import 'codemirror/lib/codemirror.css'    // css，必要
    import 'codemirror/mode/javascript/javascript'  // js的语法高亮，自行替换为你需要的语言
    import 'codemirror/mode/groovy/groovy'

    import 'codemirror/theme/monokai.css'

    // 全屏
    import 'codemirror/addon/display/fullscreen'
    import 'codemirror/addon/display/fullscreen.css'

    // 代码收缩，展开
    import 'codemirror/addon/fold/foldgutter.css'
    import 'codemirror/addon/fold/foldcode.js'
    import 'codemirror/addon/fold/foldgutter.js'
    import 'codemirror/addon/fold/brace-fold.js'
    import 'codemirror/addon/fold/xml-fold.js'
    import 'codemirror/addon/fold/indent-fold.js'
    import 'codemirror/addon/fold/markdown-fold.js'
    import 'codemirror/addon/fold/comment-fold.js'

    // 自动补全，只支持html sql css 和js
    import 'codemirror/addon/hint/show-hint.js'
    import 'codemirror/addon/hint/css-hint.js'
    import 'codemirror/addon/hint/show-hint.css'
    import 'codemirror/addon/hint/anyword-hint.js'
    import 'codemirror/addon/hint/css-hint.js'
    import 'codemirror/addon/hint/html-hint.js'
    import 'codemirror/addon/hint/sql-hint.js'
    import 'codemirror/addon/hint/javascript-hint.js'

    // 查找，替换
    import 'codemirror/addon/dialog/dialog.css'
    import 'codemirror/addon/search/matchesonscrollbar.css'
    import 'codemirror/addon/dialog/dialog.js'
    import 'codemirror/addon/search/searchcursor.js'
    import 'codemirror/addon/search/search.js'
    import 'codemirror/addon/scroll/annotatescrollbar.js'
    import 'codemirror/addon/search/matchesonscrollbar.js'
    import 'codemirror/addon/search/jump-to-line.js'

    // 使用sublime的部分快捷键
    import 'codemirror/addon/fold/foldgutter.css'
    import 'codemirror/addon/edit/matchbrackets.js'
    import 'codemirror/addon/edit/closebrackets.js'
    import 'codemirror/addon/comment/comment.js'
    import 'codemirror/addon/wrap/hardwrap.js'
    import 'codemirror/addon/fold/foldcode.js'
    import 'codemirror/addon/fold/brace-fold.js'
    import 'codemirror/keymap/sublime.js'

    // 鼠标点击的那一行能高亮
    import 'codemirror/addon/selection/active-line.js'

    // 格式化
    import beautify from 'js-beautify';


    export default {
        props: {
            value: String,
            config: {
                type: Object,
                default: function() {
                    return {}
                },
            },
            format_config: {
                type: Object,
                default: function() {
                    return {
                        indent_size: 4,
                        space_in_empty_paren: true,
                    }
                },
            },
        },
        data() {  
            return {  
                txt: '',
                editor: void 0,
            }
        },
        created() {

        },
        mounted() {
            this.initEditor();
        },
        destroyed() {
            this.editor.off("change", this.changeHandle);
            this.editor.off("paste", this.pasteHandle);
        },
        methods: {
            initEditor() {
                let self = this;
                let textArea = this.$refs.textArea;
                let default_config = {
                    mode: 'javascript',
                    lineNumbers: true,
                    styleActiveLine: true,
//                    lineWrapping: true,  // 最好关闭，开启会导致代码缩进不整齐
                    matchBrackets: true,
                    theme: "monokai",
                    indentUnit: 4,
                    readOnly: false,
                    extraKeys: {
                        // 全屏
                        "F11": self.fullScreen,
                        // 全屏
                        "Esc": self.exitFullScreen,
                        // 代码展开，收缩
                        "Ctrl-Q": function(cm) {
                            cm.foldCode(cm.getCursor());
                        },
                        // 自动补全
                        "Ctrl-Alt-Space": "autocomplete",
                        // 查找，替换
                        "Alt-F": "findPersistent",
//                    Ctrl-F / Cmd-F
//                    Start searching
//                    Ctrl-G / Cmd-G
//                    Find next
//                    Shift-Ctrl-G / Shift-Cmd-G
//                    Find previous
//                    Shift-Ctrl-F / Cmd-Option-F
//                    Replace
//                    Shift-Ctrl-R / Shift-Cmd-Option-F
//                    Replace all
//                    Alt-F
//                    Persistent search (dialog doesn't autoclose, enter to find next, Shift-Enter to find previous)
//                    Alt-G
//                    Jump to line
                    },
                    foldGutter: true,
                    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
                    keyMap: "sublime",
                    autoCloseBrackets: true,
                    showCursorWhenSelecting: true,
                };

                this.editor = CodeMirror.fromTextArea(textArea, Object.assign(default_config, this.config));
                this.format();
                this.editor.on("change", this.changeHandle);
                this.editor.on("paste", this.pasteHandle);
            },
            format() {
                this.editor.setValue(beautify(this.editor.getValue(), this.format_config));
            },
            fullScreen() {
                let tool_container = this.$refs.tool_container;
                tool_container.classList.toggle('position-absolute');
                tool_container.classList.toggle('position-fixed');
                this.editor.setOption("fullScreen", !this.editor.getOption("fullScreen"));
            },
            exitFullScreen() {
                if (this.editor.getOption("fullScreen")) {
                    this.editor.setOption("fullScreen", false);
                    let tool_container = this.$refs.tool_container;
                    tool_container.classList.toggle('position-absolute');
                    tool_container.classList.toggle('position-fixed');
                }
            },
            changeHandle() {
                this.$emit('input', this.editor.getValue());
            },
            pasteHandle() {
                setTimeout(() => {
                    this.format()
                }, 0)
            }
        }
    }
</script>