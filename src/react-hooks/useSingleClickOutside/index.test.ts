import { renderHook } from '@testing-library/react-hooks';
import useClickOutside from './index';

describe('useClickOutside', () => {
  let container: HTMLDivElement;
  let container1: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    container1 = document.createElement('div');
    container1.setAttribute('id', 'ele');
    document.body.appendChild(container);
    document.body.appendChild(container1);
  });

  afterEach(() => {
    document.body.removeChild(container);
    document.body.removeChild(container1);
  });

  it('test on dom optional', async () => {
    let state: number = 0;
    const hook = renderHook((dom: any) =>
      useClickOutside(dom, () => {
        state++;
      }),
    );

    hook.rerender(() => container);
    container.click();
    expect(state).toEqual(0);
    document.body.click();
    expect(state).toEqual(1);

    hook.rerender(() => container1);
    container1.click();
    expect(state).toEqual(1);
    document.body.click();
    expect(state).toEqual(2);

    hook.unmount();
    document.body.click();
    expect(state).toEqual(2);
  });

  it('test on ref optional', async () => {
    let state: number = 0;
    const hook = renderHook((dom: any) =>
      useClickOutside(dom, () => {
        state++;
      }),
    );

    hook.result.current.current = container;
    container.click();
    expect(state).toEqual(0);
    document.body.click();
    expect(state).toEqual(1);

    hook.result.current.current = container1;
    container1.click();
    expect(state).toEqual(1);
    document.body.click();
    expect(state).toEqual(2);

    hook.unmount();
    document.body.click();
    expect(state).toEqual(2);
  });
});
