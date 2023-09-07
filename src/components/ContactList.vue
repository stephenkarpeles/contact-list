<script setup lang="ts">
import ContactCard from './ContactCard.vue'
</script>

<template>
  <div class="contact-list">
    <ContactCard />
    <ContactCard />
    <ContactCard />
    <ContactCard />
    <ContactCard />
  </div>
</template>

<style lang="scss">
  @import '../assets/variables.scss';
  
  .contact-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    > * {
        width: calc(50% - 10px);
    }
  }
  
</style>