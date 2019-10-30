<template>
  <div class="question-bank">
    <div class="columns is-centered">
      <div class="column is-half is-block">
        <h5 class="is-5 title">My Questions</h5>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-half">
        <b-table :data="data" :columns="columns" />
      </div>
    </div>
  </div>
</template>

<script>
/* import QuestionHolder from "@/components/QuestionHolder.vue"; */
export default {
  name: "QuestionBank",
  data: function() {
    return {
      data: [
        { id: 1, content: "Wow", topic: "Topic1", subtopic: "Subtopic1" },
        { id: 2, content: "Check", topic: "Topic1", subtopic: "Subtopic2" },
        { id: 3, content: "Out", topic: "Topic1", subtopic: "Subtopic3" },
        { id: 4, content: "These", topic: "Topic1", subtopic: "Subtopic4" },
        { id: 5, content: "Questions", topic: "Topic1", subtopic: "Subtopic5" }
      ],
      columns: [
        {
          field: "id",
          label: "ID",
          numeric: true,
          searchable: true
        },
        {
          field: "content",
          label: "Content",
          searchable: true
        },
        {
          field: "topic",
          label: "Topic",
          searchable: true
        },
        {
          field: "subtopic",
          label: "Subtopic",
          searchable: true
        }
      ]
    };
  },
  computed: {
    questions() {
      return this.$store.state.questions;
    }
  },
  components: {
    /* QuestionHolder */
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
