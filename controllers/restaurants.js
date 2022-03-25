let restaurants = [
    {
        id: '1',
        name: 'meat place',
        address: 'keelung road',
        img_url: 'https://',
        description: 'best meat restaurant in taipei'
    },
    {
        id: '2',
        name: 'healthy food restaurant',
        address: 'keelung road section 14',
        img_url: 'https://',
        description: 'best healthy food restaurant in taipei'
    },
]

export const getAll = (req, res) => {
    res.status(200).json(restaurants)
}