import { test, expect } from '@playwright/test';
import mysql from 'mysql2/promise';

test('DB-driven login test', async ({ page }) => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'testdb'
  });

  const [rows] = await connection.execute('SELECT username, password FROM users WHERE role="admin"');
  const { username, password } = rows[0];

  await page.goto('/login');
  await page.fill('#username', username);
  await page.fill('#password', password);
  await page.click('text=Login');
  await expect(page.locator('h1')).toHaveText('Welcome Admin');
});






import { test } from '@playwright/test';
import PropertiesReader from 'properties-reader';

const properties = PropertiesReader('config.properties');

test('Property file test', async ({ page }) => {
  const baseUrl = properties.get('app.url');
  await page.goto(baseUrl);
});






import { test } from '@playwright/test';
import * as XLSX from 'xlsx';

test('Excel-driven test', async ({ page }) => {
  const workbook = XLSX.readFile('testdata.xlsx');
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);

  for (const row of data) {
    await page.goto('/login');
    await page.fill('#username', row['Username']);
    await page.fill('#password', row['Password']);
    await page.click('text=Login');
  }
});



import mysql from 'mysql2/promise';
import PropertiesReader from 'properties-reader';
import fs from 'fs';
import { parseStringPromise } from 'xml2js';
import * as XLSX from 'xlsx';

export class DataHelper {
  // 🗄️ Database interaction
  static async getDBData(query: string) {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'testdb'
    });
    const [rows] = await connection.execute(query);
    await connection.end();
    return rows;
  }

  // 📜 Property file interaction
  static getProperty(key: string) {
    const properties = PropertiesReader('config.properties');
    return properties.get(key);
  }

  // 📄 XML interaction
  static async getXMLData(filePath: string) {
    const xmlData = fs.readFileSync(filePath, 'utf-8');
    const result = await parseStringPromise(xmlData);
    return result;
  }

  // 📑 Excel interaction
  static getExcelData(filePath: string, sheetName?: string) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[sheetName || workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json(sheet);
  }
}




import { test, expect } from '@playwright/test';
import { DataHelper } from '../utils/DataHelper';

test('Data-driven login from DB', async ({ page }) => {
  const users = await DataHelper.getDBData('SELECT username, password FROM users');
  const { username, password } = users[0];

  await page.goto('/login');
  await page.fill('#username', username);
  await page.fill('#password', password);
  await page.click('text=Login');
  await expect(page.locator('h1')).toHaveText('Welcome');
});

test('Property file driven test', async ({ page }) => {
  const baseUrl = DataHelper.getProperty('app.url');
  await page.goto(baseUrl);
});

test('XML driven test', async ({ page }) => {
  const xmlData = await DataHelper.getXMLData('testdata.xml');
  const username = xmlData.credentials.user[0];
  const password = xmlData.credentials.pass[0];

  await page.goto('/login');
  await page.fill('#username', username);
  await page.fill('#password', password);
  await page.click('text=Login');
});

test('Excel driven test', async ({ page }) => {
  const data = DataHelper.getExcelData('testdata.xlsx');
  for (const row of data) {
    await page.goto('/login');
    await page.fill('#username', row['Username']);
    await page.fill('#password', row['Password']);
    await page.click('text=Login');
  }
});

