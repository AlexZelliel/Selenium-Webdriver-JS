const {Builder, By, Key, until} = require('selenium-webdriver');
require("chromedriver");
const {sleep} = require("yarn/lib/cli");
let driver = new Builder().forBrowser('chrome').build();

const r = Math.random().toString(36).substring(7);

async function Login() {
    await driver.get('http://localhost:3000/');
    try {
        const Log = await driver.wait(until.elementLocated(By.xpath('//input[@name="email"]')));
        Log.sendKeys('alexgmirko@gmail.com');
        const Pass = await driver.wait(until.elementLocated(By.xpath('//input[@name="password"]')));
        Pass.sendKeys('mak63nil');
        const testLog = await driver.wait(until.elementLocated(By.xpath('//input[@type="submit"]')));
        testLog.click();
    } catch (errors) {
        console.log(errors);
    }
    return Login;
}
async function addTrans() {

    try {
        const addButton = await driver.wait(until.elementLocated(By.xpath('//button[text() = "ADD"]')));
        addButton.click();
        const currency = await driver.wait(until.elementLocated(By.xpath('//option[text() = "UAH"]')));
        currency.click();
        const amount = await driver.wait(until.elementLocated(By.xpath('//input[@name="amount"]')));
        amount.sendKeys('30000');
        const category = await driver.wait(until.elementLocated(By.xpath('//option[text() = "Office"]')));
        category.click();
        const discription = await driver.wait(until.elementLocated(By.xpath('//input[@name="description"]')));
        discription.sendKeys(r);
        const addfinish = await driver.wait(until.elementLocated(By.xpath('//h1/parent::div//following::div[2]/button[text()="ADD"]')));
        addfinish.click();
        sleep(3000);
    } catch (errors) {
        console.log(errors);
    }
    return addTrans;
}
async function pagination() {
    try{
        const a = await driver.wait(until.elementLocated(By.xpath(`//ul/child::li[last()-1]`))).getText();
        console.log(a);
        const pug = parseInt(a) + 1;
        console.log(pug);
        for (let i = pug; i >= 2; i--) {
            console.log(i);
            await driver.wait(until.elementLocated(By.xpath(`//tbody`)), 3000);
            await driver.wait(until.elementLocated(By.xpath(`//ul/child::li[${i}]`)),30000);
           const wat =  await driver.wait(until.elementLocated(By.xpath(`//ul/child::li[${i}]`)));
            wat.click();
        }
    }catch (error){
        console.log(error);
    }
    return pagination;
}
async function search() {

    try {
        const ser = await driver.wait(until.elementLocated(By.xpath(`//input[@type="search"]`)));
        ser.sendKeys(r);
        await driver.wait(until.elementLocated(By.xpath(`//tbody`)), 3000);
        const ent = await driver.wait(until.elementLocated(By.xpath(`//input[@type="search"]`)));
        ent.sendKeys(Key.RETURN);
        const clr = await driver.wait(until.elementLocated(By.xpath(`//input[@type="search"]`)));
        clr.clear();
        ent.sendKeys(Key.RETURN);
    }catch (errors){
        console.log(errors);
    }
    return search;
}
async function editTrans() {

    try {
        const edittTrans = await driver.wait(until.elementLocated(By.xpath(`//tbody/tr/td[contains(text(), '${r}')]//following-sibling::td[3]/button[1]`)));
        edittTrans.click();
        const currency = await driver.wait(until.elementLocated(By.xpath('//option[text() = "USD"]')));
        currency.click();
        const amount = await driver.wait(until.elementLocated(By.xpath('//input[@name="amount"]')));
        amount.clear();
        amount.sendKeys('-1000');
        const category = await driver.wait(until.elementLocated(By.xpath('//option[text() = "Rent"]')));
        category.click();
        const addfinish = await driver.wait(until.elementLocated(By.xpath('//h1/parent::div//following::div[2]/button[2]')))
        addfinish.click();

    } catch (errors) {
        console.log(errors);
    }
    return editTrans;
}
async function delTrans() {
    try {
        await driver.wait(until.elementLocated(By.xpath('//tbody/tr/td')), 30000);
        console.log(r);
        const del = await driver.wait(until.elementLocated(By.xpath(`//tbody/tr/td[contains(text(), "${r}")]//following-sibling::td[3]/button[2]`)));
        console.log(`//tbody/tr/td[contains(text(), "${r}")]//following-sibling::td[3]/button[2]`);
        del.click();
    } catch (errors) {
        console.log(errors);
    }
    return delTrans;
}
async function out() {
    try {
        const exit = await driver.wait(until.elementLocated(By.xpath('//button[text()="OUT"]'))).click();
    }catch (errors) {
        console.log(errors);
    }
}
(async () => {
    await Login();
    await addTrans();
    await pagination();
    await search();
    await editTrans();
    await delTrans();
    await out();
})();

