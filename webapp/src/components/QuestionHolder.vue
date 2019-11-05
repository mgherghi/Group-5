<template>
  <div class="question columns">
    <p>Question</p>
    <!-- <b-checkbox v-model="todo.done" v-on:input="handleCheck" />
    <span class="question-title column">{{ question.title }}</span>
    <b-button v-on:click="handleDelete">Delete</b-button> -->
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
  methods: {
    /* handleCheck: function(value) {
      this.$store.dispatch("updateTodo", { ...this.todo, done: value });
    },
    handleDelete: function() {
      this.$store.dispatch("deleteTodo", this.todo);
    } */
  }
};
</script>