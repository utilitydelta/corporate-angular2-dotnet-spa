import { UtilitydeltaFrontendPage } from './app.po';

describe('utilitydelta-frontend App', () => {
  let page: UtilitydeltaFrontendPage;

  beforeEach(() => {
    page = new UtilitydeltaFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
