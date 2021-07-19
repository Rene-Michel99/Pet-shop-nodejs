const { Sequelize, DataTypes, Model } = require('sequelize');
const animais_create = require("../models/animais");
const dono_create = require("../models/dono");

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './DB/database.db'
});

class Database{
    constructor(sequelize){
        const model = {}
        model.Sequelize = sequelize;
        //this.sequelize = sequelize;
        //this.model = animais_create(sequelize,DataTypes);
        this.model = model;
        this.model.animais = animais_create(sequelize,DataTypes);
        this.model.dono = dono_create(sequelize,DataTypes);

        this.model.dono.hasMany(this.model.animais);
        this.model.animais.belongsTo(this.model.dono);
    }
    async syncronize(){
        await this.model.animais.sync();
        await this.model.dono.sync();
    }
    async find_by_cpf(cpf_client){
        var registro = await this.model.dono.findOne({where:{cpf:cpf_client}});
        if(registro != null){
            return registro.id;
        }
        else
            return 0;
    }
    async create_animal(data_animal){
        var status = await this.model.animais.create(data_animal);
        return status;
    }
    async create_dono(data_client){
        var status = await this.model.dono.create(data_client);
        return status;
    }
    async update(to_update,condition){
        var status = await this.model.update(to_update,condition);
        return status;
    }
    async find_animal(query){
        var response = await this.model.animais.findAll(
            query
        );
        
        return response;
    }
    async find_by_owner(query,query_animal){
        var response = await this.model.dono.findAll(
            {
                query,
                include:[{
                    model:this.model.animais,
                    where:query_animal
                }]
            }
        );
        return response;
    }
    async delete(query){
        var response = await this.model.animais.destroy(query);
        return response;
    }
}

var DB = new Database(sequelize);
DB.syncronize();

module.exports = DB;