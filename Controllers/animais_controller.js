const DATABASE = require("../DB/db");

class Animal_Controller{
    constructor(){
        this.DB = DATABASE;
    }
    async create(data){
        const data_client = data.dono;
        const data_animal = data;
        var res = await this.DB.create(data_client,data_animal);
        return res;
    }
    async find(data){
        var res = await this.DB.find(data);
        return res;
    }
    async find_by_owner(data){
        var query = data.query;
        var query_animal = data.animal;
        var res = await this.DB.find_by_owner(query,query_animal);
        return res;
    }
    async update(data){
        var to_update = data.to_update;
        var condition = data.condition;

        var res = await this.DB.update(to_update, condition);
        if(res[0] > 0)
            return "Registro Atualizado";
        else
            return "Registro não existe";
    }
    async delete(data){
        var res = await this.DB.delete(data);
        if(res > 0)
            return "Apagado";
        else
            return "Não foi possivel apagar registro";
    }
}

var Controller = new Animal_Controller();

module.exports = Controller;