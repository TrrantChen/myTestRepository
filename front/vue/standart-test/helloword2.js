let btonDisableTest = new Vue({
    el: "#btonDisableTest",
    data: {
        list: [],
    },
    computed: {
      setDisable: function() {
          if (this.list.length !== 0) {
              console.log(this.$refs.disableBtn);
          }
      }
    },
    methods: {
        changeHandle: function() {
            this.list.push(1);
        }
    },
})

let selectpickTest = new Vue({
    el: "#selectpickTest",
    data: {
        lstData: [1, 2, 3],
        pickData: '',
    },
    created() {
      this.pickData = this.lstData[0];
    },
})

let testUndifne = new Vue({
    el: "#testUndifne",
    data: {
        elem: void 0,
    },
})

let computedDisableTest = new Vue({
    el: "#computedDisableTest",
    data: {
        isDisabled: false,
        index: 1,
    },
    methods: {
        clickHandle() {
            ++this.index;
            this.index % 2 === 0 ? this.isDisabled = true : this.isDisabled = false;
        },
    },
    computed: {
        getDisabled() {
          return this.isDisabled;
        },
    }
})

let inputModelSimulation = new Vue({
    el: "#inputModelSimulation",
    data: {
        message: "test",
    },
    methods: {
        clickHandle() {
            this.message = new Date();
        }
    }
});

let directiveTest = new Vue({
  el: "#directiveTest",
  directives: {
    test: {
      // bind() {
      //   console.log("this is bind");
      // },
      inserted(el) {
        console.log(arguments);
      },
      // update() {
      //   console.log("this is update");
      // },
      // componentUpdated() {
      //   console.log("componentUpdated");
      // },
      // unbind() {
      //   console.log("unbind");
      // },
    },
  },
  // beforeCreate: function() {
  //   console.log("this is beforeCreate");
  // },
  // created: function() {
  //   console.log("this is created");
  // },
  // beforeMount: function() {
  //   console.log("this is beforeMount");
  // },
  // mounted: function() {
  //   console.log("this is mounted");
  // },

})

let test4binding = new Vue({
  el: "#test4binding",
  data: {
    message: 1,
  },
  methods: {
    changeHande() {
      if (this.message % 2 === 0) {
        this.message = 1;
      } else {
        this.message = 2;
      }
    },
  }
})

let componentModelTest = new Vue({
  el: "#componentModelTest",
  data: {
    message: "test_data",
  },
  components: {
    'my_input': {
      props: ['value'],
      data() {
        return {
          inner_data: '',
        }
      },
      template: `
      <div>
        <input type="text" :value="value" @input="inputHandle">
        <span>inner value {{ inner_data }}</span>      
      </div>
      `,
      methods: {
        inputHandle(evt) {
          this.$emit('input', evt.target.value);
        }
      }
    }
  }
});

let testFromWeb = new Vue({
  el: '#testFromWeb',
  components: {
    'modal': {
      template: `  
          <div class="modal" v-show="visible">
              <div class="close" @click="cancel">X</div>
          </div>`,
      props: {
        value: {
          type: Boolean,
          default:false,
        },       
      },
      data() {
        return {
          visible: false,
        }
      },
      watch: {
        value(val) {
          this.visible = val;
        },
        visible(val) {
          this.$emit('input', val);
        },
      },
      methods: {
        cancel() {
          this.visible = false;
        }
      },
      mounted() {
        if(this.value) {
          this.visible = true; 
        }
      }
    }
  },
  data: {
    isShow:false,
  },
});

let objTest = new Vue({
  el: "#objTest",
  data: {
    obj: {
      name: '',
      num: '',
    },
  },
  methods: {
    clickHandle() {
      let objTmp = {
        name: 'test',
        num: '1',
      }

      let keys = Object.keys(objTmp);
      let keyLength = keys.length;

      for (var i = 0; i < keyLength; i++) {
        this.obj[keys[i]] = objTmp[keys[i]];
      }
    }
  }
});

let dynamicSelectpicks = new Vue({
  el: '#dynamicSelectpicks',
  data: {
      objLst: [
        {
          selectValue:'',
          selectOptions: [1, 2, 3],
        },
        {
          selectValue:'',
          selectOptions: [40, 50, 30],
        },
        {
          selectValue:'',
          selectOptions: ['a', 'b', 'c'],
        },
      ],
  },
  methods: {
    addHandle() {
      this.objLst.push({
          selectValue:'',
          selectOptions: [18, 29, 38],        
      });
    },
    removeHandle() {
      this.objLst.splice(0, 1);
    },
  }
})
