<style>
</style>
<template>
    <div>
        <div style="float:left;width:50%;">
            <code-editor v-model="msg"></code-editor>
        </div>
        {{ msg }}
    </div>
</template>
<script>
    import CodeEditor from './codeEditor.vue';

    export default {
        components: {
            CodeEditor,
        },
        data() {
            return {
                msg: '',
            }
        },
        created() {
            this.msg = "function joinLines(cm) {\n" +
                "  var ranges = cm.listSelections(), joined = [];\n" +
                "  for (var i = 0; i < ranges.length; i++) {\n" +
                "    var range = ranges[i], from = range.from();\n" +
                "    var start = from.line, end = range.to().line;\n" +
                "    while (i < ranges.length - 1 && ranges[i + 1].from().line == end)\n" +
                "      end = ranges[++i].to().line;\n" +
                "    joined.push({start: start, end: end, anchor: !range.empty() && from});\n" +
                "  }\n" +
                "  cm.operation(function() {\n" +
                "    var offset = 0, ranges = [];\n" +
                "    for (var i = 0; i < joined.length; i++) {\n" +
                "      var obj = joined[i];\n" +
                "      var anchor = obj.anchor && Pos(obj.anchor.line - offset, obj.anchor.ch), head;\n" +
                "      for (var line = obj.start; line <= obj.end; line++) {\n" +
                "        var actual = line - offset;\n" +
                "        if (line == obj.end) head = Pos(actual, cm.getLine(actual).length + 1);\n" +
                "        if (actual < cm.lastLine()) {\n" +
                "          cm.replaceRange(\" \", Pos(actual), Pos(actual + 1, /^\\s*/.exec(cm.getLine(actual + 1))[0].length));\n" +
                "          ++offset;\n" +
                "        }\n" +
                "      }\n" +
                "      ranges.push({anchor: anchor || head, head: head});\n" +
                "    }\n" +
                "    cm.setSelections(ranges, 0);\n" +
                "  });\n" +
                "}"
        },
    }
</script>