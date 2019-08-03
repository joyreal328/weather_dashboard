/*

var data = null;
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
    console.log(this.responseText);
    }
});
xhr.open("GET", "https://api.stm.info/pub/od/i3/v1/messages/etatservice/");
xhr.setRequestHeader("origin", "mon.domain.xyz");
xhr.setRequestHeader("apikey", "l7****3370ae5473053a71454d99bc19f0d6");
xhr.send(data);


*/


console.log('stm loaded');

var data = null;
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
    console.log(this.responseText);
    }
});

xhr.open("GET", "https://api.stm.info/pub/od/i3/v1/messages/etatservice/");
xhr.setRequestHeader("origin", "localhost");
xhr.setRequestHeader("apikey", "l7xxbc118e6d19064c27825a455f9eec641c");
xhr.send(data);

console.log(data);

