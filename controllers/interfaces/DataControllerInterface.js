class IDataController {

    constructor() {
        if (!this.getElems) {
            throw new Error("Controller must return collection of items!")
        }

        if(!this.addElem) {
            throw new Error("Controller must add elements!")
        }

        if(!this.updateElem) {
            throw new Error("Controller must update elements!")
        }

        if(!this.deleteElem) {
            throw new Error("Controller must delete elements!")
        }
    }

    getElems(req, res){}
    addElem(req, res){}
    updateElem(req, res){}
    deleteElem(req, res){}
}

module.exports = IDataController