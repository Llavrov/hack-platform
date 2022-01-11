<template>
  <div class="pageContentContainer">
    <Xnavbar />
    <div class="horizPad">
      <div />
      <div class="statsRoot pageContentRoot">
        <div class="card">
          <div class="card-body">
            <div>Total users: {{ total }}</div>
            <div>Verified users: {{ verified }}</div>
            <div>Submitted users: {{ submitted }}</div>
          </div>
          <div class="card-body">
            <div>Admitted: {{ admitted }}</div>
            <div>Confirmed (Total): {{ confirmed }}</div>
            <div>Declined: {{ declined }}</div>
            <div>Checked in: {{ checkedIn }}</div>
          </div>
        </div>
        <br />
        <div class="card">
          <div class="card-header">Demographics</div>
          <div class="card-body">
            <div>Total users: {{ total }}</div>
            <div>Female: {{ female }}</div>
            <div>Male: {{ male }}</div>
          </div>
        </div>
      </div>
      <div />
    </div>
    <Xfooter />
  </div>
</template>

<script>
const statsDefault = {
  total: 0,
  verified: 0,
  submitted: 0,
  admitted: 0,
  confirmed: 0,
  declined: 0,
  checkedIn: 0,
  female: 0,
  male: 0,
};
export default {
  name: "Stats",
  data() {
    return {
      ...statsDefault,
    };
  },
  methods: {},
  async mounted() {
    const res = await this.http.get("/users/stats");
    this.admitted = res.admitted;
    this.checkedIn = res.checkedIn;
    this.confirmed = res.confirmed;
    this.declined = res.declined;
    this.submitted = res.submitted;
    this.total = res.total;
    this.verified = res.verified;
    this.female = res.demo.gender.FEMALE || 0;
    this.male = res.demo.gender.MALE || 0;
  },
};
</script>

<style lang="scss"></style>
