<template>
  <div class="container">
    <!--    <div class="box" :style="{ opacity: 0 }">-->
    <div ref="box" class="box" :style="{ transform: 'scale(0.4)' }">
      I will fade in!
    </div>
  </div>
</template>
<script>
import {animate} from "motion"

export default {
  name: "Animation",
  mounted() {
    this.startRotating();
  },
  methods: {
    async startRotating() {
      let currentRotation = 0;
      const box = this.$refs.box;

      while (true) {
        currentRotation += 90;
        if (currentRotation >= 360) currentRotation = 0;

        await animate(box, { rotate: currentRotation }, { type: "spring", stiffness: 300, duration: 0.8 });

        // 增加 500 毫秒延迟
      }
    }
  }
};
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.box {
  width: 200px;
  height: 200px;
  background-color: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  border-radius: 8px;
  transition: opacity 1s;
}
</style>