import * as util from '../../js/common/util'
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style type="text/css">
        * {
            margin:0px;
            padding:0px;
            box-sizing: border-box;
        }

        body, input, select, button, textarea {
            font-size: 14px;
            font-family: 'Microsoft YaHei',Tahoma, Geneva, sans-serif;
        }
        
        button, input {
            border-width: 0px;
            outline: none;
        }  


        
        body, html {
            width:100%;
            height:100%;
        } 

        .container {
            width:100%;
            height:100%;
            background: #EFF3CD;
            overflow:hidden
        }

        :root {
          --main-bg-color: green;
        }

        .one {
          width:100px;
          height:100px;
          background-color: var(--main-bg-color);
        }

        .two {
          width:100px;
          height:100px;                
          background-color:var(--main-bg-color);
        }

        .readonly-input {
          -webkit-appearance: textfield;
          background-color: white;
          -webkit-rtl-ordering: logical;
          user-select: text;
          cursor: auto;
          padding: 1px;
          border-width: 2px;
          border-style: inset;
          border-color: initial;
          border-image: initial;
          text-rendering: auto;
          color: initial;
          letter-spacing: normal;
          word-spacing: normal;
          text-transform: none;
          text-indent: 0px;
          text-shadow: none;
          display: inline-block;
          text-align: start;
          margin: 0em 0em 0em 0em;
          font: 11px BlinkMacSystemFont;
          -webkit-writing-mode: horizontal-tb;
          width:100px;
          height:30px;
          vertical-align: middle;
        }

        .readonly-input:focus {
          outline-offset: -2px;
          outline: -webkit-focus-ring-color auto 5px;
        }

        .btnStyle {
          background-color: #CDECCC;
          padding: 5px;
          border:solid 2px #321D2E;
        }

        .btnStyle:hover {
          background-color: #FAD089;
          border:solid 2px #FF9C5B;
          cursor: pointer;
        }

        .inputStyle {
          width:200px;
          height:35px;
          line-height:35px;
        }

        .subContainer {
          margin:5px 5px 0px 5px;
        }
    </style>
