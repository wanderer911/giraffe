import { GiraffePage } from './app.po';

describe('giraffe App', () => {
  let page: GiraffePage;

  beforeEach(() => {
    page = new GiraffePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
