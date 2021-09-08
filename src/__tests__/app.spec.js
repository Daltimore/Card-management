/* eslint-disable no-undef */
import { mount, shallowMount } from '@vue/test-utils'
import App from '../App.vue'

shallowMount(App, {
  global: {
    stubs: ['router-link', 'router-view']
  }
})


describe('Mounted App', () => {
  const wrapper = mount(App);

  it('is instantiated', () => {
    expect(wrapper.vm).toBeTruthy();
  });
})