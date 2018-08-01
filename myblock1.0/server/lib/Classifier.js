/**
 * Created by hxc.
 * Most part of the original file is created by wr.
 */

if(typeof define!=='function'){
    var define=require('amdefine')(module);
}

define(function(require,exports) {
    var fs = require("fs"),
        esprima = require("esprima"),
        escodegen = require("escodegen"),
        hashtable = require("../lib/hashtable"),
        processAST = require("../lib/testProcessAST3");
    var BFS = processAST.BFS;

//main API
    function Classifier(path) {
//var path="../input/input.js";
//此处用于接收提取的js文件
        var finalOutput = main(path);
        //var outputFile = "../output/result.txt";
//将提取出来的特征向量写入文件，到正式运行时省去该步骤
        //fs.writeFileSync(outputFile, finalOutput, "utf-8");
        var test = finalOutput.split(",");
        var newArray = new Array();//new Array();
        for (var i = 0; i < test.length - 1; i++) {
            var arrOne = parseInt(test[i]);
            newArray.push(arrOne);
        }
        newArray.push(1);
//newArray数组存储特征向量
//console.log(newArray);
        var beta = new Array(53.0308,-6.43595,-11.1992,-17.2357,0,-2.57121,1.46885,-1.79864,0,2.82472,0,21.994,13.6356,3.04403,5.08137,-0.233875,0.142215,1.44681,-20.3453,0,3.03652,3.74406);
//[119.611,-24.6259,-50.7774,-57.6551,0,-9.61048,4.51716,-6.32077,0,-28.4631,0,27.7343,15.1819,-1.20325,7.70935,-1.27959,-3.24467,-6.58664,-54.6804,0,6.00644,-2.6731];
//分类器模型参数beta
//console.log(beta);
        var z = 0;
        for (var j = 0; j < 22; j++) {
            var x = parseFloat(newArray.pop());
            var y = parseFloat(beta.pop());
            //console.log(x);
            //console.log(y);
            //console.log(x*y);
            z += -x * y;
            //  console.log(z);
        }
        //console.log(z);
//目前特征共21个，训练出来的向量为21x1
        z = Math.exp(z) + 1;
        //console.log(z);
        z = 1 / z;
        //console.log(z);
        var ret = 0;
        if (z >= 0.5) {
         //   console.log("ad\n");
            ret = 1;
        }
        else {
         //   console.log("other\n");
            ret = 0;
        }
        return ret;
    }

    function storageData() {
        var recordTables = new hashtable.HashTable();
        var tryNum = 0, throwNum = 0;
        recordTables.put("try", tryNum);
        recordTables.put("throw", throwNum);
        var onloadNum = 0, onclickNum = 0, onfocusNum = 0, onblurNum = 0, onmousemoveNum = 0, onmousedownNum = 0, onmouseupNum = 0;
        recordTables.put("onload", onloadNum);
        recordTables.put("onclick", onclickNum);
        recordTables.put("onfocus", onfocusNum);
        recordTables.put("onblur", onblurNum);
        recordTables.put("onmousemove", onmousemoveNum);
        recordTables.put("onmousedown", onmousedownNum);
        recordTables.put("onmouseup", onmouseupNum);

        var createElementNum = 0, getElementsByTagNameNum = 0, getElementByIdNum = 0,
            writeNum = 0, writelnNum = 0, referrerNum = 0, getMonthNum = 0, getYearNum = 0,
            setAttributeNum = 0, getAttributeNum = 0;

        recordTables.put("createElement", createElementNum);
        recordTables.put("getElementsByTag", getElementsByTagNameNum);
        recordTables.put("getElementById", getElementByIdNum);
        recordTables.put("write", writeNum);
        recordTables.put("writeln", writelnNum);
        recordTables.put("referrer", referrerNum);
        recordTables.put("getYear", getYearNum);
        recordTables.put("getMonth", getMonthNum);
        recordTables.put("setAttribute", setAttributeNum);
        recordTables.put("getAttribute", getAttributeNum);
        var strAdNum = 0, idenAdNum = 0;
        recordTables.put("strAd", strAdNum);
        recordTables.put("idenAd", idenAdNum);
        var strAllNum = 0, idenAllNum = 0;
        recordTables.put("strAll", strAllNum);
        recordTables.put("idenAll", idenAllNum);

        return recordTables;
    }

    function main(inputFile) {
        var finalOutput = "";
        var fullFilePath = inputFile;//不再有input文件夹，而是仅仅传过来一个需要测试的js文件
        var states = fs.statSync(fullFilePath);
        var jsScript = fs.readFileSync(fullFilePath, "utf-8");
        //  console.log(fullFilePath);
        var ast = esprima.parse(jsScript);
        var recordTables = storageData();
        BFS(ast, recordTables);
        var individualOutput = compositeResult(recordTables);
        finalOutput += individualOutput;
        return finalOutput;
    }

    function compositeResult(recordTables) {
        var output = "";
        var strAllNum = parseInt(recordTables.get("strAll"));
        var idenAllNum = parseInt(recordTables.get("idenAll"));
        var all = strAllNum + idenAllNum;
        var tryNum = parseInt(recordTables.get("try"));
        var throwNum = parseInt(recordTables.get("throw"));
        var onloadNum = parseInt(recordTables.get("onload"));
        var onclickNum = parseInt(recordTables.get("onclick"));
        var onfocusNum = parseInt(recordTables.get("onfocus"));
        var onblurNum = parseInt(recordTables.get("onblur"));
        var onmousemoveNum = parseInt(recordTables.get("onmousemove"));
        var onmousedownNum = parseInt(recordTables.get("onmousedown"));
        var onmouseupNum = parseInt(recordTables.get("onmouseup"));
        var createElementNum = parseInt(recordTables.get("createElement"));
        var getElesByTagNum = parseInt(recordTables.get("getElementsByTag"));
        var getEleByIdNum = parseInt(recordTables.get("getElementById"));
        var writeNum = parseInt(recordTables.get("write"));
        var writelnNum = parseInt(recordTables.get("writeln"));
        var referrerNum = parseInt(recordTables.get("referrer"));
        var getYearNum = parseInt(recordTables.get("getYear"));
        var getMonthNum = parseInt(recordTables.get("getMonth"));
        var setAttributeNum = parseInt(recordTables.get("setAttribute"));
        var getAttributeNum = parseInt(recordTables.get("getAttribute"));
        var strAdNum = parseInt(recordTables.get("strAd"));
        var idenAdNum = parseInt(recordTables.get("idenAd"));
        var tryRate = tryNum;
        var throwRate = throwNum;
        var onloadRate = onloadNum;
        var onclickRate = onclickNum;
        var onfocusRate = onfocusNum;
        var onblurRate = onblurNum;
        var onmousemoveRate = onmousemoveNum;
        var onmousedownRate = onmousedownNum;
        var onmouseupRate = onmouseupNum;
        var createEleRate = createElementNum;
        var getElesByTagRate = getElesByTagNum;
        var getEleByIdRate = getEleByIdNum;
        var writeRate = writeNum;
        var writelnRate = writelnNum;
        var referrerRate = referrerNum;
        var getYearRate = getYearNum;
        var getMonthRate = getMonthNum;
        var setAttributeRate = setAttributeNum;
        var getAttributeRate = getAttributeNum;
        var strAdRate = strAdNum;
        var idenAdRate = idenAdNum;
        output += tryRate + "," + throwRate + ",";
        output += onloadRate + "," + onclickRate + "," + onfocusRate + "," + onblurRate + ",";
        output += onmousemoveRate + "," + onmousedownRate + "," + onmouseupRate + ",";
        output += createEleRate + "," + getElesByTagRate + "," + getEleByIdRate + ",";
        output += writeRate + "," + writelnRate + "," + referrerRate + "," + getYearRate + ",";
        output += getMonthRate + "," + setAttributeRate + "," + getAttributeRate + ",";
        output += strAdRate + "," + idenAdRate + ",";

        return output;//删去打标记的过程，因为只有特征向量
    }
    exports.Classifier=Classifier;
})



