<template>
    <div>
      <form class="contact-form" @submit.prevent="handleSubmit" v-if="formVisible && !submissionSuccess">
        <div class="contact-form__form-field">
          <label>Contact Photo: </label>
          <input type="file" />
        </div>
  
        <div class="contact-form__form-field">
          <label>Salutation: </label>
          <input type="text" v-model="form.salutation" />
        </div>
  
        <div class="contact-form__form-field">
          <label>First Name: </label>
          <input type="text" v-model="form.firstName" />
          <span v-if="!form.firstName && formSubmissionAttempted">First Name is required</span>
        </div>
  
        <div class="contact-form__form-field">
          <label>Last Name: </label>
          <input type="text" v-model="form.lastName" />
          <span v-if="!form.lastName && formSubmissionAttempted">Last Name is required</span>
        </div>
  
        <div class="contact-form__form-field">
          <label>Company Name: </label>
          <input type="text" v-model="form.companyName" />
        </div>
  
        <div class="contact-form__form-field contact-form__form-field--phone" v-for="(phone, index) in form.phoneNumbers" :key="index">
          <div>
            <label>Phone Number: </label>
            <input type="text" v-model="phone.number" />
            <span v-if="!phone.number && formSubmissionAttempted">Phone Number is required</span>
          </div>
          
          <div>
            <label>Type: </label>
            <select v-model="phone.type" required>
                <option value="work">Work</option>
                <option value="cell">Cell</option>
                <option value="home">Home</option>
            </select>
          </div>
          
          <div v-if="form.phoneNumbers.length > 1">
            <label>Primary: </label>
            <input type="radio" v-model="form.primaryPhoneIndex" :value="index" />
          </div>
          
          <div v-if="form.phoneNumbers.length > 1">
            <button class="phone-remove-btn" @click.prevent="removePhone(index)">Remove</button>
          </div>
        </div>
  
        <button class="phone-add-btn" @click.prevent="addPhone">Add Another Phone</button>

        <div class="contact-form__form-field contact-form__form-field--submit">
            <button type="submit">Submit</button>
        </div>
      </form>

      <div v-if="submissionSuccess" class="contact-form__success-message">
        Nice job! You created another contact!
      </div>
    </div>
  </template>
  
<script setup lang="ts">
  import { ref } from 'vue';
  import { db } from '../firebase'; 
  import { setDoc, doc } from "firebase/firestore"; 
  
  const formVisible = ref(true);
  const submissionSuccess = ref(false);
  const formSubmissionAttempted = ref(false);
  
  interface PhoneNumber {
    number: string;
    type: string;
    primary: boolean;
  }
  
  interface Form {
    photo: File | null;
    salutation: string;
    firstName: string;
    lastName: string;
    companyName: string;
    phoneNumbers: PhoneNumber[];
    primaryPhoneIndex: number;
  }
  
  const form = ref<Form>({
    photo: null,
    salutation: "",
    firstName: "",
    lastName: "",
    companyName: "",
    phoneNumbers: [
      {
        number: "",
        type: "work",
        primary: false,
      },
    ],
    primaryPhoneIndex: 0,
  });
  
//   function handleFileUpload(event: Event): void {
//     const target = event.target as HTMLInputElement;
//     if (target.files) {
//       form.value.photo = target.files[0];
//     }
//   }
  
  function addPhone(): void {
    form.value.phoneNumbers.push({
      number: "",
      type: "work",
      primary: false,
    });
  }
  
  function removePhone(index: number): void {
    if (form.value.phoneNumbers.length > 1) {
      form.value.phoneNumbers.splice(index, 1);
      if (form.value.primaryPhoneIndex === index) {
        form.value.primaryPhoneIndex = 0;
      }
    }
  }
  
  async function handleSubmit(): Promise<void> {
    formSubmissionAttempted.value = true;

    if (
        form.value.firstName &&
        form.value.lastName &&
        form.value.phoneNumbers.every(phone => phone.number)
    ) {

        try {
            await setDoc(doc(db, "contacts", new Date().toISOString()), form.value);
            submissionSuccess.value = true;
            formVisible.value = false;
            setTimeout(() => {
                submissionSuccess.value = false;
                window.location.reload();
            }, 1000);
        } catch (e) {
            console.error("Error adding document: ", e);
            submissionSuccess.value = false;
        }
    } else {
        console.error('Form validation failed');
        submissionSuccess.value = false;
    }
    }

</script>
  
<style lang="scss">
  @import '../assets/variables.scss';

    .contact-form {
        background-color: rgba(255, 255, 255, .9);
        border-radius: $border-radius-sm;
        padding: 1.75rem;
        margin-bottom: 2rem;
        box-shadow: $box-shadow-1;

        button {
            background: $color-blue;
            color: $color-white;
            font-weight: 400;
            display: inline-block;
            padding: 6px 10px;
            font-size: .8rem;
            font-family: $font-sans-serif;
            border-radius: $border-radius-sm;
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            border: none;
            cursor: pointer;
            box-shadow: $box-shadow-2;
        }

        label {
            display: block;
            font-weight: 700;
            margin-bottom: 4px;
            font-size: .9rem;
        }

        input[type='text'] {
            width: 100%;
            padding: 10px 12px;
            border-radius: $border-radius-sm;
            font-family: $font-sans-serif;
            border: 1px solid $color-light-gray;
        }

        &__form-field {
            margin-bottom: 1rem;

            span {
                display: block;
                font-size: .8rem;
                margin-top: 3px;
            }

            &--phone {
              display: flex;
              justify-content: space-between;

              > * {
                flex-grow: 1;
                margin-right: 10px;

                &:last-child {
                    margin-right: 0;
                }
              }

              select {
                padding-top: 10px;
                padding-bottom: 10px;
                padding-left: 8px;
                border-radius: $border-radius-sm;
                border: 1px solid $color-light-gray;
              }
            }

            &--submit {
                margin-top: 2rem;

                button {
                    background: $color-pink;
                    color: $color-white;
                    font-weight: 700;
                    display: inline-block;
                    padding: 8px 16px;
                    font-size: 1rem;
                    font-family: $font-sans-serif;
                    border-radius: $border-radius-sm;
                    appearance: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    border: none;
                    cursor: pointer;
                    box-shadow: $box-shadow-2;
                }
            }
        }

        &__success-message {
            padding: 0 0 1.5rem;
            font-weight: 700;
            color: white;
        }
    }
</style>
  