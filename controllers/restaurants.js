let restaurants = [
    {
      "id": "1",
      "name": "meat place",
      "address": "keelung road",
      "img": "https://media-cdn.tripadvisor.com/media/photo-s/08/a6/e4/a9/the-meat-house.jpg",
      "description": "best meat restaurant in taipei",
          "rates_ave": 4.4
  
    },
    {
      "id": "2",
      "name": "healthy food restaurant",
      "address": "keelung road section 14",
      "img": "https://i.pinimg.com/originals/29/d3/cb/29d3cbd12382f4882d15d12bdf6d467c.jpg",
      "description": "best healthy food restaurant in taipei",
          "rates_ave": 4.7
    }
  ]

const getAll = (req, res) => {
    res.status(200).json(restaurants)
}
export {getAll, restaurants}