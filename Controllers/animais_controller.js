const DATABASE = require("../DB/db");

class Animal_Controller{
    constructor(){
        this.DB = DATABASE;
    }
    async create_animal(data){
        var id = await this.DB.find_by_cpf(data.DonoId);
        data.DonoId = id;
        var res = await this.DB.create_animal(data);
        return res;
    }
    async create_client(data){
        var id = await this.DB.find_by_cpf(data.cpf);
        if(id != 0)
            return {response:"CPF já foi registrado"};
        else{
            var status = await this.DB.create_dono(data);
            return status;
        }
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