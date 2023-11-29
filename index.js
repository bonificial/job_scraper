const puppeteer = require("puppeteer");
const fs = require("fs/promises");
const cron = require("node-cron");

async function start() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.brightermonday.co.ke/jobs");

  //const html = await page.content()

  page.on('console', msg => {
    for (let i = 0; i < msg.args.length; ++i)
      console.log(`${i}: ${msg.args[i]}`);
  });
 const dataFromDivs = await page.$$eval("[data-cy='listing-cards-components']", (divs) => {

    const data = [];

    for (const div of divs) {
     // const anchorElements = div.querySelectorAll('a[onclick]');
const fulltext= div.textContent;
      // Example: Assuming job title is in the first paragraph element
      const jobTitleElement = div.querySelector('div:nth-of-type(1) a[onclick]');
      const jobTitle = jobTitleElement ? jobTitleElement.textContent.trim() : '';

      // Example: Assuming job post date is in the second paragraph element
      const jobPostDateElement = div.querySelector('div:nth-of-type(3)')
      const jobPostDate = jobPostDateElement ? jobPostDateElement.textContent.trim() : '';

      // Example: Assuming job client details are in the third paragraph element
      const jobClientDetailsElement = div.querySelector('div:nth-of-type(3)');
      const jobClientDetails = jobClientDetailsElement ? jobClientDetailsElement.textContent.trim() : '';

/*
let div = document.querySelector("[data-cy='listing-cards-components']");
console.log(div.querySelector('div:nth-of-type(3)'))

*/
        data.push({
          title: jobTitleElement.textContent.trim(),
          url: jobTitleElement.href,
          jobTitle,
          fullText:fulltext,
          jobPostDate,
          jobClientDetails,
        });

    }

    return data;
  });




    //dataFromDivs.push(...data);


 console.log(dataFromDivs[0])
page.close()
  // page.evaluate(("[data-cy='listing-cards-components']")=>document.title)


}
//cron.schedule('*/5 * * * * *',start)

start();

//setInterval(start, 5000)
