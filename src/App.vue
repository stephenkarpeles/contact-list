<script setup lang="ts">
import ContactCard from './components/ContactCard.vue'
</script>

<template>
  <header class="header">
    <div class="container">
      Contact List App
    </div>
  </header>  

  <main>
    <section>
      <div class="container">
        <div class="contact-wrapper">
          <ContactCard />
        </div>
      </div>
    </section>
  </main>
  
</template>

<style lang="scss">
  @import './assets/variables.scss';

  main {
    background-color: $color-aqua;
    min-height: 100vh;
  }
  .contact-wrapper {
    width: 50%;
  }
</style>
