import {shallowMount, createLocalVue} from "@vue/test-utils"
import Vuex from 'vuex'
import bootstrapVue from 'bootstrap-vue'
import MainMenu from "../src/components/MainMenu"

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(bootstrapVue)

describe('MainMenu', () => {
  let store
  let getters

  beforeEach(() => {
    getters = {
      'user/isAuth': () => true
    }

    store = new Vuex.Store({getters})
  })

  it('menu length = 3', () => {
    const wrapper = shallowMount(MainMenu, {store, localVue})
    expect(wrapper.findAll('b-nav-item-stub').length).toEqual(3)
  })
})
