var modal = document.getElementById('id01');

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
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
  [].forEach.call(cbs, function (cb) {
    var row = upTo(cb, 'tr');
    row && row.parentNode.removeChild(row);
  });
}

// function myFunction() {
//   var x = document.getElementById("myDIV");
//   if (x.style.display === "none") {
//     x.style.display = "block";
//   } else {
//     x.style.display = "none";
//   }
// }

// $(document).ready(function () {
//   $("#active").click(function () {
//     $("#deactive").toggle();
//     $("#active").toggle();
//   });
//   $("#deactive").click(function () {
//     $("#active").toggle();
//     $("#deactive").toggle();
//   });

//   $("button","#design").click(function () {
//     $("#design-text").toggle();
//     $("#design").toggle();
//   });
//   $("#design-text").click(function () {
//     $("#design").toggle();
//     $("#design-text").toggle();
//   });
// });