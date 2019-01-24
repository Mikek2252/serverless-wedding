const mealController = require('./api/controllers/bookings')


debugger;
const result = mealController.getId(1)



// const JSONAPI = require('./json-api/app')
// const mealSerialized = JSONAPI(schema, response)
// const guest = JSONAPI(guestSchema, guestResponse)
// console.log(mealSerialized)
// console.log(guest)


const expectedResult = {
  "data": {
    "type":"guests",
    "id":"1",
    "attributes":{
      "isComing": true,
      "dietaryRequirements": "Random Requirements"
    },
    "relationships":{
      "meals":{
        "data":{
          "type":"meals",
          "id": '1'
        },
        "links":{}
      },
      "bookings":{
        "data":{
          "type":"bookings",
          "id": '1'
        },
        "links":{}
      }
    }
  }
}
