<script setup>

</script>

<template>
  <div style="max-width: 720px; margin: 2rem; padding: 1rem;">
    <header style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <h1 style="font-size: 20px; margin: 0;">Ecom1</h1>
    </header>
  </div>
  
  <router-view></router-view>
</template>

<style>
button{
  padding: .5rem .1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  background: #fff;
}
input{
  padding: .6rem .7rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100%;
}
label{
  display: block;
  margin: .5rem 0 .25rem;
  font-weight: 600;
}
.form-card{
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 1rem;
}
.row{
  display: grid;
  gap: .75rem;
}

</style>
