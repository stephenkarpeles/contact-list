<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import ContactCard from './ContactCard.vue';
import ContactForm from './ContactForm.vue';
import { db } from '../firebase'; 
import type { DocumentData } from "firebase/firestore";
import ContactDetails from './ContactDetails.vue';

type ContactType = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumbers: Array<{ number: string; primary: boolean; type: string }>;
  photo: string;
  primaryPhoneIndex: number;
  salutation: string;
  companyName: string;
};

const selectedContact = ref<ContactType | null>(null);
const contacts = ref<ContactType[]>([]);
const displayForm = ref(false);

const selectContact = (contact: ContactType) => {
  selectedContact.value = contact;
};

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "contacts"));  
  contacts.value = querySnapshot.docs.map(doc => {
    const data = doc.data() as DocumentData;
    return {
      id: doc.id,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumbers: data.phoneNumbers,
      photo: data.photo,
      primaryPhoneIndex: data.primaryPhoneIndex,
      salutation: data.salutation,
      companyName: data.companyName,
    };
  });
});

const toggleFormDisplay = () => {
  displayForm.value = !displayForm.value;
};

</script>

<template>
  <div class="contact-list-wrapper">
    <div class="create-contact-btn-wrapper">
        <button class="create-contact-btn" @click="toggleFormDisplay">Create New Contact</button>
    </div>    

    <div v-if="displayForm">
      <ContactForm />
    </div>

    <div v-if="contacts.length === 0 && !displayForm" class="no-contacts-text">
      Click the button above to create your first contact!
    </div>
    
    <div class="contact-list">
      <ContactCard 
        v-for="(contact, index) in contacts" 
        :key="index"
        :firstName="contact.firstName" 
        :lastName="contact.lastName" 
        :phoneNumbers="contact.phoneNumbers" 
        :photo="contact.photo" 
        :primaryPhoneIndex="contact.primaryPhoneIndex" 
        :salutation="contact.salutation" 
        :companyName="contact.companyName"
        @click="() => selectContact(contact)"
      />
    </div>
  </div>
  <div>
    <ContactDetails :contact="selectedContact" :contacts="contacts" />
  </div>
</template>

<style lang="scss">
  @import '../assets/variables.scss';

  .create-contact-btn-wrapper {
    padding: 0 0 2.25rem;

    .create-contact-btn {
        background: $color-blue;
        color: $color-white;
        font-weight: 700;
        display: inline-block;
        padding: 12px 20px;
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
  
  .contact-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    
    > * {
        width: 100%;
    }

    @media (min-width: 1024px) {
        > * {
            width: calc(50% - 10px);
        }
    }    
  }  

  .contact-wrapper {
    display: flex;
    justify-content: space-between;

    > * {
      width: calc(50% - 20px);
    }
  }

  .no-contacts-text {
    color: $color-white;
    font-weight: 700;
    font-size: 1rem;
    line-height: 1.2;
  }
</style>