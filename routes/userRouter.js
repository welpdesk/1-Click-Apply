const express = require('express');
const userController = require('../controller/userController')

const userRouter = express.Router();

module.exports = userRouter;



for(let i = 0; i < narrowHrefs.length; i += 1) {
    console.log(narrowHrefs[i])
  await page.goto(narrowHrefs[i])
  await page.waitForNavigation()
} 

const APPLY_BTN = 'indeed-apply-button'

await page.click(APPLY_BTN)
