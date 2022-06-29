const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//GET all categories
router.get('/', async (req, res) => {
  try{
    const categoryData = await Category.findAll({
      include:[{ model: Product, as: 'products'}]
    });
    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
  }
});

//GET a single category
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product, as: 'products'}]
    });

    if(!categoryData){
      res.status(404).json({ message: 'No category found with this id!'});
      return;
    }

    res.status(200).json(categoryData);
  } catch(err) {
    res.status(500).json(err);
  }
});

//CREATE a category
router.post('/', (req, res) => {
  // create a new category
});

//UPDATE a category
router.put('/:id', (req, res) => {

  // update a category by its `id` value
});

//DELETE a category
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
