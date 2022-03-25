let menuResOne = [
    {
        id: '1',
        restaurant_id: '1',
        name: 'beef stack',
        description: 'medium cooked fresh meat',
        img_url: 'https://',
        price: 322.22,
        currency: 'NTD',
        available: true,
    },
    {
        id: '2',
        restaurant_id: '1',
        name: 'salad',
        description: 'salad with fresh veggies and fruits',
        img_url: 'https://',
        price: 100.22,
        currency: 'NTD',
        available: true,
    },
    {
        id: '3',
        restaurant_id: '1',
        name: 'milk',
        description: 'one litre of milk bottle',
        img_url: 'https://',
        price: 43,
        currency: 'NTD',
        available: true,
    }
]

let menuResTwo = [
    {
        id: '11',
        restaurant_id: '2',
        name: 'ramen',
        description: 'thick noodles with beef and vegetables',
        img_url: 'https://',
        price: 144,
        currency: 'NTD',
        available: true,
    },
    {
        id: '22',
        restaurant_id: '2',
        name: 'fruits',
        description: 'fresh local fruits',
        img_url: 'https://',
        price: 120,
        currency: 'NTD',
        available: true,
    },
    {
        id: '33',
        restaurant_id: '2',
        name: 'green tea',
        description: 'a cup of tea, sugar is supplementary',
        img_url: 'https://',
        price: 99,
        currency: 'NTD',
        available: true,
    }
]


function getById(id) {
    if (id === '1') {
        return menuResOne
    }
    else if (id === '2') {
        return menuResTwo
    }
    else {
        return null
    }
}

export const get = (req, res) => {
    res.status(200).json(getById(req.params.id))
}