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
         class="bg-green-400 p-4"
      >
        <transition name="flip">
          <div>
            {{ card.flipped ? card.cvv : card.card_number }}
            <span @click="removeCard(index)" class="delete-card">X</span>
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
  </div>
</template>

<script>
import { encryptStorage } from '../helpers/function'

export default {
  data() {
    return {
      createCardModal: false,
      loader: false,
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
  computed: {
    
  },
  mounted() {
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
            console.log('Card Added successfully')
            this.loader = false
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
      encryptStorage.setItem('myCards', cards)
      this.fetchCards()
    }
  }
}
</script>

<style>

</style>