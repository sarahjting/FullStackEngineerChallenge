import { mount, createLocalVue } from '@vue/test-utils';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueRouter from 'vue-router';
import App from '../App';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(BootstrapVue);
localVue.use(IconsPlugin);
const router = new VueRouter();

describe.only('App', () => {
  const wrapper = mount(App, {
    localVue,
    router,
  });
  it('renders navbar', () => {
    expect(wrapper.html()).toContain('PayPay Assessment');
  });
});
