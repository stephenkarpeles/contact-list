<script setup lang="ts">
 import { db } from '../firebase'; 
 import { getFirestore, collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
 import { ref } from 'vue';
 import type { Ref } from 'vue';


    let editableContact: Ref<Contact> = ref({
    id: '',
    firstName: '',
    lastName: '',
    phoneNumbers: [],
    photo: '',
    primaryPhoneIndex: 0,
    salutation: '',
    companyName: '',
    });
    
 let isEditing = ref(false);

 const emit = defineEmits();

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

 interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumbers: Array<{ number: string; primary: boolean; type: string }>;
  photo: string;
  primaryPhoneIndex: number;
  salutation: string;
  companyName: string;
}

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
    contacts: ContactType[];
  }>();

  const getPhoneNumberColor = (type: string) => {
    if (type === 'work') return 'phone-work';
    if (type === 'cell') return 'phone-cell';
    if (type === 'home') return 'phone-home';
    return '';
  }

  const toggleEdit = () => {
    isEditing.value = !isEditing.value;

    if (contact) {
        editableContact.value = { ...contact };
    }
};

const cancelEdit = () => {
    if (contact) {
        editableContact.value = { ...contact };
    }
    isEditing.value = false;
};

async function updateContact() {
  if (!editableContact.value || !editableContact.value.id) {
    console.error('Cannot update a null contact');
    return;
  }

  try {
    const contactId = editableContact.value.id;
    const contactRef = doc(db, 'contacts', contactId);
    await updateDoc(contactRef, { ...editableContact.value });
    console.log('Contact updated successfully');
    isEditing.value = false;
  } catch (error) {
    console.error('Error updating contact', error);
  }
}

  async function deleteContact(contactId: string) {
    try {
        const contactDoc = doc(db, 'contacts', contactId);
        await deleteDoc(contactDoc);
        window.location.reload();  
    } catch (e) {
        console.error('Error deleting document', e);
    }
    }

</script>

<template>
    <div class="contact-details-wrapper" v-if="contacts.length > 0">
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
            <div class="edit-btn-wrapper">
                <button v-if="!isEditing" class="edit-btn" @click="toggleEdit">Edit Contact</button>
                <button v-if="isEditing" class="save-btn" @click="updateContact">Save</button>
                <button v-if="isEditing" class="cancel-btn" @click="cancelEdit">Cancel</button>
            </div>
            <div class="edit-inputs-block" v-if="isEditing">
                <input v-model="editableContact.firstName" placeholder="First Name" />
                <input v-model="editableContact.lastName" placeholder="Last Name" />
                <input v-model="editableContact.companyName" placeholder="Company Name" />
                <input v-model="editableContact.salutation" placeholder="Salutation" />
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

    .edit-inputs-block {
        input {
            width: 100%;
            padding: 6px 12px;
            border-radius: $border-radius-sm;
            font-family: $font-sans-serif;
            border: 1px solid $color-light-gray;
            display: block;
            margin-bottom: 4px;
        }
    }

</style>
