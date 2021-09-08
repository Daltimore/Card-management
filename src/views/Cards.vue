<template>
  <div class="px-8 md:px-20 py-16" id="cards">
    <div class="flex justify-between items-center">
      <h4 class="text-2xl font-semibold">My Cards</h4>
      <button
        @click.prevent="openCreateModal"
        class="border-2 border-primary rounded text-primary w-32 md:w-40 py-2"
      >
        + Add Card
      </button>
    </div>
      <div
        v-if="allMyCards.length === 0"
        class="flex justify-center items-center my-20 flex-col"
      >
        <img src="@/assets/img/no-data.svg" />
        <h4 class="text-2xl font-bold pt-5">You do not have any cards!!</h4>
      </div>
      
      <section class="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10" v-else>
        <div
          v-for="(card, index) in allMyCards"
          :key="index"
          @click="toggleCard(card)"
          class="my_card"
        >
        <transition name="flip">
          <div class="relative pt-12 pl-5 justify-center font-bold">
            {{ card.flipped ? card.cvv : card.card_number.match(/.{1,4}/g).join(' ') }}
            <span @click="removeCard(index)" class="absolute top-0 right-0 bg-red-500 text-white cursor-pointer rounded-full p-1 w-8 h-8 border border-red-500 flex justify-center">X</span>
            <p class="text-xl capitalize absolute -bottom-20 right-2">{{user.first_name}} {{user.last_name}}</p>
          </div>
        </transition>
      </div>
    </section>
    <el-dialog
      title=""
      :visible.sync="createCardModal"
      width="40%"
      >
      <div class="">
        <h2 class="text-xl font-semibold pb-4">Create Card</h2>
        <el-form ref="createCardForm" :model="createCardForm" :rules="rules">
          <el-form-item prop="card_number">
            <el-input
              class=""
              placeholder="Enter your card number"
              v-model="createCardForm.card_number"
              v-numeric-only
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="16"
            ></el-input>
          </el-form-item>
          <el-form-item prop="expiry_date">
            <el-date-picker
              v-model="createCardForm.expiry_date"
              type="date"
              placeholder="Select card's expiry date"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="cvv">
            <el-input
              class=""
              placeholder="Enter card's cvv"
              v-model="createCardForm.cvv"
              v-numeric-only
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="3"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="flex justify-end">
          <button
            @click.prevent="handleCreate"
            class="bg-primary text-white py-3 font-semibold px-4
            rounded focus:outline-none"
          >Add Card</button>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title=""
      :visible.sync="successModal"
      width="30%"
      >
      <div class="flex justify-center items-center flex-col">
        <img src="@/assets/img/check.svg" class="w-10" />
        <h2 class="text-xl font-semibold pt-4">Card Added Successfully</h2>
      </div>
    </el-dialog>
    <el-dialog
      title=""
      :visible.sync="deleteModal"
      width="30%"
      >
      <div class="flex justify-center items-center flex-col">
        <img src="@/assets/img/wrong.svg" class="w-10 border border-red-500 p-2 rounded-full" />
        <h2 class="text-xl font-semibold pt-4">Card deleted Successfully</h2>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { encryptStorage } from '../helpers/function'

export default {
  data() {
    return {
      createCardModal: false,
      successModal: false,
      deleteModal: false,
      loader: false,
      user: {},
      allMyCards: [],
      createCardForm: {
        card_number: '',
        expiry_date: '',
        cvv: ''
      },
      rules: {
        card_number: [
          {
            required: true,
            message: 'Please enter card number',
          }
        ],
        expiry_date: [
          {
            required: true,
            message: "Please enter card's expiry date"
          }
        ],
        cvv: [
          {
            required: true,
            message: "Please enter card's cvv"
          }
        ]
      },
    }
  },
  mounted() {
    let local = JSON.parse(localStorage.getItem('authObject'));
    this.user = local
    if(!local) {
      this.$router.push({ name: 'login'})
    }

    this.fetchCards()
  },
  methods: {
    openCreateModal() {
      this.createCardModal = true
    },
    toggleCard(card) {
      card.flipped = !card.flipped;
    },
    handleCreate() {
      this.loader = true
      this.$refs['createCardForm'].validate((valid) => {
        if(valid) {
          let payload = {
            card_number: this.createCardForm.card_number,
            expiry_date: this.createCardForm.expiry_date,
            cvv: this.createCardForm.cvv,
            flipped: false
          }
          let existingCards = encryptStorage.getItem('myCards')
            existingCards.push(payload)
            this.successModal = true
            this.loader = false
            // this.successModal = false
            encryptStorage.setItem('myCards', existingCards)
            this.fetchCards()
            this.createCardModal = false
        }
      })
    },
    fetchCards() {
      const decryptedData = encryptStorage.getItem('myCards');
      this.allMyCards = decryptedData
      this.$forceUpdate()
    },
    removeCard(index) {
      const cards = encryptStorage.getItem('myCards')
      cards.splice(index, 1)
      this.deleteModal = true
      encryptStorage.setItem('myCards', cards)
      this.fetchCards()
    }
  }
}
</script>

<style>
.my_card {
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  width: 243px;
  height: 153px;
}

</style>