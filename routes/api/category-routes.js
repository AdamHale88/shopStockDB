const router = require("express").Router();
const { Category, Product } = require("../../models");

router.get("/", (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
      },
    ],
  })
    .then(categoryData => {
      res.status(200).json(categoryData);
    })

    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  let id = req.params.id;

  Category.findByPk(id, {
    include: [
      {
        model: Product,
      },
    ],
  })
    .then(categoryData => {
      res.status(200).json(categoryData);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Category.create(req.body)
    .then((category => {
      res.status(200).send("Category Created Successfully!");
    })
    .catch(res.status(500));
});

router.put("/:id", (req, res) => {
  let id = req.params.id;
  Category.update(req.body, {
    where: {
      id: id,
    },
  })
    .then(res.status(200).send("Category Updated Sucessfully"))
    .catch(res.status(500));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Category.destroy({ where: { id: id } });
  res.status(200).send("Category Deleted sucessfully!");
});

module.exports = router;
