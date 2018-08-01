/**
 * Created by user on 2017/10/10.
 */
const url=require("url");
const http=require("http");
const https=require("https");
const fs=require("fs");
var classifier=require("../lib/Classifier");
var Classifier=classifier.Classifier;
var judgeList=require("../lib/judgeList");
var judge=judgeList.judgeList;
var write = judgeList.writeFile;

//var flag=0;

function httpRequest(path,picName,res){
    var sendresult="undefined";
    var is_ad_url=judge(path);
    if(is_ad_url=="Ad"){
        sendresult="ad";
        console.log("blacklist blocking");
        res.end(sendresult);}
    else if(is_ad_url=="notAd")
    {
        sendresult="notad";
        console.log("whitelist passing");
        res.end(sendresult);
    }
    else {
    try{http.get(path,(resp)=>{
        console.log('statusCode',resp.statusCode);
    //console.log('headers',resp.headers);
    let data="";
    resp.setEncoding("binary");
    resp.on("data",function(chunk){
        data+=chunk;
    });
    resp.on("end",function(){
        //var imgPath="../js/"+flag+"."+picName;
        var imgPath="../js/"+picName;
        //flag++;
        //console.log('picName',picName);
        fs.writeFile(imgPath,data,"binary",function(err){
            if(err){
                console.log("down fail");
            }
            res.writeHead(200,{
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'text/plain;charset=utf-8'
            });
            //var sendResult="false";
            //res.end(sendResult);
            //fs.unlink(imgPath,function(){
            //    console.log("delete success");
            //});
            console.log("down success");
            var ret=Classifier(imgPath);
            //var sendresult="undefined";
            if(ret==1){
                console.log("ad");
           //     write(true,path);
                sendresult="ad";}
            else if(ret==0){
                console.log("notad");
            //    write(false,path);
                sendresult="notad";}
            //var sendResult="false";
            res.end(sendresult);
        });
    });
});}catch(e){ console.error(e.message); }}
}

function httpsRequest(path,picName,res){
    var sendresult="undefined";
    var is_ad_url=judge(path);
    if(is_ad_url=="Ad"){
        sendresult="ad";
        console.log("blacklist blocking");
        res.end(sendresult);}
    else if(is_ad_url=="notAd")
    {
        sendresult="notad";
        console.log("whitelist passing");
        res.end(sendresult);
    }
    else {
    try{https.get(path,(resp)=>{
        console.log('statusCode',resp.statusCode);
    //console.log('headers',resp.headers);
    let data="";
    resp.setEncoding("binary");
    resp.on("data",function(chunk){
        data+=chunk;
    });
    resp.on("end",function(){
        //flag++;
        //var imgPath="../js/"+flag+"."+picName;
        var imgPath="../js/"+picName;
        //console.log('data',data);
        fs.writeFile(imgPath,data,"binary",function(err){
            if(err){
                console.log("down fail");
            }
            res.writeHead(200,{
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'text/plain;charset=utf-8'
            });
            //var sendResult="false";
            //res.end(sendResult);
            //fs.unlink(imgPath,function(){
            //    console.log("delete success");
            //});
            console.log("down success");
            var ret=Classifier(imgPath);
            var sendresult="undefined";
            if(ret==1){
                console.log("ad");
          //      write(true,path);
                sendresult="ad";
            }
            else if(ret==0){
                console.log("notad");
           //     write(false,path);
                sendresult="notad";
            }
            res.end(sendresult);
        });
    });
});}catch(e){ console.error(e.message); }}
}

const server=http.createServer((req,res)=>{
        const path=url.parse(req.url).path.slice(1); //得到的是要请求图片的url
console.log(path);
const pathArr=path.split("/");
var picName=pathArr[pathArr.length-1];
console.log('picName',picName);
var protocol=path.split("//")[0];
if(protocol){
    if(protocol.indexOf('https')!=-1){
        httpsRequest(path,picName,res);
    }else{
        httpRequest(path,picName,res);
    }
}else{
    path="http:"+path;
    httpRequest(path,picName,res);
}
console.log("start");


console.log("finish");
}).listen(3001,'127.0.0.1');

console.log("启动服务，监听127.0.0.1:3001");