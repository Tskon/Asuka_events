<template>
  <div>
    <h2>Турнирная таблица</h2>
    <div class="table-wrapper">
      <div class="semi-final-1">1</div>
      <div class="semi-final-2">2</div>
      <div class="semi-final-3">3</div>
      <div class="semi-final-4">4</div>
      <div class="final-1">final1</div>
      <div class="final-2">final2</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .table-wrapper {
    display: grid;
    grid-template-areas:
    'semi-final-1 . . semi-final-3'
    '. final-1 final-2 .'
    'semi-final-2 . . semi-final-4'
    ;
  }
  .semi-final-1 {
    grid-area: semi-final-1;
  }
  .semi-final-2 {
    grid-area: semi-final-2;
  }
  .semi-final-3 {
    grid-area: semi-final-3;
  }
  .semi-final-4 {
    grid-area: semi-final-4;
  }
  .final-1 {
    grid-area: final-1;
  }
  .final-2 {
    grid-area: final-2;
  }
</style>