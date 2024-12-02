import WaCard from "./waCard.js";
import AddonCard from "./addonCard.js";

const buttonGroup = $("#main-nav-buttons");
const loader = $(".loader");
const mainDisplay = $("#justforthedisplay");

const waListButton = $("#waList");
const waList = $("#wa-list");
const showWa = $("#showWa");

const addonListButton = $("#addonList");
const addonList = $("#addon-list");
const showAddon = $("#showAddon");

buttonGroup.children().on("click", function (e) {
  e.preventDefault();
  $("#home-bg-img").addClass("animate-fade-out");
});

var waDataBase = [];
var addonDataBase = [];
var counter = 0;
var displayed = false;

// getting databases
$(document).ready(function () {
  getDataBase("./assets/wa-list/WeakAuras.json", "wa");
  getDataBase("./assets/addon-list/Addons.json", "addon");
  setTimeout(function () {
    loader.fadeOut();
    mainDisplay.fadeIn({
      duration: 3000,
    });
  }, 4000);
});

// data base function
function getDataBase(URL, type) {
  $.ajax({
    dataType: "json",
    async: false,
    url: URL,
    success: function (data) {
      if (type == "wa") {
        counter = 0;
        data.wa.forEach((element) => {
          waDataBase[counter] = new WaCard(
            element.id,
            element.name,
            element.description,
            element.importstring,
            counter
          );
          counter++;
        });
        putInList(waDataBase, showWa);
      } else if (type == "addon") {
        counter = 0;
        data.addon.forEach((element) => {
          addonDataBase[counter] = new AddonCard(
            element.id,
            element.name,
            element.description,
            element.download,
            counter
          );
          counter++;
        });
        putInList(addonDataBase, showAddon);
      }
    },
    error: function (jqXHR, textStatus, error) {
      alert("Problem while getting databaste:" + error);
    },
  });
}

// display of targeted WA Card

function display(targetWa) {
  displayed = true;
  let displayWA = $(`#${targetWa}`)[0].getAttribute("data-waPID");
  $("body").prepend(
    `<div class='displayWA'>${waDataBase[displayWA].showThisModal()}`
  );
  $("section").addClass("blury");

  function getCopyButton() {
    return new Promise((resolve) => {
      setTimeout(() => {
        let btn = $("#importButton");
        resolve(btn);
      }, 3000);
    });
  }
  async function loadButton() {
    console.log("waiting for button to load");
    var copyBTN = await getCopyButton();
    copyBTN.prop("disabled", false);
    copyBTN.css("filter", "grayscale(0)");
    copyBTN.on("click", function () {
      waDataBase[displayWA].copyString();
    });
  }
  loadButton();
}

$("body").on("keydown", function (event) {
  if(displayed) {
    if (event.which == 27 || event.which == 32) {
      unDisplay();
      displayed = false;
    }
  }
});

function unDisplay() {
  $(".displayWA").remove();
  $("section").removeClass("blury");
  // $(".mainbutton").attr("disabled",false);
  waList.fadeIn(1500);
}

showWa.on("click", function (e) {
  let targetWA = e.target.getAttribute("data-waid");
  waList.fadeOut({
    queue: false,
  });
  display(targetWA);
});

// load wa list

waListButton.on("click", function (e) {
  e.preventDefault();
  addonList.fadeOut({
    queue: false,
  });
  waList.fadeIn(1500);
});

addonListButton.on("click", function (e) {
  e.preventDefault();
  waList.fadeOut({
    queue: false,
  });
  addonList.fadeIn(1500);
});

// general function to showcase data in wanted list
function putInList(data, list) {
  for (let i = 0; i < data.length; i++) {
    if (i % 2 == 0 && data[i + 1] != undefined) {
      list.append(
        `<div class="row">${data[i].showThis()}${data[i + 1].showThis()}`
      );
    } else if (i % 2 == 0 && data[i + 1] == undefined) {
      list.append(
        `<div class="row">${data[i].showThis()}<div class="col"></div>`
      );
    }
  }
}
