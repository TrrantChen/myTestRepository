// let btonDisableTest = new Vue({
//     el: "#btonDisableTest",
//     data: {
//         list: [],
//     },
//     computed: {
//       setDisable: function() {
//           if (this.list.length !== 0) {
//               console.log(this.$refs.disableBtn);
//           }
//       }
//     },
//     methods: {
//         changeHandle: function() {
//             this.list.push(1);
//         }
//     },
// })

// let selectpickTest = new Vue({
//     el: "#selectpickTest",
//     data: {
//         lstData: [1, 2, 3],
//         pickData: '',
//     },
//     created() {
//       this.pickData = this.lstData[0];
//     },
// })

// let testUndifne = new Vue({
//     el: "#testUndifne",
//     data: {
//         elem: void 0,
//     },
// })

// let computedDisableTest = new Vue({
//     el: "#computedDisableTest",
//     data: {
//         isDisabled: false,
//         index: 1,
//     },
//     methods: {
//         clickHandle() {
//             ++this.index;
//             this.index % 2 === 0 ? this.isDisabled = true : this.isDisabled = false;
//         },
//     },
//     computed: {
//         getDisabled() {
//           return this.isDisabled;
//         },
//     }
// })

// let inputModelSimulation = new Vue({
//     el: "#inputModelSimulation",
//     data: {
//         message: "test",
//     },
//     methods: {
//         clickHandle() {
//             this.message = new Date();
//         }
//     }
// });

// let test4binding = new Vue({
//   el: "#test4binding",
//   data: {
//     message: 1,
//   },
//   methods: {
//     changeHande() {
//       if (this.message % 2 === 0) {
//         this.message = 1;
//       } else {
//         this.message = 2;
//       }
//     },
//   }
// })

// let componentModelTest = new Vue({
//   el: "#componentModelTest",
//   data: {
//     message: "test_data",
//   },
//   components: {
//     'my_input': {
//       props: ['value'],
//       data() {
//         return {
//           inner_data: '',
//         }
//       },
//       template: `
//       <div>
//         <input type="text" :value="value" @input="inputHandle">
//         <span>inner value {{ inner_data }}</span>      
//       </div>
//       `,
//       methods: {
//         inputHandle(evt) {
//           this.$emit('input', evt.target.value);
//         }
//       }
//     }
//   }
// });

// let testFromWeb = new Vue({
//   el: '#testFromWeb',
//   components: {
//     'modal': {
//       template: `  
//           <div class="modal" v-show="visible">
//               <div class="close" @click="cancel">X</div>
//           </div>`,
//       props: {
//         value: {
//           type: Boolean,
//           default:false,
//         },       
//       },
//       data() {
//         return {
//           visible: false,
//         }
//       },
//       watch: {
//         value(val) {
//           this.visible = val;
//         },
//         visible(val) {
//           this.$emit('input', val);
//         },
//       },
//       methods: {
//         cancel() {
//           this.visible = false;
//         }
//       },
//       mounted() {
//         if(this.value) {
//           this.visible = true; 
//         }
//       }
//     }
//   },
//   data: {
//     isShow:false,
//   },
// });

// let objTest = new Vue({
//   el: "#objTest",
//   data: {
//     obj: {
//       name: '',
//       num: '',
//     },
//   },
//   methods: {
//     clickHandle() {
//       let objTmp = {
//         name: 'test',
//         num: '1',
//       }

//       let keys = Object.keys(objTmp);
//       let keyLength = keys.length;

//       for (var i = 0; i < keyLength; i++) {
//         this.obj[keys[i]] = objTmp[keys[i]];
//       }
//     }
//   }
// });

// let dynamicSelectpicks = new Vue({
//   el: '#dynamicSelectpicks',
//   data: {
//       objLst: [
//         {
//           selectValue:'',
//           selectOptions: [1, 2, 3],
//         },
//         {
//           selectValue:'',
//           selectOptions: [40, 50, 30],
//         },
//         {
//           selectValue:'',
//           selectOptions: ['a', 'b', 'c'],
//         },
//       ],
//       test_data: 0,
//       async_data: 0,
//   },
//   // created() {
//   async created() {
//     let result = await this.promiseTest();
//     console.group("created====================");
//     console.log('this.$data');
//     let tmp1 = $.extend(true, {}, this.$data);
//     console.log(tmp1);
//     console.log('this.$el');
//     let tmp2 = $.extend(true, {}, this.$el);
//     if (tmp2) {
//         console.log(tmp2.innerHTML);
//     } else {
//         console.log(void 0);
//     }
//     console.log('this.test_data');
//     let tmp3 = this.test_data;
//     console.log(tmp3);
//     console.groupEnd();    
//     // let result = await this.promiseTest();
//     // console.log(result);
//     // console.log("111");
//     // 
    
