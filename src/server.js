const express = require("express");
const path = require("path");
const puppeteer = require("puppeteer-core")

const app = express();



// SEND A STATIC PAGE

app.use(express.static(path.join(__dirname+'/public/version1')))


app.get('/pdf', async(request,response)=>{

    const browser = await puppeteer.launch({headless:true})
    const page = await browser.newPage()

    await page.goto("http://localhost:3000/",{
        waitUntil:'networkidle0'
    })

    const pdf = await page.pdf({
        printBackground:true,
        format:"letter",
        margin:{
            top:"5px",
            bottom:"5px",
            left:"5px",
            right:"5px"
        }
    })

    await browser.close()

    response.contentType("application/pdf")

    return response.send(pdf)
})

app.listen(3000);