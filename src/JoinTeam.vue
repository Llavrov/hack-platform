<template>
  <div></div>
</template>

<script>
export default {
  async beforeMount() {
    const params = new URLSearchParams(window.location.search);
    if (params.get("code")) {
      await this.http.post(
        `/teams/${params.get("code")}/addMember/${this.$root.user.id}`
      );
      await this.$root.updateUser();
      this.$router.push("/teams/3");
    }
  },
};
</script>
