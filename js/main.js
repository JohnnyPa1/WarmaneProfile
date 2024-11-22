import WaCard from "./waCard.js";

const buttonGroup = $("#main-nav-buttons");
const waListButton = $("#waList");
const waList = $("#wa-list");
const showWa = $("#showWa");

buttonGroup.children().on("click", function (e) {
  e.preventDefault();
  $("#home-bg-img").addClass("animate-fade-out");
});

var dataBase = [];
var counter = 0;


function getDataBase() {
  $.ajax({
    dataType: "json",
    async: false,
    url: "./assets/wa-list/WeakAuras.json",
    success: function (data) {
      data.wa.forEach((element) => {
        dataBase[counter] = new WaCard(
          element.id,
          element.name,
          element.description,
          element.importstring,
          counter
        );
        counter++;
      });
    },
    error: function (jqXHR, textStatus, error) {
      alert("Problem while getting databaste:" + error);
    },
  });
}

function display(targetWa) {
  var copyBTN;
  let displayWA = $(`#${targetWa}`)[0].getAttribute("data-waPID");
  $("body").prepend(
    `<div class='displayWA'>${dataBase[displayWA].showThisModal()}`
  );
  $("section").addClass("blury");

function getCopyButton(){
    return new Promise((resolve) => {
      setTimeout(() => {
        let btn = $('#importButton')
        resolve(btn);
      }, 3000);
    });
  }
  async function loadButton(){
    console.log('waiting for button to load');
    var copyBTN = await getCopyButton();
    copyBTN.prop("disabled",false)
    copyBTN.on('click',function(){
      dataBase[displayWA].copyString();
    })
  }
  loadButton();
}








$("body").on("keydown",function(event){
  if(event.which == 27 || event.which == 32){
    unDisplay();
  }
});

function unDisplay() {
  $(".displayWA").remove();
  $("section").removeClass("blury");
  // $(".mainbutton").attr("disabled",false);
  waList.fadeIn(1500);
}

waListButton.on("click", function (e) {
  e.preventDefault();
  waList.fadeIn(1500);
  getDataBase();
  for (let i = 0; i < dataBase.length; i++) {
    if (i % 2 == 0 && dataBase[i + 1] != undefined) {
      showWa.append(
        `<div class="row">${dataBase[i].showThis()}${dataBase[
          i + 1
        ].showThis()}`
      );
    } else if (i % 2 == 0 && dataBase[i + 1] == undefined) {
      showWa.append(
        `<div class="row">${dataBase[i].showThis()}<div class="col"></div>`
      );
    }
  }

  showWa.on("click", function (e) {
    let targetWA = e.target.getAttribute("data-waid");
    waList.fadeOut({
      queue: false,
    });
    display(targetWA);
  });
});
