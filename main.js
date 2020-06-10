let fs = require("fs");
let request = require("request");
let cheerio = require("cheerio");
console.log("Sending Request");
let url = "https://www.monsterindia.com/search/it-computers-software-jobs?searchId=79207d2d-7bea-408b-8d4a-f4bf5cf3e2ad"

request(url,cb);
function cb(err,response, html){
    console.log("Recieved Response");
    if(err == null && response.statusCode == 200){
        fs.writeFileSync("main.html",html);
        console.log("File saved");
        parseHtmlPage(html);
    }else if(response.statusCode == 404)
    {
        console.log("Page not found");
    }else {
        console.log(err);
        console.log(response.statusCode);
    }
}
let arr = [];
function parseHtmlPage(html){
    console.log("Parsing Html");
    let $ = cheerio.load(html);
    console.log("''''''''''''''''");
    // links = [];
    let AllJobs = $('.card-panel');
    console.log(AllJobs.length);
    // $(AllJobs).each(function(){
    //     let link = $();
    // })
    for(let i=0;i<AllJobs.length;i++)
    {
        let jobTitle = $(AllJobs[i]).find('.job-tittle h3 a');
        let link = $(jobTitle).attr('href');
        console.log($(jobTitle).text()+" "+link);
        let obj = {
            title: $(jobTitle).text(),
            link: link
        } ;
        arr.push(obj);
    }
    // console.table(arr);
    fs.writeFileSync("main.txt",arr);
    console.log(fs.readFileSync("main.txt","utf8"));

}
    
