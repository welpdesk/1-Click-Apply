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
    width: 1366,
    height: 768
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
const showing = '.row.result > h2 > a'
const link = '.turnstileLink'
const showing2 = '.showing'
//   const LIST_LINK = '#resultsCol > div.row.result:nth-child(INDEX) > h2 > a';
//   console.log('its hits')


// const result = await page.$$eval(showing, divs => console.log(divs))
// const findIt = await page.$$(showing2)
const obj = await page.$$(link)

const hrefs = await page.evaluate(() => {
    const anchors = document.querySelectorAll('.turnstileLink');
    return [].map.call(anchors, a => a.href);
  });

//   console.log(hrefs)


  const narrowHrefs = [];
    for (let i = 0; i < hrefs.length; i++) {
      if ((hrefs[i].includes('/company/') /*&& !(hrefs[i].includes('The-New-York-Times')*/))/* || hrefs[i].includes(‘pagead’))*/ {
        narrowHrefs.push(hrefs[i]);
      }
    }
// console.log(narrowHrefs)

  for(let i = 0; i < narrowHrefs.length; i += 1) {
      console.log(narrowHrefs[i])
    await page.goto(narrowHrefs[i])
    await page.waitForNavigation()
  } 

  const APPLY_BTN = 'indeed-apply-button'

  await page.click(APPLY_BTN)
  
//    console.log('NARROWED DOWN: >>>>>>> ', narrowHrefs);
//     console.log('NARROWED DOWN: >>>>>>> ', narrowHrefs.length);
  //loop through number of pages, all of the outer loop would be in the inner loop
//   let listLength 

 

}

run();