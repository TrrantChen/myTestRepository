<template>
  <div class="hello">
    <table>
      <thead>
        <tr>
          <td>num</td>
          <td>name</td>
          <td>test</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(field, index) in field_list">
          <td><input type="text" v-model="field.field_en_name"></td>
          <td><input type="text" v-model="field.field_ch_name"></td>
          <td><input type="text" v-model="field.field_type"></td>
          <td @click="removeItem(index)" href="javascript:;"><a>remove</a></td>
        </tr>
      </tbody>
    </table>
    <button @click="addItem">add</button>
    <div v-for="field in field_list" >
      <div style="display:inline-block;border: solid 5px black;">{{ field.field_en_name }}</div>
      <div style="display:inline-block;border: solid 5px black;">{{ field.field_ch_name }}</div>
      <div style="display:inline-block;border: solid 5px black;">{{ field.field_type }}</div>
    </div>
  </div>
</template>
<script>

import Test from './test';

export default {
  name: 'HelloWorld',
  components: { Test },
  data () {
    return {
      field_list: [{
        field_en_name: "",
        field_ch_name: "",
        field_type: "",
      }],
    }
  },
  methods: {
    addItem() {
      this.field_list.push({
        field_en_name: "",
        field_ch_name: "",
        field_type: "",
      });
    },
    removeItem(index) {
      this.field_list.splice(index, 1);
    }
  }
}
</script>

