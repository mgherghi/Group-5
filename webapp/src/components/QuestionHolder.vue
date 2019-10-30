<template>
  <div class="question columns">
    <span class="question-content">
      {{ question.content }}
    </span>
  </div>
</template>

<script>
export default {
  name: "QuestionHolder",
  props: {
    question: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {}
};
</script>