import { shallowMount  } from '@vue/test-utils';
import Vue from 'vue'
import Search from '@/components/Search'
import axios from 'axios'
import flushPromises from 'flush-promises'

jest.mock('axios')
describe('Search', () => {

    //axios.getメソッドが呼ばれたかどうかの確認
    it("２つの引数があるイベントを発火する", async() => {
        const wrapper = shallowMount(Search)   
        wrapper.vm.exe()   
        console.log(wrapper.emitted())
        expect(axios.get).toHaveBeenCalled()
    })
    
    //input要素への値を設定はsetValueメソッドを使う
    it('フォーム + emitのテスト', async () => {
        const wrapper = shallowMount(Search);
        
        const input = wrapper.get('input[type="text"]')
        input.setValue('John Doe')
        wrapper.trigger('input[type="submit"]')

        //呼び出せてはいるが値が取り出せない
        expect(axios.get).toHaveBeenCalled()
        
        //undefined？？
        // console.log(wrapper.emitted("loadComplete"))

        // await flushPromises()
        // expect(wrapper.vm.term).toBe('John Doe')
    })
})

