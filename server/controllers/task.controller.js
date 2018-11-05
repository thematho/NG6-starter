const TaskController = {
  get: function getTask(req, res, next) {
    res.send([{ description: 'Todo Example', completed: false }]);
  },
  save: function saveTODO(req, res, next) {
    // Save TODO list in MongoDB
  },
}

module.exports = TaskController;
