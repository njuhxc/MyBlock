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


    //判断某个字符串中包含ad的数量
    /*
    * param str要判断的字符串
    * return 子符串中包含的ad数量
    * */
    function judgeStrIncludeAdNum(str){
        var num=0;
        var index=str.indexOf("ad");
        while(index>0){
            index=str.indexOf("ad",index+2);
            num++;
        }
        return num;
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
                    var operator=tmpAst.operator;
                    if(operator=="+="){
                        var addEqualSymbolicNum=recordTables.get("addEqualSymbolic");
                        recordTables.put("addEqualSymbolic",addEqualSymbolicNum+=1);
                    }
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
                    var operator=tmpAst.operator;
                    if(operator=="+"){
                        var addSymbolicNum=recordTables.get("addSymbolic");
                        recordTables.put("addSymbolic",addSymbolicNum+=1);
                    }
                    if(tmpAst.left){
                        BFS(tmpAst.left,recordTables);
                    }
                    if(tmpAst.right){
                        BFS(tmpAst.right,recordTables);
                    }
                    break;
                case"Literal":
                    var strAllNumTmp=recordTables.get("strAll");
                    recordTables.put("strAll",strAllNumTmp+=1);
                    if(tmpAst.value){
                        var str=tmpAst.value.toString().toLocaleLowerCase();
                        if(str.indexOf("ad")>0){
                            var strAdNumTmp=recordTables.get("strAd");
                            recordTables.put("strAd",strAdNumTmp+=1);
                        }
                        if(tmpAst.value=="onload"){
                            var onloadNumTmp=recordTables.get("onload");
                            recordTables.put("onload",onloadNumTmp+=1);
                        }else if(tmpAst.value=="onerror"){
                            var onerrorNum=recordTables.get("onerror");
                            recordTables.put("onerror",onerrorNum+=1);
                        }else if(tmpAst.value=="onclick"){
                            var onclickNum=recordTables.get("onclick");
                            recordTables.put("onclick",onclickNum+=1);
                        }else if(tmpAst.value=="onblur"){
                            var onblurNum=recordTables.get("onblur");
                            recordTables.put("onblur",onblurNum);
                        }else if(tmpAst.value=="DOMContentLoaded"){
                            var DOMContentLoadedNum=recordTables.get("DOMContentLoaded");
                            recordTables.put("DOMContentLoaded",DOMContentLoadedNum+=1);
                        }else if(tmpAst.value=="onscroll"){
                            var onscrollNum=recordTables.get("onscroll");
                            recordTables.put("onscroll",onscrollNum+=1);
                        }else if(tmpAst.value=="isArray"){
                            var isArrayNum=recordTables.get("isArray");
                            recordTables.put("isArray",isArrayNum+=1);
                        }else if(tmpAst.value=="referrer"){
                            var referrerNum=recordTables.get("referrer");
                            recordTables.put("referrer",referrerNum+=1);
                        }else if(tmpAst.value=="cookie"){
                            var cookieNum=recordTables.get("cookie");
                            recordTables.put("cookie",cookieNum+=1);
                        }else if(tmpAst.value=="attachEvent"){
                            var attachEventNum=recordTables.get("attachEvent");
                            recordTables.put("attachEvent",attachEventNum+=1);
                        }else if(tmpAst.value=="getAttribute"){
                            var getAttributeNum=recordTables.get("getAttribute");
                            recordTables.put("getAttribute",getAttributeNum+=1);
                        }else  if(tmpAst.value=="getYear"){
                            var getYearNum=recordTables.get("getYear");
                            recordTables.put("getYear",getYearNum+=1);
                        }else if(tmpAst.value=="getMonth"){
                            var getMonthNum=recordTables.get("getMonth");
                            recordTables.put("getMonth",getMonthNum+=1);
                        }else if(tmpAst.value=="addClass"){
                            var addClassNum=recordTables.get("addClass");
                            recordTables.put("addClass",addClassNum+=1);
                        }else if(tmpAst.value=="createTextNode"){
                            var createTextNodeNum=recordTables.get("createTextNode");
                            recordTables.put("createTextNode",createTextNodeNum+=1);
                        }else if(tmpAst.value=="push"){
                            var pushNum=recordTables.get("push");
                            recordTables.put("push",pushNum+=1);
                        }else if(tmpAst.value=="encodeURIComponent"){
                            var encodeURIComponentNum=recordTables.get("encodeURIComponent");
                            recordTables.put("encodeURIComponent",encodeURIComponentNum+=1);
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
                    var idenAllNumTmp=recordTables.get("idenAll");
                    recordTables.put("idenAll",idenAllNumTmp+=1);
                    if(tmpAst.name){
                        var iden=tmpAst.name.toString().toLocaleLowerCase();
                        if(iden.indexOf("ad")>0){
                            var idenAdNumTmp=recordTables.get("idenAd");
                            recordTables.put("idenAd",idenAdNumTmp+=1);
                        }
                        if(tmpAst.name=="onload"){
                            var onloadNumTmp=recordTables.get("onload");
                            recordTables.put("onload",onloadNumTmp+=1);
                        }else if(tmpAst.name=="onerror"){
                            var onerrorNum=recordTables.get("onerror");
                            recordTables.put("onerror",onerrorNum+=1);
                        }else if(tmpAst.name=="onclick"){
                            var onclickNum=recordTables.get("onclick");
                            recordTables.put("onclick",onclickNum+=1);
                        }else if(tmpAst.name=="onblur"){
                            var onblurNum=recordTables.get("onblur");
                            recordTables.put("onblur",onblurNum);
                        }else if(tmpAst.name=="DOMContentLoaded"){
                            var DOMContentLoadedNum=recordTables.get("DOMContentLoaded");
                            recordTables.put("DOMContentLoaded",DOMContentLoadedNum+=1);
                        }else if(tmpAst.name=="onscroll"){
                            var onscrollNum=recordTables.get("onscroll");
                            recordTables.put("onscroll",onscrollNum+=1);
                        }else if(tmpAst.name=="isArray"){
                            var isArrayNum=recordTables.get("isArray");
                            recordTables.put("isArray",isArrayNum+=1);
                        }else if(tmpAst.name=="referrer"){
                            var referrerNum=recordTables.get("referrer");
                            recordTables.put("referrer",referrerNum+=1);
                        }else if(tmpAst.name=="cookie"){
                            var cookieNum=recordTables.get("cookie");
                            recordTables.put("cookie",cookieNum+=1);
                        }else if(tmpAst.name=="attachEvent"){
                            var attachEventNum=recordTables.get("attachEvent");
                            recordTables.put("attachEvent",attachEventNum+=1);
                        }else if(tmpAst.name=="getAttribute"){
                            var getAttributeNum=recordTables.get("getAttribute");
                            recordTables.put("getAttribute",getAttributeNum+=1);
                        }else  if(tmpAst.name=="getYear"){
                            var getYearNum=recordTables.get("getYear");
                            recordTables.put("getYear",getYearNum+=1);
                        }else if(tmpAst.name=="getMonth"){
                            var getMonthNum=recordTables.get("getMonth");
                            recordTables.put("getMonth",getMonthNum+=1);
                        }else if(tmpAst.name=="addClass"){
                            var addClassNum=recordTables.get("addClass");
                            recordTables.put("addClass",addClassNum+=1);
                        }else if(tmpAst.name=="createTextNode"){
                            var createTextNodeNum=recordTables.get("createTextNode");
                            recordTables.put("createTextNode",createTextNodeNum+=1);
                        }else if(tmpAst.name=="push"){
                            var pushNum=recordTables.get("push");
                            recordTables.put("push",pushNum+=1);
                        }else if(tmpAst.name=="encodeURIComponent"){
                            var encodeURIComponentNum=recordTables.get("encodeURIComponent");
                            recordTables.put("encodeURIComponent",encodeURIComponentNum+=1);
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
                    var tryNumTmp=recordTables.get("try");
                    recordTables.put("try",tryNumTmp+=1);
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
                    var throwNumTmp=recordTables.get("throw");
                    recordTables.put("throw",throwNumTmp+=1);
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