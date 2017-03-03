import { UtilitydeltaFrontendPage } from './app.po';

describe('utilitydelta-frontend App', () => {
  let page: UtilitydeltaFrontendPage;

  beforeEach(() => {
    page = new UtilitydeltaFrontendPage();
  });

  it('should display message saying UtilityDelta Frontend Hello World', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('UtilityDelta Frontend Hello World!');
  });
});
