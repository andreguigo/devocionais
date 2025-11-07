<template>
  <div class="loader-container">
    <div class="custom-loader"></div>
  </div>
</template>

<script>
export default {
  name: 'CustomLoader'
}
</script>

<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em 0;
}
.custom-loader {
  width:35px;
  height:35px;
  color: #fef3c6;
  --c:linear-gradient(currentColor 0 0);
  background:
    var(--c) 0 0,
    var(--c) 100% 0,
    var(--c) 100% 100%,
    var(--c) 0 100%;
  background-repeat: no-repeat;
  animation: 
    l2-1 4s infinite,
    l2-2 4s infinite;
}
@keyframes l2-1 {
  0%   {background-size: 0    4px,4px 0   ,0    4px,4px 0   }
  12.5%{background-size: 100% 4px,4px 0   ,0    4px,4px 0   }
  25%  {background-size: 100% 4px,4px 100%,0    4px,4px 0   }
  37.5%{background-size: 100% 4px,4px 100%,100% 4px,4px 0   }
  45%,
  55%  {background-size: 100% 4px,4px 100%,100% 4px,4px 100%}
  62.5%{background-size: 0    4px,4px 100%,100% 4px,4px 100%}
  75%  {background-size: 0    4px,4px 0   ,100% 4px,4px 100%}
  87.5%{background-size: 0    4px,4px 0   ,0    4px,4px 100%}
  100% {background-size: 0    4px,4px 0   ,0    4px,4px 0   }
}
@keyframes l2-2 {
  0%,49.9%{background-position: 0 0   ,100% 0   ,100% 100%,0 100%}
  50%,100%{background-position: 100% 0,100% 100%,0    100%,0 0   }
}
</style>