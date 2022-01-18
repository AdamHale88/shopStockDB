const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
  // find all tags
  // be sure to include its associated Product data

  router.get('/', async (req, res) => {
    Tag.findAll ({
      include: [
      {
        model: Product,
        model: ProductTag
       }
      ] 
  })
    .then(tagsData => {
      res.status(200).json(tagsData);
    })
    .catch (err => {
      res.status(500).json(err);
    })
  });


router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  let id = req.params.id;
  Tag.findByPk(id, {
    include: [
      {
        model: Product,
        model: ProductTag
      },
    ]
  })
    .then(tagsData => {
      res.status(200).json(tagsData);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Tag.create(req.body)
    .then(tag => {
      res.status(200).send("Tag Created Successfully!");
    })
    .catch(res.status(500))
})


router.put("/:id", (req, res) => {
  let id = req.params.id;
  Tag.update(req.body, {
    where: {
      id: id,
    },
  })
    .then(res.status(200).send(" Tag Updated Sucessfully"))
    .catch(res.status(500));
});


router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Tag.destroy({ where: { id: id } });
  res.status(200).send("Tag Deleted sucessfully!");
});

module.exports = router;
