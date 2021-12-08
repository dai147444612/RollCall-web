<template>
  <el-row>
    <el-col :span="24">
     <div class="grid-content bg-purple-dark">
      <el-dropdown>
          <span class="el-dropdown-link">选择班级
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        <template #dropdown>
          <el-dropdown-menu >
            <el-dropdown-item v-for="(item,index) in Class" :key="index"  @click="getPeople(item)">{{item}}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      </div>
      <el-button type="primary" @click="rollCall" id="button">选取幸运儿</el-button>
    </el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :span="20"><div class="grid-content bg-purple" >
      <el-tag v-for="i in ClassPeople" :key="i.name" class="student" color="white" >{{i.name}}</el-tag>
    </div></el-col>
  </el-row>
</template>

<script>
import axios from "axios";

export default {
  name: "RollCall",
  data: function () {
    return {
      Class: [],
      ClassPeople: [],
      people:'',
      flag:true,
      index:1,
      fun:'',
      fun1:'',
      s:''
    }
  },
  mounted() {
    this.getClasses()
  },
  methods: {
    getClasses() {
      axios.get('http://localhost:9099/RollCall/people/getClasses')
          .then(res => {
                this.Class = res.data.message
              }
          )
    },

    getPeople(item) {
      axios.get(`http://localhost:9099/RollCall/people/getPeople?classes=${item}`).then(res =>{
        this.ClassPeople = res.data.message
      })
    },

    rollCall() {
      if (this.flag) {
        this.roll()
        this.flag=!this.flag
        document.getElementById("button").innerText="选中幸运儿"
      }else {
        document.getElementById("button").innerText="选取幸运儿"
        clearInterval(this.fun)
        this.index = Math.floor(Math.random() * this.ClassPeople.length + 1)
        while (this.ClassPeople[this.index].isHava > 0) {
          this.ClassPeople[this.index].isHave--
          this.index = Math.floor(Math.random() * this.ClassPeople.length + 1)
        }
        document.getElementsByClassName("student").item(this.index - 1).style.backgroundColor = "red"
        this.flag=!this.flag
        axios.post("http://localhost:9099/RollCall/people/hit", {
          "studentId": this.ClassPeople[this.index - 1].id
        })
      }
    },
    roll: function () {
      document.getElementsByClassName("student").item(this.index - 1).style.backgroundColor = "white"
      this.fun = setInterval(() => {
        const colorIndex = Math.floor(Math.random() * this.ClassPeople.length + 1);
        document.getElementsByClassName("student").item(colorIndex).style.backgroundColor = "red"
        this.fun1=setInterval(()=>{
          document.getElementsByClassName("student").item(colorIndex).style.backgroundColor = "white"
          clearInterval(this.fun1)
        },100)
      }, 200);
    }
  }
}
</script>



<style >

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
