<template>
  <div>
    <span>{{ title }}</span>
    <div class="progress">
      <div :class="['progress-bar', getProgressBackgroundClassName()]" :aria-valuenow=currentValue :aria-valuemin=0 :aria-valuemax=5 :aria-label="currentValue" :style="`width: ${getPercentage()}%`">{{ currentValue }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultipleValueProgressbar',
  props: {
    title: String,
    currentValue: Number,
    maxValue: Number,
  },
  methods: {
    getProgressBackgroundClassName(){
        switch(this.currentValue)
        {
          case 0:
          case 1:
              return "bg-danger";
          case 2:
              return "bg-warning";
          case 3:
              return "bg-info";
          case 4:
              return "bg-primary";
          default:
              return "bg-success";
        }
    },
    getPercentage() {
      return this.currentValue * 100 / this.maxValue;
    },
  }
}
</script>