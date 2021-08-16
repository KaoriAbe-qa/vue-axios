import { mount } from '@vue/test-utils';
import Result from '@/components/Result';

test("test Result Component",function(){
    const wrapper = mount(Result,{
      props:{
        items: ["testdata"],
        loadProgress:true
      }
    });

    const dateStr = "2021-09-26T11:01:22+09:00"
    //dateStrの値確認
    console.log(wrapper.vm.getYear(dateStr))
    expect(wrapper.vm.getYear(dateStr)).toBe(2021)
})