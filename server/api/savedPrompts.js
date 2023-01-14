const router = require('express').Router();
const {
  models: { UserSubmissions },
} = require('../db');
module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    let userId;
    let promptId;

    const mapUserPrompt = Object.values(req.body);
    mapUserPrompt.map((obj) => {
      for (const key in obj) {
        if (key === 'userId') {
          userId = obj[key];
        } else {
          promptId = obj[key];
        }
      }
    });

    const savedPrompt = await UserSubmissions.findOne({
      where: {
        userId: userId,
        testingPromptId: promptId,
      },
    });

    res.send(savedPrompt);
  } catch (ex) {
    next(ex);
  }
});
