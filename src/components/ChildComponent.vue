<template>
    <div>
      <h2>Child Component</h2>
      <slot name="head"></slot>
      <slot>default slot</slot>
      <slot name="foot"></slot>
    </div>
  </template>

<script>
  export default {
    beforeDestroy() {
      console.log('beforedestroy');
    },
    destroy() {
      console.log('destroy');
    },
    props: {
      title: {
        type: String,
      }
    }
  }
  </script>
