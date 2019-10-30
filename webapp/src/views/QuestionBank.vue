<template>
  <div class="question-bank">
    <div class="columns is-centered">
      <div class="column is-half is-block">
        <h5 class="is-5 title">My Questions</h5>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-half">
        <template v-for="question in questions">
          <QuestionHolder :key="question.id" :quesiton="question" />
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionHolder from "@/components/QuestionHolder.vue";
export default {
  name: "QuestionBank",
  data: function() {
    /* return {
      newQuesiton: {
        title: null
      }
    }; */
  },
  computed: {
    questions() {
      return this.$store.state.questions;
    }
  },
  components: {
    QuestionHolder
  },
  methods: {
    /* onSubmit() {
      this.$store.dispatch("addToDo", this.newTodo).then(() => {
        this.newTodo.title = null;
      });
    } */
  },
  mounted: function() {
    this.$store.dispatch("loadQuestions").catch(() => {
      // if we are not logged in redirect home
      this.$router.push("/");
    });
  }
};
</script>