<template>
  <div class="relative bg-primary flex h-auto md:h-screen" id="login">
    <div class="mx-auto my-auto">
      <h3 class="font-bold text-white text-center text-2xl mt-12">Sign Up</h3>
      <p class="text-center text-white mt-3">Please enter your details below</p>
      <section class="my-8">
        <el-form ref="signUpForm" :model="signUpForm" :rules="rules">
          <div class="relative">
            <el-form-item prop="first_name">
              <el-input
                class="placeholder-white text-white"
                placeholder="First Name"
                v-model="signUpForm.first_name"
              ></el-input>
            </el-form-item>
            <img src="@/assets/img/person.svg" alt="" class="absolute top-4 left-1.5">
          </div>
          <div class="relative mt-7">
            <el-form-item prop="last_name">
              <el-input
                class="placeholder-white text-white"
                placeholder="Last Name"
                v-model="signUpForm.last_name"
              ></el-input>
            </el-form-item>
            <img src="@/assets/img/person.svg" alt="" class="absolute top-4 left-1.5">
          </div>
          <div class="relative mt-7">
            <el-form-item prop="last_name">
              <el-input
                class="placeholder-white text-white"
                placeholder="Phone Number"
                v-model="signUpForm.phone_number"
                v-numeric-only
                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                maxlength="11"
              ></el-input>
            </el-form-item>
            <img src="@/assets/img/person.svg" alt="" class="absolute top-4 left-1.5">
          </div>
          <div class="relative mt-7">
            <el-form-item prop="dob">
              <el-date-picker
                v-model="signUpForm.dob"
                type="date"
                placeholder="Enter Date of birth"
              >
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="relative mt-7">
            <el-form-item prop="email">
              <el-input
                class="placeholder-white text-white"
                placeholder="E-mail-Address"
                v-model="signUpForm.email"
              ></el-input>
            </el-form-item>
            <img src="@/assets/img/person.svg" alt="" class="absolute top-4 left-1.5">
          </div>
          <div class="relative mt-7">
            <el-form-item prop="password">
              <el-input
                class="placeholder-white text-white"
                placeholder="Password"
                v-model="signUpForm.password"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
            <img src="@/assets/img/key.svg" alt="" class="absolute top-4 left-1.5">
          </div>
          <button
            @click.prevent="saveToLocalStorage"
            class="w-full text-center mt-5 py-2 border-0 bg-white rounded-lg font-semibold text-xl text-primary hover:shadow-lg"
          >
            {{ loader ? 'Submitting...' : 'Sign Up'}}
          </button>
          <p @click="goToLogin" class="cursor-pointer text-sm text-center text-white pt-3 underline">Already have an acount? Sign in here</p>
        </el-form>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loader: false,
      signUpForm: {
        first_name: '',
        last_name: '',
        phone_number: '',
        dob: '',
        email: '',
        password: '',
      },
      rules: {
        first_name: [
          {
            required: true,
            message: 'Please enter your first name'
          }
        ],
        last_name: [
          {
            required: true,
            message: 'Please enter your last name'
          }
        ],
        phone_number: [
          {
            required: true,
            message: 'Please enter your phone number'
          }
        ],
        dob: [
          {
            required: true,
            message: 'Please enter your date of birth'
          }
        ],
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
    goToLogin() {
      this.$router.push({ name: 'login'})
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    saveToLocalStorage() {
      this.loader = true
      let existingEntries = JSON.parse(localStorage.getItem("allEntries"));
      if(existingEntries === null) existingEntries = [];
      this.$refs['signUpForm'].validate((valid) => {
        if(valid) {
          const payload = {
            id: existingEntries.length === 0 ? 1 : existingEntries.length + 1,
            first_name: this.signUpForm.first_name,
            last_name: this.signUpForm.last_name,
            phone_number: this.signUpForm.phone_number,
            dob: this.signUpForm.dob,
            email: this.signUpForm.email,
            password: this.signUpForm.password
          }
          existingEntries.push(payload)
          localStorage.setItem("allEntries", JSON.stringify(existingEntries));
          this.loader = false
          this.resetForm('signUpForm')
          this.$router.push({ name: 'login'})
        }
      })
    }
  },
}
</script>

<style>

</style>