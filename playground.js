const controller = require('./models/animais');

class Playground{
    play(){
        const result = controller.findOne({
            where:{
                id:1
            }
        });
        console.log(result);
    }
}

const playground = new Playground();
playground.play();