//   },
//   mounted() {
//     console.group("mounted====================");
//     console.log('this.$data');
//     let tmp1 = $.extend(true, {}, this.$data);
//     console.log(tmp1);
//     console.log('this.$el');
//     let tmp2 = $.extend(true, {}, this.$el);
//     if (tmp2) {
//         console.log(tmp2.innerHTML);
//     } else {
//         console.log(void 0);
//     }
//     console.log('this.test_data');
//     let tmp3 = this.test_data;
//     console.log(tmp3);
//     console.groupEnd();    
//     console.log("1112");
//   },
//   computed: {
//     methodReturnInComputed() {
//       return 2;
//     },
//     async getAsyncTest() {
//       this.async_data = await this.promiseTest();
//       console.log("i am called");
//       return this.async_data;
//     }    
//   },
//   methods: {
//     addHandle() {
//       this.objLst.push({
//           selectValue:'',
//           selectOptions: [18, 29, 38],        
//       });
//     },
//     removeHandle() {
//       this.objLst.splice(0, 1);
//     },
//     methodReturn() {
//       return 1;
//     },
//     promiseTest() {
//       let promise = new Promise((resolve, reject) => {
//         setTimeout(() => {
//           try {
//             // throw new Error("just a error");
//             resolve(10);   
//           } catch (e) {
//             reject(e);
//           }
//         }, 500)
//       }); 
//       return promise;  
//     },    
//   }
// })

// async function asyncTestAndError() {

//   function promiseTest() {
//     let promise = new Promise((resolve, reject) => {
//       setTimeout(() => {
//         try {
//           // throw new Error("just a error");
//           resolve(10);   
//         } catch (e) {
//           reject(e);
//         }
//       }, 500)
//     });  

//     return promise;  
//   }

//   try {
//     let result = await promiseTest();
//     console.log(result);
//   }
//   catch (e) {
//     console.log(e);
//   }

// }

// // asyncTestAndError();


// let modelInSelectPick = new Vue({
//   el: "#modelInSelectPick",
//   data: {
//     message: '',
//   },
//   components: {
//     'my_select': {
//       props: {
//         value: null,
//       },
//       data() {
//         return {
//           file_type_list: [1, 2, 3]
//         }
//       },
//       template: `
//         <select :value="value" class="form-control" @input="inputHandle">
//             <option :value="file_type" v-for="file_type in file_type_list">{{ file_type }}</option>
//         </select>
//       `,
//       methods: {
//         inputHandle(evt) {
//           this.$emit("input", evt.target.value);
//         }
//       },
//     },
//   },
// })

//     // <select v-model="filed.field_type" class="form-control" >
//     //     <option :value="file_type" v-for="file_type in file_type_list">{{ file_type }}</option>
//     // </select>

// let slotComponent = new Vue({
//   el: "#slotComponent",
//   data: {
//     message: '',
//     is: false,
//   },
//   components: {
//     'my_select': {
//       props: {
//           value: null,
//           is_disable: {
//               type: Boolean,
//               default: true,
//           },
//       },
//       data() {
//         return {
//         }
//       },
//       template: `
//       <div>
//         <div v-if="is_disable" class="text">{{ value }}</div>
//         <template v-else>
//             <slot></slot>
//         </template>      
//       </div>
//       `,
//       methods: {
//         inputHandle(evt) {
//           this.$emit("input", evt.target.value);
//         }
//       },
//     },
//   },
// })


// Vue.directive('glisten', {
//   bind: function() {
//     console.log("this is bind");
//     console.log(arguments);
//   }, 
//   inserted: function (el, binding) {
//     console.log("this is inserted");
//     console.log(arguments);
//   },
//   update: function(el, binding) {
//     if (binding.value) {
//       console.log(binding.value);
//     } else {
//       console.log("empty");
//     }
//   }
// })

// let directiveTest = new Vue({
//   el: "#directiveTest",
//   data: {
//     num: false,
//   },
//   methods: {
//     add() {
//       this.num = !this.num;
//     }
//   }
// })


let objModel = new Vue({
  el: "#objModel",
  data: {
    message_obj: {
      data1: '',
      data2: '',
    }
  },
  created() {
  },
  components: {
    "obj_components": {
      props: {
        obj_value: null,
      },
      created() {
        // console.log("this is alert from components");
      },
      data() {
        return {
        }
      },
      template: `
      <div>
        <input :value="obj_value.data1" type="text" @input="inputHandle1"/>
        <input :value="obj_value.data2" type="text" @input="inputHandle2"/>
      </div>
      `,
      methods: {
        inputHandle1(evt) {
          this.$emit('input1', evt.target.value);
        },
        inputHandle2(evt) {
          this.$emit('input2', evt.target.value);
        },
      }
    },
  },
  methods: {
    parent_input1(value) {
      this.message_obj.data1 = value;
    }, 
    parent_input2(value) {
      this.message_obj.data2 = value;
    }
  },
});


let test4jsx = new Vue({
  el: '#test4jsx',
  components: {
    'anchored-heading': {
      // template: `
      //     <h1 v-if="level === 1">
      //       <slot></slot>
      //     </h1>
      //     <h2 v-else-if="level === 2">
      //       <slot></slot>
      //     </h2>
      //     <h3 v-else-if="level === 3">
      //       <slot></slot>
      //     </h3>
      //     <h4 v-else-if="level === 4">
      //       <slot></slot>
      //     </h4>
      //     <h5 v-else-if="level === 5">
      //       <slot></slot>
      //     </h5>
      //     <h6 v-else-if="level === 6">
      //       <slot></slot>
      //     </h6>
      // `,
      render: function(createElement) {
        return createElement(
          'h' + this.level,
          this.$slots.default
        )
      },
      props: {
        level: {
          type: Number,
          required: true,
        },
      },      
    }
  }
})

 


