<template>
  <div class="data-loading-error">
    <svg :width="svgWidth" :height="svgHeight" viewBox="0 0 20 20" focusable="false" class="ux-notification__icon ng-star-inserted" aria-hidden="true">
      <path d="M10 1.5C5.30558 1.5 1.5 5.30558 1.5 10C1.5 14.6944 5.30558 18.5 10 18.5C14.6944 18.5 18.5 14.6944 18.5 10C18.5 5.30558 14.6944 1.5 10 1.5ZM9.25 6.25C9.25 5.83579 9.58579 5.5 10 5.5C10.4142 5.5 10.75 5.83579 10.75 6.25V10.75C10.75 11.1642 10.4142 11.5 10 11.5C9.58579 11.5 9.25 11.1642 9.25 10.75V6.25ZM9.09998 13.9C9.09998 13.4029 9.50292 13 9.99998 13C10.497 13 10.9 13.4029 10.9 13.9C10.9 14.3971 10.497 14.8 9.99998 14.8C9.50292 14.8 9.09998 14.3971 9.09998 13.9Z"
            :style="{ 'fill': svgColor || '#ff5260' }"
      ></path>
    </svg>
    <span v-if="!noMessage">Ooooops! Something went wrong...</span>
  </div>

</template>

<script>
export default {
  name: 'DataLoadingError',
  props: ['svgWidth', 'svgHeight', 'svgColor', 'noMessage'],
};
</script>

<style scoped>
.data-loading-error {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
</style>
