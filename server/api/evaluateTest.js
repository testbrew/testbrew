const router = require('express').Router();
const allTests = require('./ast');
const {
  models: { UserSubmissions },
} = require('../db');

// evaluate test

router.post('/', async (req, res) => {
  try {
    if (req.body.userId) {
      const found = await UserSubmissions.findOne({
        where: {
          userId: req.body.userId,
          testingPromptId: req.body.promptId,
        },
      });

      if (found) {
        found.update({
          userSubmission: req.body.code,
        });
        console.log('UPDATED:', found);
      } else {
        const newSub = await UserSubmissions.create({
          userId: req.body.userId,
          testingPromptId: req.body.promptId,
          userSubmission: req.body.code,
        });
        console.log('NEWWWWW:', newSub);
      }
      allTests(req.body.orderNum, req, res);
    } else {
      allTests(req.body.orderNum, req, res);
    }
  } catch (err) {
    res.json('Syntax Error!');
  }
});

module.exports = router;
