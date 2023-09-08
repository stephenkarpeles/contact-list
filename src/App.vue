<script setup lang="ts">
import ContactList from './components/ContactList.vue'
</script>

<template>
  <header class="header">
    <div class="container">
      Ye Olde Contact List App
    </div>
  </header>  

  <main>
    <section>
      <div class="container">
        <div class="contact-wrapper">
          <ContactList/>
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
</style>
