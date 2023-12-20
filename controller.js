let globalID = 4;
const houses = require('../db.json');
module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
    },
    createHouse: (req, res) => {
        console.log(req.body);
        houses.push(
            {
                address: req.body.address,
                price: req.body.price,
                imageURL: req.body.imageURL,
                id: globalID,
            }
        )
        globalID++
        res.status(200).send(houses)
    },
    deleteHouse: (req, res) => {
      let index = houses.findIndex(elem => elem.id === +req.params.id);
      houses.splice(index, 1);
      res.status(200).send(houses);  
    },
    updateHouse: (req, res) => {
        let id = req.params.id;
        let type = req.body.type;
        let index = houses.findIndex(elem => +elem.id === +id);

        if (houses[index].price <= 10000 && type === 'minus') {
            houses[index].price = 0;
            res.status(200).send(houses);
        } else if (type === 'plus') {
            houses[index].price += 10000;
            res.status(200).send(houses);
        } else if (type === 'minus') {
            houses[index].price -= 10000;
            res.status(200).send(houses);
        } else {
            res.sendStatus(400);
        }
    }
}
