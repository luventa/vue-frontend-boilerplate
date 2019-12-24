<template>
  <section class="view text-center task-list">
    <h1 class="title">
      Task List
    </h1>
    <div class="content">
      <p>
        <label>Title:</label>
        <input ref="title" v-model="newTask.title" autofocus="autofocus" autocomplete="off"
          placeholder="What needs to be done?" @keypress.enter="$refs['detail'].focus()">
      </p>
      <p>
        <label>Detail:</label>
        <textarea ref="detail" v-model="newTask.detail" placeholder="How will you complete it?" @keypress.enter="addTask" />
      </p>
      <hr>
      <ul class="tasks">
        <li v-for="(task, index) in tasks" :key="index">
          <span>{{ task.title }}</span>
          <RouteButton type="window" :to="getDetailDest(task)" class="is-pulled-right">
            Detail
          </RouteButton>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import RouteButton from '@comp/widgets/RouteButton'

export default {
  name: 'TaskList',

  components: {
    RouteButton
  },

  data () {
    return {
      newTask: {
        title: null,
        detail: null
      },
      tasks: []
    }
  },

  mounted () {
    this.$ipc.on('refresh-task-list', this.refreshList)
  },

  methods: {
    refreshList (key, value) {
      console.log(key, value)
    },
    addTask (e) {
      if (!this.newTask.title) {
        this.$refs.title.focus()
        return
      }

      this.tasks.push({
        ...this.newTask,
        time: (new Date()).getTime()
      })
      this.$refs.title.focus()
      this.clearNewTask()
    },
    clearNewTask () {
      this.newTask.title = null
      this.newTask.detail = null
    },
    getDetailDest (task) {
      const dest = {
        name: 'TaskDetail',
        params: { id: task.time }
      }

      if (this._isElectron) {
        dest.window = {
          category: 'TaskDetail',
          options: { width: 550, height: 400, frame: false }
        }
      }

      return dest
    }
  }
}
</script>

<style lang="scss" scoped>
.task-list {

  > .title {
    font-size: 32px;
    color: lighten(map-get($demo-colors, $platform), 20%);
  }

  > .content {
    width: 550px;
    background: #ffffff;
    margin: 20px auto;
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
      box-shadow: 0 1px 1px rgba(0, 0, 0, .2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, .2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, .2);
    }

    hr {
      margin: 16px 0;
      color: grey;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2), 0 25px 50px 0 rgba(0, 0, 0, .1);
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

    ul {
      margin: 0;
      padding: 0;
      list-style: none;

      > li {
        padding: 8px;
        position: relative;
        font-size: 24px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, .2), 0 0 40px rgba(0, 0, 0, .04) inset;

        > span {
          display: inline-block;
          width: 400px;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        &:not(:last-child) {
          margin-bottom: 12px;
        }
      }
    }
  }
}
</style>
