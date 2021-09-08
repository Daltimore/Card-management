<template>
  <div class="relative bg-primary flex h-screen" id="login">
    <div class="mx-auto my-auto">
      <h3 class="font-bold text-white text-center text-2xl mt-12">Login</h3>
      <p class="text-center text-white mt-3">Please enter your login details below</p>
      <section class="my-8">
        <el-form ref="loginForm" :model="loginForm" :rules="rules">
          <div class="relative">
            <el-form-item prop="email">
              <el-input
                class="placeholder-white text-white"
                placeholder="E-mail Address"
                v-model="loginForm.email"
              ></el-input>
            </el-form-item>
            <img src="@/assets/img/person.svg" alt="" class="absolute top-4 left-1.5">
          </div>
          <div class="relative mt-7">
            <el-form-item prop="password">
              <el-input
                class="placeholder-white text-white"
                placeholder="Password"
                v-model="loginForm.password"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
            <img src="@/assets/img/key.svg" alt="" class="absolute top-4 left-1.5">
          </div>
          <button
            @click.prevent="handleLogin"
            class="w-full text-center mt-5 py-2 border-0 bg-white rounded-lg font-semibold text-xl text-primary hover:shadow-lg"
          >
            {{ loader ? 'Submitting...' : 'Login'}}
          </button>
          <p @click="goToSignUp" class="cursor-pointer text-sm text-center text-white pt-3 underline">Don't have an acount? Sign up here</p>
        </el-form>
      </section>
    </div>
    <el-dialog
      title=""
      :visible.sync="successModal"
      width="30%"
      >
      <div class="flex justify-center items-center flex-col">
        <img src="@/assets/img/check.svg" class="w-10" />
        <h2 class="text-xl font-semibold pt-4">Successfull</h2>
      </div>
    </el-dialog>
    <el-dialog
      title=""
      :visible.sync="errorModal"
      width="30%"
      >
      <div class="flex justify-center items-center flex-col">
        <img src="@/assets/img/wrong.svg" class="w-10 border border-red-500 p-2 rounded-full" />
        <h2 class="text-xl font-semibold pt-4">User does not exist!</h2>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loader: false,
      successModal: false,
      errorModal: false,
      loginForm: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Please enter your email'
          }
        ],
        password: [
          {
            required: true,
            message: 'Please enter your password'
          }
        ]
      }
    }
  },
  methods: {
    goToSignUp() {
      this.$router.push({ name: 'signup' })
    },
    handleLogin() {
      this.$refs['loginForm'].validate((valid) => {
        if(valid) {
          const payload = {
            email: this.loginForm.email,
            password: this.loginForm.password
          }
          let existingEntries = JSON.parse(localStorage.getItem("allEntries"));
          let result = existingEntries.find(obj => {
            return obj.email === payload.email && obj.password === payload.password;
          })
          if(result === undefined) {
            this.errorModal = true
          } else {
            this.successModal = true
            localStorage.setItem("authObject", JSON.stringify(result))
            this.$router.push({ name: 'cards'})
            let myCards = []
            localStorage.setItem("myCards", JSON.stringify(myCards))
            this.successModal = false
          }
        }
      })
    }
  },
}
</script>

<style>

</style>