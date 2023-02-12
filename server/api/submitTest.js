const fs = require('fs');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const {
  models: { TestingPrompt },
} = require('../db');

router.post('/', async (req, res) => {
  let findJsCode = await TestingPrompt.findOne({
    where: {
      jsCode: req.body.jsCode,
    },
  });

  const jsCode = findJsCode.dataValues.jsCode;

  if (req.body.hasTestPassed === true) {
    const testFileName = uuidv4() + '.test.js';

    const filePath = `./testFiles/${testFileName}`;
    const jsCodeWithUserCode = `${jsCode}\n\n${req.body.code}`;

    try {
      fs.writeFileSync(filePath, jsCodeWithUserCode);
      const { stderr } = await exec(`npm test ${testFileName}`);
      // console.log(JSON.stringify(stderr));
      res.json(stderr.toString());
    } catch (err) {
      res.send(err.toString());
    } finally {
      fs.unlinkSync(filePath);
    }
  }
});

module.exports = router;
