<template>
  <section class="view task-detail">
    <p>
      <label>Title:</label>
      <input ref="title" v-model="title" autofocus="autofocus" autocomplete="off"
        placeholder="What needs to be done?" @keypress.enter="$refs['detail'].focus()">
    </p>
    <p>
      <label>Detail:</label>
      <textarea ref="detail" v-model="detail" placeholder="How will you complete it?" @keypress.enter="saveTask" />
    </p>
    <p>Task saved at {{ timeText }}</p>
    <button @click="saveTask">
      Save
    </button>
  </section>
</template>

<script>
export default {
  name: 'TaskDetail',

  data () {
    return {
      title: null,
      detail: null,
      time: null
    }
  },

  computed: {
    timeText () {
      return (new Date(this.time)).toDateString()
    }
  },

  mounted () {
    // mock retrieving data from backend
    setTimeout(() => {
      this.title = 'Fack task title'
      this.detail = 'Eat drink drunk sleep...'
      this.time = (new Date()).getTime()
    }, 1000)
  },

  methods: {
    saveTask () {
      // mock submit request to backend
      setTimeout(() => {
        this.time = (new Date()).getTime()
        this.$ipc.send('task-saved', {
          title: this.title,
          detail: this.detail,
          time: this.time
        })
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.task-detail {
  width: 550px;
  background: #ffffff;
  margin: map-get($task-detail-margins, $platform);
  padding: 16px 32px;
  position: relative;
  text-align: left;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2), 0 25px 50px 0 rgba(0, 0, 0, .1);

  &:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 50px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, .2);
  }

  p {
    padding: 8px;
  }

  label {
    display: inline-block;
    width: 64px;
    padding: 10px 4px;
    vertical-align: top;
    font: 700 18px Arial;
  }

  input,
  textarea {
    padding: 12px;
    width: 400px;
    border: none;
    background: rgba(0, 0, 0, .003);
    box-shadow: 0 0 2px rgba(0, 0, 0, .3);
    font: 400 16px Arial;
  }

  button {
    margin: 20px auto 0;
    display: block;
    width: 128px;
    height: 48px;
    cursor: pointer;
    border-style: none;
    background-color: transparent !important;
    position: relative;
    outline: 0;
    font-size: 16px;
  }
}
</style>
