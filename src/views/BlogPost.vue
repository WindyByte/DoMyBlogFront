<template>
  <div class="response">
    <h2>Response Details</h2>
    <div>
      <strong>Result:</strong> {{ post }}
    </div>
    <div>
      <strong>Code:</strong> {{ post.code }}
    </div>
    <div>
      <strong>Message:</strong> {{ post.message }}
    </div>
    <div>
      <strong>Data:</strong> {{ post.data }}
    </div>
  </div>
</template>

<style>
.response {
  padding: 1em;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.response div {
  margin-bottom: 0.5em;
}
</style>

<script>
export default {
  data() {
    return {
      post: {},
    };
  },
  async created() {
    try {
      const response = await fetch('http://127.0.0.1:8080/api/v1/blog/ping');

      console.log("Raw Response:", response);
      // const result = await response.json();
      const text = await response.text();
      // 防止解析空内容导致报错
      const result = text ? JSON.parse(text) : { code: -1, message: "Empty response", data: null };
      console.log("Parsed JSON:", result);
      this.post = result;
      console.log("Fetched data:", result);
    } catch (error) {
      this.post = { code: -1, message: "Error occurred", data: "xxx" };
      console.error("Fetch error:", error);
    }
  },
};
</script>
