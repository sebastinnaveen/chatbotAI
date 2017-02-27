import { ChatAIPage } from './app.po';

describe('chat-ai App', function() {
  let page: ChatAIPage;

  beforeEach(() => {
    page = new ChatAIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
