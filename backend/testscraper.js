const scrape=require("./scrapers/beyonchatsScraper");
(async ()=>{
    const blogs=await scrape();
    console.log(blogs);
})();