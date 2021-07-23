const DATABASE = require("../DB/db");

class Controller{
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
    async update_client(data){
        var to_update = data.to_update;
        var condition = data.condition;

        var res = await this.DB.update_client(to_update, condition);
        if(res[0] > 0)
            return "Registro Atualizado";
        else
            return "Registro não existe";
    }
    async delete_client(data){
        var res = await this.DB.delete_client(data);
        if(res > 0)
            return "Apagado";
        else
            return "Não foi possivel apagar registro";
    }
}

var controller = new Controller();

module.exports = controller;