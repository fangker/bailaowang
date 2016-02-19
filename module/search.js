var request=require('request');
var Cheerio=require('cheerio');
var Entitles=require('html-entities').XmlEntities;
var Url=require('url');
function Search (re){
    this.key = re.key;
    this.page=re.page
};
module.exports=Search;
Search.prototype.find=function(callback) {
    var key = {
        key:this.key,
        page:this.page
    };
    var  queryq = {
        url:'http://cn.bing.com/search?q='+'site:pan.baidu.com '+key.key+'&first='+this.page,
        headers:{
            'cookie':'SRCHUID=V=2&GUID=0DC3F004C1024FAD89E7B909A82F22E0; MUIDB=35C4A1466BBF638F32ABA92F6FBF6267; MUID=35C4A1466BBF638F32ABA92F6FBF6267; SRCHD=AF=IESS02; SRCHUSR=AUTOREDIR=0&GEOVAR=&DOB=20151230; SRCHHPGUSR=CW=1519&CH=324&DPR=1.25&NEWWND=1&NRSLT=50&AS=1&NNT=1&HIS=1&HAP=0; ANON=A=6EF56BD3E3B71549C914CBE4FFFFFFFF&E=11d1&W=1; NAP=V=1.9&E=1177&C=p7DKDOI-Jfg5OBpD-xBgpzLpuroFLO0-2BuLkPOXw8_K-akpdgqrHQ&W=1; _SS=SID=0650419DF5946E5F2DF1493AF4866F46&bIm=99348%3a&HV=1453690792&PC=EUPP_; _EDGE_S=mkt=zh-cn&SID=102475C36F8169A223817D646E206833; _UR=D=0; SCRHDN=ASD=0&DURL=#; KievRPSAuth=FAA6ARRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACNJhQUs0oT/j%2BABnFy5OYGxv6%2BKJqUTDLJtDTcvNXtnMrh8I32uhzIlOHH7v7fj9rMdjK/TJSeF%2BAFarx32EXLH0m0O0t8onfxfrZctS01lVM4qLhCWmZCn1bJgw6iuvt1L7/X3rhWkD7xL0jlnc8HwqHKZwtsp0GOf3YkPQSAhqDh6nJbgNEG63E9A2Cr418TH0PLgipcvSjUYv1dqeIyNHUoeYuOH03j2ioZNqy2Z1Uonkkn0N7ifjJPacLONRcB/UDCp3dN0M9s0MeFq/zPTg8/sdycjT0/I0gSPnPE1d14G12ksK1YuzA3GtXzxl%2Bvhzz69wPPzzf9/5lJ0bKhKKUhQArIFdkAN3y/EKG2KHd0FlgtNLYnE%3D; PPLState=1; _U=13Jtf184vqrnZHnTCh6Jk_iGYb35aenhGeC8fkNZ8d9ri6RAGoIoZdGgq71ATfrrIICwgvu3ApcCwhZdiSQy8oUxVjN6YWOZ2unyCLjV1G_Y; WLS=C=9e493b5505188972&N=ge; WLID=gvZ5Luand4hgDnnHPrV/lvxy8OA20rjbCLXrO2zszR9A6gPLqCySsELTp/NIRi0Gu5bEYL+tQA8eqsfMktdUZXvhpM6axklauUUXpWESDKA=; _FP=hta=on; SRCHS=PC=EUPP_'
        }
    };
    var classList=[];
request.get(queryq,function(error,response,body){
    var $=Cheerio.load(body);
var  entitles=new Entitles;
    $('.b_algo','#b_results').each(function () {
        var $me = $(this);
        var name = entitles.decode($me.find('h2>a').html());
        var url = Url.parse($me.find('h2>a').attr('href')).href;
        var message = $me.find('div>p').text();
        var item={
            name:name,
            url:url,
            message:message
        }
        if (item.url!="http://pan.baidu.com/error/404.html"){
            classList.push(item);
        }else {
            if(classList=[]){
                var err={

                };
                return callback(null,err);
            }
        }

    })

    return callback(null,classList);
});

}

