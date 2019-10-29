<template>
  <div class="create">
    <div class="columns is-centered">
      <div class="column is-half is-block">
        <h5 class="is-5 title">Topics</h5>
      </div>
    </div>
    <section class="newTopic columns is-centered">
      <div class="column is-half">
        <h5 class="title is-5">New Topic</h5>
        <form v-on:submit.prevent="onSubmitTopic">
          <b-field label="Topic Title">
            <b-input v-model="newTopic.name" />
          </b-field>
          <b-field>
            <div class="control is-block">
              <input type="submit" class="button is-link" value="Submit" />
            </div>
          </b-field>
        </form>
      </div>
    </section>
    <section class="newSubTopic columns is-centered">
      <div class="column is-half">
        <h5 class="title is-5">New SubTopic</h5>
        <form v-on:submit.prevent="onSubmitSubTopic">
          <b-dropdown label="Topic" v-model="newSubTopic.topic">
            <option v-for="topic in topics" v-bind:key="topic.Id">
              {{ topic.content }}
            </option>
          </b-dropdown>
          <b-field label="SubTopic Title">
            <b-input v-model="newSubTopic.title" />
          </b-field>
          <b-field>
            <div class="control is-block">
              <input type="submit" class="button is-link" value="Submit" />
            </div>
          </b-field>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
// import Topic from "@/components/Topic.vue";
export default {
  name: "Topics",
  data: function() {
    return {
      newTopic: {
        name: null
      },
      newSubTopic: {
        topic: null,
        title: null
      }
    };
  },
  computed: {
    topics() {
      return this.$store.state.topics;
    }
  },
  // components: {
  // },
  methods: {
    onSubmitTopic() {
      this.$store.dispatch("addTopic", this.newTopic).then(() => {
        this.newTopic.name = null;
      });
    },
    onSubmitSubTopic() {
      this.$store.dispatch("addSubTopic", this.newSubTopic).then(() => {
        this.newSubTopic.topic = null;
        this.newSubTopic.title = null;
      });
    }
  },
  mounted: function() {
    debugger;
    this.$store.dispatch("loadTopics").catch(() => {
      // if we are not logged in redirect home
      this.$router.push("/");
    });
  }
};
</script>
<style lang="scss" scoped></style>