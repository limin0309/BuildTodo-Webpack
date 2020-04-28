<template>
  <div class="helper">
    <span class="left">{{unFinishTodoLength}} items left</span>
    <span class="tabs">
      <span
        v-for="state in states"
        :key="state"
        :class="[state,filter === state?'actived':'']"
        @click="toggleFilter(state)"
      >{{state}}</span>
    </span>
    <span class="clear" @click="clearAllCompleted">clear AllCompleted</span>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      required: true
    },
    todos: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      states: ["all", "active", "completed"]
    };
  },
  computed: {
    unFinishTodoLength() {
      return this.todos.filter(todo => !todo.completed).length;
    }
  },
  methods: {
    toggleFilter: function() {
        this.$emit('toggle',state)
    },
    clearAllCompleted: function() {
        this.$emit('clearAllCompleted')
    }
  }
};
</script>
