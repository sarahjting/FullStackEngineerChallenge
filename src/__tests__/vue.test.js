import { mount, createLocalVue } from '@vue/test-utils';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from '../App';
import store from '../vuex';
import router from '../router';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(BootstrapVue);
localVue.use(IconsPlugin);
localVue.use(Vuex);

describe.only('App', () => {
  const wrapper = mount(App, {
    localVue,
    router,
    store,
  });
  it('renders navbar', () => {
    expect(wrapper.html()).toContain('PayPay Assessment');
  });
  it('begins logged out', () => {
    expect(wrapper.html()).toContain('Login');
  });
});
