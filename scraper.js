const puppeteer = require('puppeteer');
const CREDS = require('./creds');
const util = require('util');

// const moongoose = require('mongoose');
// const User = require('./models/user'); 

async function run() {
  // instantiating a browser - with property headless: false (so we can see it working)
  const browser = await puppeteer.launch({
    headless: false
  });

  // now we need to instantiate a new page 
  const page = await browser.newPage();

  page.setViewport({
    width: 1920,
    height: 1080
});

  await page.goto('https://www.indeed.com/');


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


  
  await page.reload({waitUntil: 'load'}); // if use reload MAKE SURE THERE"S NO await page.waitForNavigation();
 
// iterate based on # 

//   console.log('hello')

//   const LIST_LINK = '#resultsCol > div.row.result:nth-child(3) > h2 > a';
//   const LENGTH_SELECTOR_ID = 'div[data-tn-component]';
//   console.log(LIST_LINK)
const resultsCol = '#resultsCol'
const showing = '.row.result'
const link = '.turnstileLink'
const showing2 = '.showing'
//   const LIST_LINK = '#resultsCol > div.row.result:nth-child(INDEX) > h2 > a';
//   console.log('its hits')


// const result = await page.$$eval(showing, divs => console.log(divs))
// const findIt = await page.$$(showing2)
const obj = await page.$$(showing)

console.log(obj)
// await findIt.click();
// console.log('THIS IS FINDIT',findIt)
// console.log('THIS IS UTIL ==>>>>>>>', util.inspect(findIt, false, null))

// error: Converting circular structure to JSON
//   let link = await page.$$eval((sel)=> {
//       console.log('THIS IS SEL',sel)
//       return sel
//   }, findIt);


  
  
//*[@id="p_67d093d34e1ac778"]

  //loop through number of pages, all of the outer loop would be in the inner loop
//   let listLength 

 

}

run();