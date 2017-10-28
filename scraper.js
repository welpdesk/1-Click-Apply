const puppeteer = require('puppeteer');
const CREDS = require('./creds');
// const moongoose = require('mongoose');
// const User = require('./models/user'); 

async function run() {
  // instantiating a browser - with property headless: false (so we can see it working)
  const browser = await puppeteer.launch({
    headless: false
  });

  // now we need to instantiate a new page 
  const page = await browser.newPage();

  await page.goto('https://www.indeed.com/');

  await page.viewport({width: 1000, height: 1000})

  // Signing in: 
  // setting sign-in link string id to a variable
  const SIGNIN_SELECTOR = '#userOptionsLabel';
  await page.click(SIGNIN_SELECTOR);
  await page.waitForNavigation();

  const EMAIL_SELECTOR = '#signin_email';
  const PW_SELECTOR = '#signin_password';
  const SIGNIN_BTN = "#loginform > button";
  await page.click(EMAIL_SELECTOR);
  await page.keyboard.type(CREDS.email);
  await page.click(PW_SELECTOR);
  await page.keyboard.type(CREDS.password);
  await page.click(SIGNIN_BTN);
  await page.waitForNavigation();

  // const whatToSearch = 'developer'; // will be later inputted -- not using
  // const whereToSearch = 'New York, NY'; // will be later inputted - not using
  // const WHAT_SELECTOR = 'input#what.input_text';
  // const WHERE_SELECTOR = 'input#where.input_text';
  // const FJ_BTN = '#fj';
  // await page.click(WHAT_SELECTOR);
  // await page.keyboard.type(whatToSearch);node
  // await page.click(WHERE_SELECTOR);
  // await page.keyboard.type(whereToSearch);
  // await page.click(FJ_BTN);
  // await page.waitForNavigation();

  const searchURL = 'https://www.indeed.com/jobs?q=developer&l=New+York%2C+NY';
  await page.goto(searchURL);
  // to bypass the popup: 
  await page.reload({waitUntil: 'load'}); // if use reload MAKE SURE THERE'S NO await page.waitForNavigation();
 
  
  const LIST_CONTAINER = '#resultsCol';
  const TARGET_JOBS = '#resultsCol > div.row.results';

  let links = await page.evaluate((sel)=> {
      return document.querySelector(sel).getElementsByClassName('row result');
  }, LIST_CONTAINER);

  console.log(links);
  let array = [];
  for (let key in links) {
    array.push(links[key]);
  }
  console.log(JSON.parse(array));
}

run();