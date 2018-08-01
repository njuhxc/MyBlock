if(typeof define !== 'function'){
    var define = require('amdefine')(module);
}

define(function(require, exports){
    const fs = require('fs');
    const readline = require('readline');
    const path = require('path');
//console.log(__dirname);
    const filepath = path.join(__dirname,"list.txt")
/*
var myread = readline.createInterface({
        input: fs.createReadStream(filepath)
//	console.log('file read')
    }*/

    var listArray = new Array();

    var content;

    var data = fs.readFileSync('list.txt','utf-8',function (err,data) {
      if(err) {
          console.log(err);
      }
      //else{
        //data.toString().split('\n');
//         console.log(data);
//        console.log(data.toString().split('\n'));
    //    }
    })

    var whiteData = fs.readFileSync('whiteList.txt','utf-8',function(err,whiteData){
        if(err) {
            console.log(err);
        }
    })
//console.log(data);
//console.log(listArray);
    var arr = data.toString().split("\r\n");
//    console.log(arr);
    var i = 0;
    var j=0;

    var whiteArr = whiteData.toString().split("\r\n");

/*myread.on('line',function(line){
    console.log('Line '+i.toString()+": "+line);
    listArray[i] = line;
    i++;
});

myread.close("close",function(){
    console.log("read close");
});*/

/*fs.readFile('lib/list.txt','utf-8',function(err,data){
	if(err){
		console.log(err);
	}else{
		console.log(data);
	}
});*/



function judgeList(needUrl){
    /*	var read1 = readline.createInterface({
            input:fs.createReadStream('lib/list.txt');
        })
        var i = 1;
        var flag = 0;
        read1.on('line',(line)=>{
            console.log('Line from file:'+i+":"+line);
            i+=1;
            if(needUrl.indexOf(line)!=-1){
                flag = 1;
                console.log("find ad.js");
                return true;
            }
        })
        if(flag == 0){
            if(needUrl.indexOf("ad")!=-1){
                console.log("find ad");
                return true;
            }
            else{
                console.log("not find ad.js");
                return false;
            }
        }
        read1.on("close", function){
            console.log("read close");
        }
        */
    var flag = 0;
 //   console.log(listArray);
    for(var j = 0; j < whiteArr.length; j++){
        if(needUrl.indexOf(whiteArr[j])!=-1){
            console.log("url " + needUrl+" matches whiteList: "+whiteArr[j]);
            return "notAd";
        }
    }
    for(var i = 0; i < arr.length; i++){
        if(needUrl.indexOf(arr[i])!=-1){
            console.log('url '+ needUrl+' matches '+arr[i]);
      //      console.log(arr[i]);
            return "Ad";
        }
    }
 /*   if(needUrl.indexOf("ad")!=-1){
        console.log('url'+needUrl+'find ad');
        return true;
    }*/
 //   console.log('url ' +needUrl+' not ad');
    return "undefined";
//	fs.readFile("lib/list.txt","utf-8",)
}
function writeFile(ifAd, myUrl) {
    addUrl = '\r\n'+ myUrl;
    if(ifAd){
        fs.appendFileSync("list.txt",addUrl);
        arr.push(myUrl);
    }
    else{
        fs.appendFileSync("whiteList.txt",addUrl);
        whiteArr.push(myUrl);
    }
}
    exports.judgeList = judgeList;
exports.writeFile = writeFile;
})
//const myurl = ".../o.js";
//const myurl = "http://ad.wang502.com/d/105/statz.js";
//var res = judgeList(myurl);
//console.log(res);