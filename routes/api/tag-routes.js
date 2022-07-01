const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll();
    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err);
  }

  //include: [{model:Product, as: "product"}]
}
  // find all tags
  // be sure to include its associated Product data
);

router.get('/:id', async (req, res) => {
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, as: 'product'}]
    });
    if(!tagData){
      res.status(404).json({ message: 'No tag found with this id!'});
      return;
    }

    res.status(200).json(tagData);
  } catch(err) {
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch(err) {
    res.status(400).json(err);
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
try {
  const tagData = await Tag.update(req.body,
    {
      where: {
        id: req.params.id,
      }
    });
    res.status(200).json(tagData)
} catch (err){
  res.status(500).json(err);
}l
  //look at exercise 10 in mvc week! hints baby! I feel like there's more to this.. but i'm not totally sure. just try it out

});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    
    if(!tagData) {
      res.status(404).json({ message: "No tag found with this id!"});
      return;
    }

    res.status(200).json(tagData);
  }catch(err){
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
