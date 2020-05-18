import { shallowMount, createLocalVue } from '@vue/test-utils';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from '../App';

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(IconsPlugin);
localVue.use(Vuex);
localVue.use(VueRouter);

describe.only('Vue', () => {
  let wrapper;

  describe('App', () => {
    beforeEach(() => {
      wrapper = shallowMount(App, {
        localVue,
      });
    });
    it('renders navbar', () => {
      expect(wrapper.html()).toContain('navbar-stub');
    });
    it('renders router view', () => {
      expect(wrapper.html()).toContain('router-view-stub');
    });
  });
});
