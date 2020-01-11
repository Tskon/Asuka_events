import {mount} from '@vue/test-utils'
import Greeting from "../src/components/Greeting"

describe('Greeting.vue', () => {
  it('отрисовка приветствия', () => {
    const wrapper = mount(Greeting)
    expect(wrapper.text()).toMatch('Vue и TDD')
  })
})
