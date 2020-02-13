var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function removeDummy() {
  var elem = document.getElementById('dummy');
  elem.parentNode.removeChild(elem);
  return false;
}

// Helper, go from el up to ancestor with tagName
function upTo(el, tagName) {
  tagName = tagName.toLowerCase();
  while (el = el.parentNode) {
    if (el.tagName && el.tagName.toLowerCase() == tagName) {
      return el;
    }
  }
  return null;
}

// Delete rows with checked checkboxes
function deleteRows() {
  var cbs = document.querySelectorAll('#table input:checked'); 
  [].forEach.call(cbs, function(cb) {
      var row = upTo(cb, 'tr');
      row && row.parentNode.removeChild(row);
  });
}

// var Mainarray = [];
// var i = 0;
// $("#delete_row").click(function(){
//   if(i>=0){
//    $("#addr"+(i-1)).html('');
//    if(i > 0)
//    {
//      i--;
//    }
//  }
// });
// function delrow(sender)
// {
//  $(sender).parent().parent().remove();
// }