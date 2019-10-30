<template>
  <div class="create">
    <!-- <div class="columns is-centered">
      <div class="column is-half is-block">
        <h5 class="is-5 title">Topics</h5>
      </div>
    </div> -->
    <section class="newTopic columns is-centered">
      <div class="column is-half">
        <h5 class="title is-5">Create New Topic</h5>
        <form v-on:submit.prevent="onSubmitTopic">
          <span class="has-text-danger" v-if="error">Topic already exists.</span>
          <b-field label="Topic Title">
            <b-input v-model="newTopic.name" placeholder="Ex: Integration" />
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
        <h5 class="title is-5">Create New SubTopic</h5>
        <form v-on:submit.prevent="onSubmitSubTopic">
          <b-dropdown label="Topic" v-model="newSubTopic.topic">
            <option v-for="topic in topics" v-bind:key="topic.Id">
              {{ topic.content }}
            </option>
          </b-dropdown>
          <b-field label="SubTopic Title">
            <b-input v-model="newSubTopic.title" placeholder="Ex: By Parts"/>
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
      this.newTopic.name = this.newTopic.name.toLowerCase();
      this.$store.dispatch("addTopic", this.newTopic).then(
        () => {
          this.newTopic.name = null;
          this.error = false;
        },
        () => {
          this.newTopic.name = null;
          this.error = true;
        }
      );
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