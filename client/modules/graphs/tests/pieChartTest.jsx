import { renderComponent, expect } from '../../../spec/test_helper';
import App from '../../src/components/app';

//user 'describe' to group together similar tests
describe('App', () => {
  let component;

  beforeEach(() => {
   component = renderComponent(App);
  })

  it('shows a comment box', () => {
    expect(component.find('.comment-box')).to.exist;
  });




});