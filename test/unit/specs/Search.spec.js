import { shallowMount, createLocalVue, mount } from '@vue/test-utils';
import Vue from 'vue'
import Search from '@/components/Search'
import axios from 'axios'
import flushPromises from 'flush-promises'

const localVue = createLocalVue()
localVue.prototype.$http = axios

//axiosをモック化する
//jest.mock('axios')
//↑で書くとこのエラーが出る：Cannot read property 'data' of undefined
//が、dataに入れる値が反映されてない気がする
jest.mock("axios", () => ({
    get: jest.fn(() => Promise.resolve({ data: 
        "test"   
    }))
}));

describe('Search', () => {

    //axios.getメソッドが呼ばれたかどうかの確認
    it("イベントを発火する", async() => {
        const wrapper = shallowMount(Search, { sync: false })   
        wrapper.vm.exe()   
        //console.log(wrapper.emitted())
        expect(axios.get).toHaveBeenCalled()
    })
    
    //input要素への値を設定はsetValueメソッドを使う
    //非同期async/await関数を利用
    it('フォーム + emit(v-model)のテスト', async () => {
        const wrapper = shallowMount(Search, { sync: false }) 
        //v-model使用→テキストに入力した値と変数が連動（逆も然り）
        const input = wrapper.get('input[type="text"]')
        
        input.setValue('dummy')
        wrapper.trigger('input[type="submit"]')

        //呼び出せてはいる
        expect(axios.get).toHaveBeenCalled()

        //テキストに入力した値と変数の連動はOK
        //console.log(wrapper.vm.term)
        expect(wrapper.vm.term).toBe('dummy')
    })


    it('axiosのテスト', async () => {
        // mockImplementationで戻り値を設定できる
        // const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(() => {
        //     return Promise.resolve({})
        // })

        //shallowMountの実行時オプションにsync: falseを付ける
        const wrapper = shallowMount(Search, { sync: false })        

        //関数の確認がしたい
        //↓でアクセス？
        //wrapper.vm.exe()

        //undefined？？
        //console.log(wrapper.emitted("loadStart"))
        //console.log(wrapper.emitted("loadComplete"))

        //async exe()＝非同期関数なのでPromiseが返ってくる
        //Promise { <pending> }　なので処理前→Search.vueだけならそれでよい？？
        //console.log(wrapper.vm.exe())
        //console.log(wrapper.emitted())
        //console.log(wrapper.vm.term)

        //axiosコール時にパラメータを渡しているかのテスト
        //%が変わらないので何かが違う
        //expect(axiosSpy).toHaveBeenCalledWith(`//itunes.apple.com/search?term=${wrapper.vm.term}&country=jp&entity=musicVideo`)
        wrapper.find('.submit').trigger('click')
        await flushPromises()
        expect(wrapper.vm.term).toBe('')
    })

    // it("emit触ってみる", async() => {
    //     const $emit= jest.fn()
    //     const wrapper = shallowMount(Search,{
    //         data(){
    //           return {
    //             term: "test",
    //           }
    //         },
    //         mocks: {
    //             $emit
    //         }
    //     }); 
    //     wrapper.vm.exe()
    //     console.log(wrapper.emitted("loadStart"))
    //     wrapper.emitted("loadStart")
    //     await flushPromises()
    //     axios.get
    //     console.log(wrapper.emitted("loadComplete"))
        
        
    // })
    

})

