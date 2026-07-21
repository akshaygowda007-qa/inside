import {test} from '@playwright/test';

test(" kick start with playwright",async({page})=>{
   await  page.goto("https://www.google.com");
  
   await page.getByRole('button', { name: 'Google apps' }).click();
    console.log("My first test");
});

test("My second test", ()=> {
    console.log("My second test");
});
