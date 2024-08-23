var photos = 0;
var views = 0;

var contributeID = "103140580685995586585"; //SAH new id
var mapLink = "https://www.google.com/maps/contrib/";
//
// mircom akram 112229672882478638212
// betajb30 old id 103140580685995586585

var photo_view = photo_view_match(
  '(\\d+),\\\\"(C[\\w-]{34,40})\\\\",(\\d+)',
  getResponseText(mapLink + contributeID)
);
photos += parseInt(photo_view.photos);
views += parseInt(photo_view.views);
// console.log(photo_view);

contributeID = "103474235754339879446";
photo_view = photo_view_match(
  '(\\d+),\\\\"(C[\\w-]{34,40})\\\\",(\\d+)',
  getResponseText(mapLink + contributeID)
);

photos += parseInt(photo_view.photos);
views += parseInt(photo_view.views);

contributeID = "112229672882478638212";
photo_view = photo_view_match(
  '(\\d+),\\\\"(C[\\w-]{34,40})\\\\",(\\d+)',
  getResponseText(mapLink + contributeID)
);

photos += parseInt(photo_view.photos);
views += parseInt(photo_view.views);

// console.log(photo_view);

$("#photo-count").attr("data-to", photos);
$("#view-count").attr("data-to", views);

function getResponseText(link) {
  var cors = "https://cors-anywhere.herokuapp.com/";
  // return $.ajax({
  //     type: "GET",
  //     url: cors + link,
  //     async: false
  // }).responseText;
  var response;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      response = xhttp.responseText;
    }
  };
  xhttp.open("GET", cors + link, false);
  xhttp.send();
  return response;
}

function photo_view_match(pattern, contents) {
  var matches = [...contents.matchAll(pattern)];
  //console.log(matches[0].length);
  var arr = {};
  if (matches !== null && matches.length > 0) {
    matches.forEach(function (arrayItem) {
      arr.photos = arrayItem[1];
      arr.views = arrayItem[3];
      // console.log(arrayItem[0] + " - "+ arrayItem[1] + " - " + arrayItem[2]+" - "+arrayItem[3] );
    });
  }
  return arr;
}
