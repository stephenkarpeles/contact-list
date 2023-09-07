<script setup lang="ts">
</script>

<template>
  <div class="contact-card">
    <div class="contact-card__image">
      <img src="https://media.istockphoto.com/id/1171169127/photo/headshot-of-cheerful-handsome-man-with-trendy-haircut-and-eyeglasses-isolated-on-gray.jpg?s=612x612&w=0&k=20&c=yqAKmCqnpP_T8M8I5VTKxecri1xutkXH7zfybnwVWPQ=" alt="">
    </div>
    <div class="contact-card__name">First Last</div>
    <div class="contact-card__phone">888.999.0988</div>
  </div>
</template>

<style lang="scss">
  @import '../assets/variables.scss';

  .contact-card {
    border: 1px solid $color-border-gray;
    padding: 1.25rem;
    border-radius: $border-radius-sm;
    box-shadow: $box-shadow-2;
    background-color: $color-white;;

    &__name {
      font-weight: 700;
      padding: .5rem 0 .25rem;
      font-size: 1rem;
    }

    &__phone {
      padding: 0 0 .25rem;
      font-size: 1rem;
    }

    &__image {
      img {
        width: 100%;
      }
    }
  }
</style>