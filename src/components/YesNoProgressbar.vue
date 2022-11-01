<template>
  <div>
    <span>{{ title }}</span>
    <div class="progress">
      <div :class="['progress-bar', 'w-100', get01ProgressBackgroundClassName()]" role="progressbar" :aria-valuenow=1 :aria-valuemin=0 :aria-valuemax=1>{{ getYesNoText() }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'YesNoProgressbar',
  props: {
    title: String,
    currentValue: Number,
  },
  methods: {
    get01ProgressBackgroundClassName(){
      switch(this.currentValue)
      {
        case 0:
            return "bg-dark";
        default:
            return "bg-success";
      }
    },
    getYesNoText() {
      return this.currentValue ? "YES" : "NO";
    },
  }
}
</script>