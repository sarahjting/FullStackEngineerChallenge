import Vue from 'vue';
import { mount, createLocalVue } from '@vue/test-utils';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from '../App';
import store from '../vuex';
import router from '../router';
import 'regenerator-runtime/runtime.js';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(BootstrapVue);
localVue.use(IconsPlugin);
localVue.use(Vuex);

describe.only('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(App, {
      localVue,
      router,
      store,
    });
  });
  it('renders navbar', () => {
    expect(wrapper.html()).toContain('PayPay Assessment');
  });
  it('begins logged out', () => {
    expect(wrapper.html()).toContain('Login');
  });
  it('does not log in for invalid user', async () => {
    wrapper
      .findAll('input')
      .at(0)
      .setValue('Foo');
    wrapper.find('button').trigger('click');
    await Vue.nextTick();
    expect(wrapper.html()).toContain('Login');
  });
  it('logs in', async () => {
    wrapper
      .findAll('input')
      .at(0)
      .setValue('Admin');
    wrapper.find('button').trigger('click');
    await Vue.nextTick();
    expect(wrapper.html()).toContain('table');
  });
});
