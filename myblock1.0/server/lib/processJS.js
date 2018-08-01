/**
 * Created by user on 2016/8/3.
 */
if(typeof define!=="function"){
    var define=require("amdefine")(module);
}
define(function(require,exports){
    var fs=require("fs"),
        esprima=require("esprima"),
        escodegen=require("escodegen"),
        hashtable=require("../lib/hashtable"),
        processAST=require("../lib/testProcessAST");


    /*
     *��Ϊ������ں����ڲ�����ÿ��ֻ��дһ���ļ��ģ�����
     * �������棬���ڼ�¼����Ľ��
     * */


    //var path=["Flash","hijackingAttack","JRE","multimedia","PDFreader","redirectingAttack","toolkits","vulnerabilities","Benign"];
    //var dir="../malicious/";
    var BFS=processAST.BFS;

    //path.forEach(function(item){
    //    var fullPath=dir+item;
    //    if(item=="Benign"){
    //        readFile(fullPath,1);
    //    }else{
    //        readFile(fullPath,0);
    //    }
    //});


    /*
    * �����ܽ����õ���javascriptʱ�����ܳ��쳣��������null
    * */
    function processJSScript(path){
        var jsScript=fs.readFileSync(path,"utf-8");
        try{
            var ast=esprima.parse(jsScript);
            var recordTables=storageData();
            BFS(ast,recordTables);
            var finalOutput=compositeResult(recordTables);
        }catch (e){
            return finalOutput=null;
        }

        return finalOutput;
    }







    function processBinaryOper(binaryOperArr){
        var addNum=0;
        binaryOperArr.forEach(function(item){
            if(item=="+"){
                addNum++;
            }
        });
        return addNum;
    }


    exports.processJSScript=processJSScript;

});