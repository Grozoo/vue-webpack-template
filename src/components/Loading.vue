<template>
    <div id="loading">
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script>
export default {
  name: "loading"
};
</script>
<style scoped>
#loading {
  display: flex;
  justify-content: center;
}

#loading > span {
  width: 1em;
  height: 1em;
  background: #42b983;
  border-radius: 50%;
  margin: 1em 0.5em;
  animation: loading 0.4s infinite alternate;
}

#loading > span:nth-child(2) {
  animation-delay: 0.2s;
}

#loading > span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes loading {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0.1;
    transform: translateY(-0.1em);
  }
}
</style>
