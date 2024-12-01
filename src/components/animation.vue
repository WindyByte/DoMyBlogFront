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
    // this.$nextTick(() => {
    //   // startRotating.call(this);
    // });
    // this.$nextTick(() => {
    //   animate(
    //       this.$refs.box,
    //       {rotate: [0, 90, 180, 270, 360]}, // 从 0 旋转到 360 度
    //       {
    //         // duration: 4,       // 单次动画持续时间（秒）
    //         repeat: Infinity,  // 无限重复
    //         easing: "linear",  // 使用线性插值保证平滑旋转
    //         type: "spring",
    //         stiffness: 300,
    //       }
    //   );
    // });
    // 确保 DOM 元素加载完毕后执行动画
    // animate(".box", { opacity: 1 }, { duration: 5 });
    // animate(
    //     this.$refs.box,
    //     { scale: [0.4, 1] },
    //     { ease: "circInOut", duration: 1.2 }
    // );
    // animate(
    //     this.$refs.box,
    //     { rotate: 90 },
    //     { type: "spring", stiffness: 300 }
    // );
  },
  methods: {
    async startRotating() {
      let currentRotation = 0; // 初始角度
      const box = this.$refs.box;

      while (true) {
        // 每次增加 90 度
        currentRotation += 90;
        if (currentRotation >= 360) currentRotation = 0; // 重置为 0

        // 执行动画并等待完成
        await animate(
            box,
            { rotate: currentRotation }, // 设置目标旋转角度
            {
              type: "spring",       // 使用弹簧动画
              stiffness: 300,       // 弹性强度
              duration: 0.8,        // 每次动画持续时间
            }
        );
      }
    }
  }
};

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