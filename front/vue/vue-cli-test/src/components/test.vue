<template>
    <div>
        <div v-for="item in lst">
            <template v-for="obj in item.children">
                <span>{{ obj.view_info.view_id }}</span>
            </template>
            <button @click="changeHandle">change</button>
        </div>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                 lst: [{
                      "layout_type":"row",
                      "ratio":"",
                      children: [{
                          "layout_type":"column",
                          "ratio":"1",
                          "view_info":{
                              "view_id":1,
                              "view_title":"额度查询耗时监控",
                              "view_type":"line",
                              "view_rule_list":[
                                  {
                                      "rule_field_en_name":"S1",
                                      "rule_type":"",
                                      "rule_condition":"",
                                      "rule_value":""
                                  }
                              ],
                              "view_data_list":[
                                  {
                                      "data_axis":"",
                                      "view_type":"",
                                      "data_dimension":"X",
                                      "data_name":"时间",
                                      "field_alias":"X",
                                      "is_default_display":1
                                  },
                                  {
                                      "data_axis":"",
                                      "view_type":"",
                                      "data_dimension":"X",
                                      "data_name":"时间",
                                      "field_alias":"X",
                                      "is_default_display":1,
                                      "default_display_status":"",
                                      "data_field_en_name":"Fmodify_time"
                                  }
                              ]
                          }
                      }]
                 }]
            }
        },
        watch: {
        },
        mounted: function() {
        },
        created() {
        },
        methods: {
            changeHandle() {
                let obj = this.lst[0].children[0];
                obj.view_info = {
                    "view_id":2,
                    "view_title":"额度查询耗时监控",
                    "view_type":"line",
                    "view_rule_list":[
                        {
                            "rule_field_en_name":"S1",
                            "rule_type":"",
                            "rule_condition":"",
                            "rule_value":""
                        }
                    ],
                    "view_data_list":[
                        {
                            "data_axis":"",
                            "view_type":"",
                            "data_dimension":"X",
                            "data_name":"时间",
                            "field_alias":"X",
                            "is_default_display":1
                        },
                        {
                            "data_axis":"",
                            "view_type":"",
                            "data_dimension":"X",
                            "data_name":"时间",
                            "field_alias":"X",
                            "is_default_display":1,
                            "default_display_status":"",
                            "data_field_en_name":"Fmodify_time"
                        }
                    ]
                }
            }
        },
    }
</script>
