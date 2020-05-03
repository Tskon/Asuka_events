module.exports = function (router, models) {
  router.post('/admin/change-battle-table', async (req, res) => {

    res.send({
      status: 'success',
      message: 'Таблица изменена',
      data: req.body
    })
  })
}
