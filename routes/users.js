var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  res.send('respond with a user');
});

router.get('/:id',  (req, res) => {
  const userId = req.params.id;
  res.send(`Mostrando artículo con el ID: ${userId}`);
});

router.post('/',  (req, res) => {
  const data = req.body;
  res.send('Datos recibidos correctamente');
});

router.patch('/', (req,res) =>{
  const data = req.body;
  res.send("aqui actualizaremos datos")
})

router.delete('/:id',  (req, res) => {
  const userId = req.params.id;
  res.send(`borraremos el usuario ${userId}`);
});




module.exports = router;
