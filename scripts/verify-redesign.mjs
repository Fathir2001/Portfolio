import { chromium } from 'playwright';
import fs from 'node:fs/promises';
await fs.mkdir('artifacts/redesign',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
page.setDefaultTimeout(15000);
const errors=[];page.on('pageerror',e=>errors.push(e.message));
try {
 await page.goto('http://127.0.0.1:4173/Portfolio/',{waitUntil:'networkidle'});await page.waitForTimeout(2000);
 await page.screenshot({path:'artifacts/redesign/desktop-hero.png'});
 console.log('desktop canvas',await page.locator('canvas').count());
 await page.getByRole('button',{name:'Pink Cosmetics',exact:true}).click();await page.waitForTimeout(600);
 await page.getByText('Commerce with character.',{exact:true}).waitFor();
 await page.getByRole('button',{name:'Explore CHEM IS TRY',exact:true}).click();
 await page.getByRole('dialog').waitFor();
 await page.keyboard.press('Shift+Tab');
 if(!await page.evaluate(()=>document.querySelector('dialog').contains(document.activeElement)))throw new Error('Focus escaped modal');
 await page.keyboard.press('Tab');
 await page.screenshot({path:'artifacts/redesign/project-dialog.png'});
 await page.getByRole('button',{name:/02 Application/}).click();
 if(!await page.locator('#architecture-detail').innerText().then(t=>t.includes('Node.js')))throw new Error('Architecture switching failed');
 await page.keyboard.press('Escape');
 if(await page.locator('dialog[open]').count())throw new Error('Dialog escape failed');
 console.log('focus restored',await page.getByRole('button',{name:'Explore CHEM IS TRY',exact:true}).evaluate(el=>el===document.activeElement));
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:900});await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(500);
  console.log('layout',width,await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,canvas:document.querySelectorAll('canvas').length})));
  await page.locator('img').evaluateAll(images=>Promise.all(images.map(img=>{img.loading='eager';return img.decode().catch(()=>{});})));for(let y=0;y<await page.evaluate(()=>document.documentElement.scrollHeight);y+=750){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(120);}
  await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(500);
  await page.screenshot({path:`artifacts/redesign/full-${width}-light.png`,fullPage:true});
  await page.getByRole('button',{name:'Switch to dark mode'}).click();await page.waitForTimeout(300);
  await page.screenshot({path:`artifacts/redesign/full-${width}-dark.png`,fullPage:true});
  await page.getByRole('button',{name:'Switch to light mode'}).click();
 }
 await page.setViewportSize({width:390,height:844});
 await page.getByRole('button',{name:'Open navigation'}).click();
 await page.locator('#mobile-menu a[href="#projects"]').click();
 if(await page.locator('#mobile-menu').count())throw new Error('Mobile selection did not close menu');
 await page.getByRole('button',{name:'Open navigation'}).click();await page.keyboard.press('Escape');
 if(await page.locator('#mobile-menu').count())throw new Error('Mobile Escape failed');
 await page.getByRole('button',{name:'Academic 5',exact:true}).click();await page.waitForTimeout(400);
 if(await page.locator('#projects article').count()!==5)throw new Error('Academic filtering failed');
 await page.getByRole('button',{name:'Production 8',exact:true}).click();await page.waitForTimeout(400);
 if(await page.locator('#projects article').count()!==8)throw new Error('Production filtering failed');
 await page.getByRole('button',{name:'Send message',exact:true}).click();
 if(await page.locator('[aria-invalid="true"]').count()!==3)throw new Error('Contact validation failed');
 await page.route('https://api.emailjs.com/**',route=>route.fulfill({status:500,body:'Test failure'}));
 await page.getByLabel('name',{exact:true}).fill('Portfolio QA');await page.getByLabel('email',{exact:true}).fill('qa@example.com');await page.getByLabel('message',{exact:true}).fill('Local mocked submission only. No email is sent.');
 await page.getByRole('button',{name:'Send message',exact:true}).click();await page.getByText('Your message could not be sent.',{exact:false}).waitFor();
 await page.unroute('https://api.emailjs.com/**');await page.route('https://api.emailjs.com/**',route=>route.fulfill({status:200,body:'OK'}));
 await page.getByRole('button',{name:'Send message',exact:true}).click();await page.getByText('Thank you! Your message was sent successfully.').waitFor();
 const anchors=await page.locator('a[href^="#"]').evaluateAll(links=>links.map(a=>a.getAttribute('href')).filter(h=>!document.querySelector(h)));if(anchors.length)throw new Error('Broken anchor');
 await page.locator('img').evaluateAll(images=>Promise.all(images.map(img=>{img.loading='eager';return img.decode().catch(()=>{});})));const broken=await page.locator('img').evaluateAll(images=>images.filter(img=>!img.naturalWidth).map(img=>img.src));if(broken.length)throw new Error('Broken images '+broken);
 console.log('mobile navigation, filters, anchors, image paths, mocked contact states passed');
 await page.setViewportSize({width:1440,height:900});
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(400);
 if(await page.locator('canvas').count())throw new Error('Reduced motion should use static preview');
 await page.getByRole('button',{name:'HireMe',exact:true}).click();
 await page.getByText('Services, made simpler.',{exact:true}).waitFor();
 const fallbackPage=await browser.newPage({viewport:{width:1440,height:900}});
 await fallbackPage.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){if(type==='webgl'||type==='webgl2'||type==='experimental-webgl')return null;return original.call(this,type,...args);};});
 await fallbackPage.goto('http://127.0.0.1:4173/Portfolio/');await fallbackPage.locator('.showcase-fallback').waitFor();await fallbackPage.waitForTimeout(1500);
 if(!await fallbackPage.locator('.showcase-fallback').isVisible())throw new Error('WebGL fallback failed');
 await Promise.race([fallbackPage.close(), new Promise(resolve=>setTimeout(resolve,5000))]);
 console.log('reduced motion and WebGL fallback passed');
 console.log('errors',errors);if(errors.length)throw new Error('Runtime errors');
}catch(error){console.error(error);process.exitCode=1;}finally{await Promise.race([browser.close(),new Promise(resolve=>setTimeout(resolve,5000))]);}

process.exit(process.exitCode || 0);
