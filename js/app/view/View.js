class View {
    constructor(elemento){
      this._elemento = elemento;
    }
    template(string){
        document.querySelector(this._elemento).innerHTML = string;
    }
}
  