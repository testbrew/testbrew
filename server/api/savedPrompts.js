const router = require('express').Router();
const {
  models: { UserSubmissions },
} = require('../db');
module.exports = router;

router.get('/:userId/:promptId', async (req, res, next) => {
  try {
    const savedPrompt = await UserSubmissions.findOne({
      where: {
        userId: req.params.userId,
        testingPromptId: req.params.promptId,
      },
    });

    res.send(savedPrompt);
  } catch (ex) {
    next(ex);
  }
});
