<template>
  <div>
    <front-header v-if="navsel === 'front'" />
    <back-header v-if="navsel==='back'" />
  </div>
</template>
<script>
import FrontHeader from "@/components/FrontHeader";
import BackHeader from "@/components/BackHeader";
export default {
  props: ["navsel"],
  components: {
    FrontHeader,
    BackHeader
  }
};
</script>