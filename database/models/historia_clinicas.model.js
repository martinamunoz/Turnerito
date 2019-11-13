const uuid = require('uuid/v4')

class HistoriaClinica {
    constructor(idPaciente, medicoID, fecha_hora, descripcion) {
        this._id = uuid()
        this.idPaciente = idPaciente
        this.medicoID = medicoID
        this.fecha_hora = fecha_hora
        this.descripcion = descripcion
    }
}

module.exports = HistoriaClinica