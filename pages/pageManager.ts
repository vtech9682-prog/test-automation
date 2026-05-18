import { Page } from '@playwright/test';
import { LoginPage } from './loginPage';
import { PimPage } from './pimPage';
import {DataUtils} from '../utils/dataUtils';

export class PageManager {
  readonly loginPage: LoginPage;
  readonly pimPage: PimPage;
  readonly dataUtils: DataUtils;

  constructor(page: Page) {
    this.loginPage = new LoginPage(page);
    this.pimPage = new PimPage(page);
    this.dataUtils = new DataUtils();
  }
}
