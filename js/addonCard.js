class AddonCard {
  constructor(id, name, description, download, addID) {
    this.id = id;
    this.name = name;
    this.desc = description;
    this.download = download;
    this.addID = addID;
  }
  showThis() {
    return `
    <div class="card addCard col" id="${this.id}">
     <br \><h5 class="card-title">${this.name}</h5><br \>
     <img src="./assets/images/addon/${this.id}.png" class="card-img-top" alt="${this.id}">
    <div class="card-body">
    <p class="card-text">${this.desc}</p>
    <a href="./assets/addon-list/${this.id}.rar" download="${this.id}.rar" class="btn btn-primary"><i class="fa fa-download"></i></a>
      </div>
    </div>
    `;
  }
}

export default AddonCard;
