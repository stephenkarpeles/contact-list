<script setup lang="ts">
 import { db } from '../firebase'; 
 import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
 const emit = defineEmits();

  const { contact } = defineProps<{
    contact: {
      id: string;
      firstName: string;
      lastName: string;
      phoneNumbers: Array<{ number: string, primary: boolean, type: string }>;
      photo: string;
      primaryPhoneIndex: number;
      salutation: string;
      companyName: string;
    } | null;
  }>();

  const getPhoneNumberColor = (type: string) => {
    if (type === 'work') return 'phone-work';
    if (type === 'cell') return 'phone-cell';
    if (type === 'home') return 'phone-home';
    return '';
  }

  async function deleteContact(contactId: string) {
  console.log('Contact ID:', contactId);
  try {
      const contactDoc = doc(db, 'contacts', contactId);
      await deleteDoc(contactDoc);
      console.log('Document deleted');
      window.location.reload();  
  } catch (e) {
      console.error('Error deleting document', e);
  }
}

</script>

<template>
    <div class="contact-details-wrapper">
        <div v-if="contact" class="contact-details">
            <h2>Contact Details</h2>
            <div>
                <strong>Name:</strong> {{ contact?.salutation }} {{ contact?.firstName }} {{ contact?.lastName }}
            </div>
            <ul>
                <li v-for="(phone, index) in contact?.phoneNumbers" :key="index" :class="getPhoneNumberColor(phone.type)">
                    <strong>Phone:</strong> {{ phone.number }}
                </li>
            </ul>
            <div>
                <strong>Company Name:</strong> {{ contact?.companyName }}
            </div>
            <div class="delete-btn-wrapper">
                <button class="delete-btn" @click="deleteContact(contact.id)">Delete Contact</button>
            </div>
        </div>
        <div v-else>
            <p>No contact selected. Please click on a contact to view details.</p>
        </div>
    </div>
</template>

<style lang="scss">
  @import '../assets/variables.scss';

    .contact-details-wrapper {
        margin-top: 5rem;
        background-color: $color-white-translucent-alt;
        padding: 1.5rem;
        border-radius: $border-radius-sm;
        box-shadow: $box-shadow-2;
    }

    h2 {
        padding-bottom: 1.25rem;
        line-height: 1.2;
    }

    .phone-work,
    .phone-cell,
    .phone-home {
        padding: 4px 8px;
        border-radius: $border-radius-sm;
    }

    .phone-work {
        background-color: $color-blue;
        color: $color-white;
    }

    .phone-cell {
        background-color: $color-pink;
        color: $color-white;
    }

    .phone-home {
        background-color: $color-purple;
        color: $color-white;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    li {
        list-style-type: none;
        margin-bottom: 4px;
        margin-right: 4px;
        display: inline-block;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .contact-details {
        ul,
        div {
            padding-bottom: 1.25rem;
        }
    }

    .delete-btn {
        border: none;
        background-color: $color-main-gray;
        color: $color-white;
        display: inline-block;
        padding: 6px 12px;
        font-family: $font-sans-serif;
        border-radius: $border-radius-sm;
        text-align: right;
        cursor: pointer;
        font-size: .8rem;
    }

    div.delete-btn-wrapper {
        margin-bottom: 0;
        padding-bottom: .5rem;
        margin-top: 1.5rem;
        padding-top: 1.5rem;
        border-top: 1px solid $color-mid-gray;
    }


</style>
