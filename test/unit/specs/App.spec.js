import { shallowMount } from '@vue/test-utils';
import App from '@/App';


describe('App', () => {
    it("test App onLoadStart()",() => {
      const wrapper = shallowMount(App,{
        data(){
          return {
            items: [],
            loadProgress: false,
          }
        }
      });     
      //↑もともとfalseのloadProgressがonLoadStart()でtrueになる確認
      wrapper.vm.onLoadStart()
      wrapper.vm.loadProgress
      expect(wrapper.vm.loadProgress).toBe(true)
    })


    it("test App onLoadComplete",() => {
        const wrapper = shallowMount(App,{
          data(){
            return {
              items: [],
              loadProgress: false,
            }
          }
        });
        //onLoadComplete({ results })でfalseになる確認
        const results = "test"
        wrapper.vm.onLoadComplete({ results })
        expect(wrapper.vm.loadProgress).toBe(false)
        expect(wrapper.vm.items).toBe("test")
    })


    // test("test App Component again",function(){
    //   const wrapper = mount(App);
      
    // })
  })