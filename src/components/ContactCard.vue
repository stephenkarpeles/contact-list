<script setup lang="ts">
  const emit = defineEmits();

  const handleClick = () => {
    emit('click');
  };

  const defaultPhoto = '/placeholder.jpg';

  const { firstName, lastName, phoneNumbers, photo, companyName, primaryPhoneIndex = 0, salutation } = defineProps<{
    firstName: string;
    lastName: string;
    phoneNumbers: Array<{ number: string, primary: boolean, type: string }>;
    photo: string;
    primaryPhoneIndex: number;
    salutation: string;
    companyName: string;
  }>();

  const getPrimaryPhoneNumber = () => {
    if (phoneNumbers && phoneNumbers[primaryPhoneIndex ?? 0]) {
      return phoneNumbers[primaryPhoneIndex ?? 0].number;
    }
    return 'Phone number not available';
  };
</script>

<template>
  <div class="contact-card" @click="handleClick">
    <div class="contact-card__image">
      <img :src="defaultPhoto" :alt="`${firstName} ${lastName}`" />
    </div>
    <div class="contact-card__content">
      <div class="contact-card__name">{{ salutation }} {{ firstName }} {{ lastName }}</div>
      <div class="contact-card__phone">
        {{ getPrimaryPhoneNumber() }}
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import '../assets/variables.scss';

  .contact-card {
    margin-bottom: 1rem;
    border-radius: $border-radius-sm;
    box-shadow: $box-shadow-2;
    background-color: $color-white;
    cursor: pointer;
    transition: .2s ease all;

    &:hover {
      opacity: .8;
      transition: .2s ease all;
    }

    &__content {
      padding: .75rem 1rem;
    }

    &__name {
      font-weight: 700;
      padding: 0 0 .25rem;
      font-size: 1rem;
    }

    &__phone {
      padding: 0 0 .25rem;
      font-size: 1rem;
    }

    &__image {
      img {
        width: 100%;
        border-radius: $border-radius-sm $border-radius-sm 0 0 ;
      }
    }
  }
</style>