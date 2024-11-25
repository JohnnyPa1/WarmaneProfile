class WaCard {
  constructor(id, name, description, importstring, waID) {
    this.id = id;
    this.name = name;
    this.desc = description;
    this.string = importstring;
    this.waID = waID;
  }

  showThis() {
    return `
        <div class="card waCard col" id="${this.id}" data-waid="${this.id}" data-waPID="${this.waID}">
        <div class="card-body" data-waid="${this.id}">
          <h5 class="card-title" data-waid="${this.id}">${this.name}</h5>
        </div>
        <img
          src="./assets/images/wa/${this.id}.png"
          class="card-img-top"
          alt="..."
          data-waid="${this.id}"
        />
        </div>
        `;
  }

  showThisModal(){
    return `<div class="card displayWA expressway">
    <p class="card-text">Press ESC or Space to exit</p>
    <img src="./assets/images/wa/${this.id}.png" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${this.name}</h5>
      <p class="card-text">${this.desc}</p>
      <button class="btn btn-primary" id="importButton" disabled>Copy import string</button>
    </div>
  </div>`
  }

  copyString() {
    navigator.clipboard.writeText(this.string);
    alert('Import string copied.')
  }
}

export default WaCard;
