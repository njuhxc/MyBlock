if(typeof define!=="function"){
    var define=require("amdefine")(module);
}


define(function(require,exports){
    var fs=require("fs"),
        esprima=require("esprima"),
        escodegen=require("escodegen"),
        hashtable=require("../lib/hashtable");

    //var inputFile="../File/js/assignObject.js";
    //var jsScript=fs.readFileSync(inputFile,"utf-8");
    //var ast=esprima.parse(jsScript);

    /*
     * 判断字符串中是否包含html标签的正则表达式
     * /<(\"[^\"]*\"|'[^']*'|[^'\">])*>/
     */
    var pattern=/<(\"[^\"]*\"|'[^']*'|[^'\">])*>/;
    /*
    * 判断字符串是否包含js关键字
    * */
    var arr=["break","delete","function","return","typeof","case",
    "do","if","switch","var","catch","else","in","this","void","continue",
    "false","instanceof","throw","while","debugger","finally","new","true",
    "with","default","for","null","try","arguments","encodeURI","Infinity",
    "Number","RegExp","Array","encodeURIComponent","isFinite","Object",
    "String","Boolean","Error","isNaN","parseFloat","SyntaxError","Date","eval",
    "JSON","parseInt","TypeError","decodeURI","EvalError","Math","RangeError",
    "undefined","decodeURI","EvalError","Math","RangeError","undefined","decodeURIComponent",
    "Function","NaN","ReferenceError","URIError"];

    function judgeIncludeJSkw(str){
        for(var i=0;i<arr.length;i++){
            if(str.indexOf(arr[i])>=0){
                return true;
            }
        }
        return false;
    }




    function BFS(tmpAst,recordTables){
        if(tmpAst){
            switch (tmpAst.type){
                case "Program":
                    tmpAst.body.forEach(function(partialAst){
                        BFS(partialAst,recordTables);
                    });
                    break;
                case"VariableDeclaration":
                    if(tmpAst.declarations.length!=0){
                        tmpAst.declarations.forEach(function(tmpDeclation){
                            BFS(tmpDeclation,recordTables);
                        });
                    }
                    break;
                case"VariableDeclarator":
                    /*
                     * Todo
                     * 可能要考虑变量名中是否包含ad的问题
                     * */
                    if(tmpAst.init){
                        BFS(tmpAst.init,recordTables);
                    }
                    break;
                case"FunctionExpression":
                    if(tmpAst.params.length!=0){
                        tmpAst.params.forEach(function(item){
                            BFS(item,recordTables);
                        });
                    }
                    if(tmpAst.body){
                        BFS(tmpAst.body,recordTables);
                    }
                    break;
                case"BlockStatement":
                    if(tmpAst.body.length!=0){
                        tmpAst.body.forEach(function(tmpBlock){
                            BFS(tmpBlock,recordTables);
                        });
                    }
                    break;
                case"ObjectExpression":
                    if(tmpAst.properties.length!=0){
                        tmpAst.properties.forEach(function(tmpProperty){
                            BFS(tmpProperty,recordTables);
                        });
                    }
                    break;
                case"Property":
                    if(tmpAst.key){
                        BFS(tmpAst.key,recordTables);
                    }
                    if(tmpAst.value){
                        BFS(tmpAst.value,recordTables);
                    }
                    break;
                case"ExpressionStatement":
                    if(tmpAst.expression){
                        BFS(tmpAst.expression,recordTables);
                    }
                    break;
                case"AssignmentExpression":
                    if(tmpAst.left){
                        BFS(tmpAst.left,recordTables);
                    }

                    if(tmpAst.right){
                        BFS(tmpAst.right,recordTables);
                    }
                    break;
                case"MemberExpression":
                    if(tmpAst.object){
                        BFS(tmpAst.object,recordTables);
                    }
                    if(tmpAst.property){
                        BFS(tmpAst.property,recordTables);
                    }
                    break;
                case"BinaryExpression":
                    if(tmpAst.left){
                        BFS(tmpAst.left,recordTables);
                    }
                    if(tmpAst.right){
                        BFS(tmpAst.right,recordTables);
                    }
                    break;
                case"Literal":
                    if(tmpAst.value){
                        if(tmpAst.value=="load"){
                            var loadNum=recordTables.get("load");
                            recordTables.put("load",loadNum+=1);
                        }else if(tmpAst.value=="beforeunload"){
                            var beforeunloadNum=recordTables.get("beforeunload");
                            recordTables.put("beforeunload",beforeunloadNum+=1);
                        }else if(tmpAst.value=="onload"){
                            var onloadNum=recordTables.get("onload");
                            recordTables.put("onload",onloadNum+=1);
                        }else if(tmpAst.value=="onunload"){
                            var onunloadNum=recordTables.get("onunload");
                            recordTables.put("onunload",onunloadNum+=1);
                        }else if(tmpAst.value=="DOMContentLoaded"){
                            var DOMContentLoadedNum=recordTables.get("DOMContentLoaded");
                            recordTables.put("DOMContentLoaded",DOMContentLoadedNum+=1);
                        }
                        var result=judgeIncludeJSkw(tmpAst.value.toString());
                        if(result){
                            var strIncludeJSNum=recordTables.get("strIncludeJS");
                            recordTables.put("strInclude",strIncludeJSNum+=1);
                        }
                        if(pattern.test(tmpAst.value)){
                            var strIncludeHtmlNum=recordTables.get("strIncludeHtml");
                            recordTables.put("strIncludeHtml",strIncludeHtmlNum+=1);
                        }
                        if(tmpAst.value.lenth>=200){
                            var  strMoreThan200Num=recordTables.get("strMoreThan200");
                            recordTables.put("strMoreThan200",strMoreThan200Num+=1);
                        }
                    }
                    break;
                case"ConditionalExpression":
                    if(tmpAst.test){
                        BFS(tmpAst.test,recordTables);
                    }
                    if(tmpAst.consequent){
                        BFS(tmpAst.consequent,recordTables);
                    }
                    if(tmpAst.alternate){
                        BFS(tmpAst.alternate,recordTables);
                    }
                    break;
                case"Identifier":
                    if(tmpAst.name){
                        //1.事件
                        if(tmpAst.name=="load"){
                            var loadNum=recordTables.get("load");
                            recordTables.put("load",loadNum+=1);
                        }else if(tmpAst.name=="beforeunload"){
                            var beforeunloadNum=recordTables.get("beforeunload");
                            recordTables.put("beforeunload",beforeunloadNum+=1);
                        }else if(tmpAst.name=="onload"){
                            var onloadNum=recordTables.get("onload");
                            recordTables.put("onload",onloadNum+=1);
                        }else if(tmpAst.name=="onunload"){
                            var onunloadNum=recordTables.get("onunload");
                            recordTables.put("onunload",onunloadNum+=1);
                        }else if(tmpAst.name=="DOMContentLoaded"){
                            var DOMContentLoadedNum=recordTables.get("DOMContentLoaded");
                            recordTables.put("DOMContentLoaded",DOMContentLoadedNum+=1);
                        }


                        if(tmpAst.name=="createElement"){
                            var createElementNum=recordTables.get("createEle");
                            recordTables.put("createEle",createElementNum+=1);
                        }else if(tmpAst.name=="appendChild"){
                            var appendChildNum=recordTables.get("appendChild");
                            recordTables.put("appendChild",appendChildNum+=1);
                        }else if(tmpAst.name=="insertBefore"){
                            var insertBeforeNum=recordTables.get("insereBefore");
                            recordTables.put("insertBefore",insertBeforeNum+=1);
                        }else if(tmpAst.name=="replaceChild"){
                            var replaceChildNum=recordTables.get("replaceChild");
                            recordTables.put("replaceChild",replaceChildNum+=1);
                        }else if(tmpAst.name=="getElementById"){
                            var getElementByIdNum=recordTables.get("getEleById");
                            recordTables.put("getEleById",getElementByIdNum+=1);
                        }else if(tmpAst.name=="getElementsByTagName"){
                            var getElesByTagNameNum=recordTables.get("getElesByTagName");
                            recordTables.put("getElesByTagName",getElesByTagNameNum+=1);
                        }else if(tmpAst.nama=="getElementsByName"){
                            var getElesByName=recordTables.get("getElesByName");
                            recordTables.put("getElesByName");
                        }else if(tmpAst.name=="createTextNode"){
                            var createTextNodeNum=recordTables.get("createTextNode");
                            recordTables.put("createTextNode",createTextNodeNum+=1);
                        }else if(tmpAst.name=="split"){
                            var splitNum=recordTables.get("split");
                            recordTables.put("split",splitNum+=1);
                        }else if(tmpAst.name=="splice"){
                            var spliceNum=recordTables.get("splice");
                            recordTables.put("splice",spliceNum+=1);
                        }else if(tmpAst.name=="eval"){
                            var evalNum=recordTables.get("eval");
                            recordTables.put("eval",evalNum+=1);
                        }else if(tmpAst.name=="attachEvent"){
                            var attachEventNum=recordTables.get("attachEvent");
                            recordTables.put("attachEvent",attachEventNum+=1);
                        }else if(tmpAst.name=="setTimeout"){
                            var setTimeoutNum=recordTables.get("setTimeout");
                            recordTables.put("setTimeout",setTimeoutNum+=1);
                        }else if(tmpAst.name=="setInterval"){
                            var setIntervalNum=recordTables.get("setInterval");
                            recordTables.put("setInterval",setIntervalNum+=1);
                        }else if(tmpAst.name=="write"){
                            var documentWriteNum=recordTables.get("documentWrite");
                            recordTables.put("documentWrite",documentWriteNum+=1);
                        }else if(tmpAst.name=="writeln"){
                            var documentWritelnNum=recordTables.get("documentWriteln");
                            recordTables.put("documentWriteln",documentWritelnNum+=1);
                        }else if(tmpAst.name=="setAttribute"){
                            var setAttributeNum=recordTables.get("setAttribute");
                            recordTables.put("setAttribute",setAttributeNum+=1);
                        }else if(tmpAst.name=="escape"){
                            var escapeNum=recordTables.get("escape");
                            recordTables.put("escape",escapeNum+=1);
                        }else if(tmpAst.name=="removeEventListener"){
                            var removeEventListenerNum=recordTables.get("removeEventListener");
                            recordTables.put("removeEventListener",removeEventListenerNum+=1);
                        }
                    }
                    break;
                //这里得到了调用函数的整个语句，如果只是想得到调用的函数，可以进一步拆分得到想要的
                case"CallExpression":
                    if(tmpAst.callee){
                        BFS(tmpAst.callee,recordTables);
                    }
                    if(tmpAst.arguments.length!=0){
                        tmpAst.arguments.forEach(function(item){
                            BFS(item,recordTables);
                        });
                    }
                    break;
                case"IfStatement":
                    if(tmpAst.test){
                        BFS(tmpAst.test,recordTables);
                    }
                    if(tmpAst.consequent){
                        BFS(tmpAst.consequent,recordTables);
                    }
                    if(tmpAst.alternate){
                        BFS(tmpAst.alternate,recordTables);
                    }
                    break;
                case"ReturnStatement":
                    if(tmpAst.argument){
                        BFS(tmpAst.argument,recordTables);
                    }
                    break;
                case"TryStatement":
                    if(tmpAst.block){
                        BFS(tmpAst.block,recordTables);
                    }
                    if(tmpAst.handlers.length!=0){
                        tmpAst.handlers.forEach(function(item){
                            BFS(item,recordTables);
                        });
                    }
                    break;
                case"CatchClause":
                    if(tmpAst.param){
                        BFS(tmpAst.param,recordTables);
                    }
                    if(tmpAst.body){
                        BFS(tmpAst.body,recordTables);
                    }
                    break;
                case"UnaryExpression":
                    if(tmpAst.argument!=null){
                        BFS(tmpAst.argument,recordTables);
                    }
                    break;
                case"ForStatement":
                    if(tmpAst.init){
                        BFS(tmpAst.init,recordTables);
                    }
                    if(tmpAst.test){
                        BFS(tmpAst.test,recordTables);
                    }
                    if(tmpAst.update){
                        BFS(tmpAst.update,recordTables);
                    }
                    if(tmpAst.body){
                        BFS(tmpAst.body,recordTables);
                    }
                    break;
                case "FunctionDeclaration":
                    if(tmpAst.body){
                        BFS(tmpAst.body,recordTables);
                    }
                    if(tmpAst.params.length!==0){
                        tmpAst.params.forEach(function(item){
                           BFS(item,recordTables);
                        });
                    }
                    break;
                case "UpdateExpression":
                    if(tmpAst.argument){
                        BFS(tmpAst.argument,recordTables);
                    }
                    break;
                case "NewExpression":
                    if(tmpAst.arguments.length!=0){
                        BFS(tmpAst.arguments.forEach(function(item){
                            BFS(item,recordTables);
                        }));
                    }
                    break;
                case "WhileStatement":
                    if(tmpAst.test){
                        BFS(tmpAst.test,recordTables);
                    }
                    if(tmpAst.body){
                        BFS(tmpAst.body,recordTables);
                    }
                    break;
                case "SequenceExpression":
                    if(tmpAst.expressions.length!=0){
                        tmpAst.expressions.forEach(function(item){
                            BFS(item,recordTables);
                        });
                    }
                    break;
                case "ArrayExpression":
                    if(tmpAst.elements.length!=0){
                        tmpAst.elements.forEach(function(item){
                            BFS(item,recordTables);
                        });
                    }
                    break;
                case "LogicalExpression":
                    if(tmpAst.left){
                        BFS(tmpAst.left,recordTables);
                    }
                    if(tmpAst.right){
                        BFS(tmpAst.right,recordTables);
                    }
                    break;
                case "ThrowStatement":
                    if(tmpAst.argument){
                        BFS(tmpAst.argument,recordTables);
                    }
                    break;
                case "EmptyStatement":
                    break;
                case "DoWhileStatement":
                    if(tmpAst.body){
                        BFS(tmpAst.body,recordTables);
                    }
                    if(tmpAst.test){
                        BFS(tmpAst.test,recordTables);
                    }
                    break;
                case "WithStatement":
                    if(tmpAst.object){
                        BFS(tmpAst.object,recordTables);
                    }
                    if(tmpAst.body){
                        BFS(tmpAst.body,recordTables);
                    }
                    break;
                case "ForInStatement":
                    if(tmpAst.left){
                        BFS(tmpAst.left,recordTables);
                    }
                    if(tmpAst.right){
                        BFS(tmpAst.right,recordTables);
                    }
                    if(tmpAst.body){
                        BFS(tmpAst.body,recordTables);
                    }
                    break;
                case "BreakStatement":
                    break;
                case "SwitchStatement":
                    if(tmpAst.discriminant){
                        BFS(tmpAst.discriminant,recordTables);
                    }
                    if(tmpAst.cases.length!=0){
                        tmpAst.cases.forEach(function(item){
                            BFS(item,recordTables);
                        });
                    }
                    break;
                case "SwitchCase":
                    if(tmpAst.test){
                        BFS(tmpAst.test,recordTables);
                    }
                    if(tmpAst.consequent.length!=0){
                        tmpAst.consequent.forEach(function(item){
                            BFS(item,recordTables);
                        });
                    }
                    break;
                case"ContinueStatement":
                    break;
                case "ThisExpression":
                    break;
                case "LabeledStatement":
                    if(tmpAst.label){
                        BFS(tmpAst.label,recordTables);
                    }
                    if(tmpAst.body){
                        BFS(tmpAst.body,recordTables);
                    }
                    break;
                default :
                    throw new Error(tmpAst.type);

            }
        }
    }

    //BFS(ast);
    exports.BFS=BFS;
});