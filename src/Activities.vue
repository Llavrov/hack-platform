<template>
  <div class="pageContentContainer">
    <Xnavbar />
    <div class="horizPad">
      <div />
      <div
        class="activitiesRoot pageContentRoot"
        v-if="$root.show?.onlineActivitiesEnabled"
      >
        <h1 v-t="'activities.head'" class="pageHeader" />
        <p class="explText" v-t="`activities.subtext`" />
        <div class="contentCard n1">
          <h2 style="width: 100%; font-weight: 700" class="minipageHeader">
            <span v-t="`activities.1.head.1`" />&nbsp;
            <span v-t="`activities.1.head.2`" style="color: var(--clrprim)" />
          </h2>
          <p class="explText">
            <span v-t="`activities.1.sub.1`" />&nbsp;
            <span style="font-weight: 700"
              >{{ amount }}&nbsp;{{ $t(`activities.1.sub.2`) }}</span
            >
          </p>
          <div class="badged n1" @click="toClipboard(copy1)">
            <div>
              <div v-text="copy1" />
            </div>
            <div class="copyBadge">
              <div class="central">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <XorLined />
          <div class="badged n2" @click="toClipboard(copy2)">
            <div>
              <div v-text="copy2" />
            </div>
            <div class="copyBadge">
              <div class="central">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <p class="explText" v-t="`activities.1.sub.3`" />
        </div>
        <div class="contentCard n2">
          <h2
            style="width: 100%; font-weight: 700"
            class="minipageHeader"
            v-t="`activities.2.head`"
          />
          <p class="explText n1" v-t="`activities.2.sub`" />
          <Xinput
            id="postLink"
            label="activities.2.postLink"
            v-model="postLink"
            :placeholder="$t(`activities.2.postLinkPl`)"
          />
          <div class="fr">
            <div class="f1" />
            <button
              class="btn btn-primary btnLg"
              v-t="`activities.2.action`"
              style="width: 230px; text-align: center"
            />
            <div class="f1" />
          </div>
        </div>
        <div class="contentCard n3">
          <h2
            style="width: 100%; font-weight: 700"
            class="minipageHeader"
            v-t="`activities.3.head`"
          />
          <p class="explText n1" v-t="`activities.3.sub`" />
          <Xinput
            id="code"
            label="activities.3.code"
            v-model="code"
            :placeholder="$t(`activities.3.codePl`)"
          />
          <div class="fr">
            <div class="f1" />
            <button
              class="btn btn-primary btnLg"
              v-t="`activities.3.action`"
              style="width: 230px; text-align: center"
            />
            <div class="f1" />
          </div>
        </div>
      </div>
      <div />
    </div>
    <Xfooter />
  </div>
</template>

<script>
export default {
  name: "Activities",
  data() {
    return {
      copy1: "qwer",
      copy2: "asdf",
      postLink: "",
      code: "",
    };
  },
};
</script>

<style lang="scss">
.activitiesRoot {
  .pageHeader {
    margin-bottom: 25px !important;
  }
  .explText {
    color: #8798ad;
    margin-bottom: 25px;
    width: 100%;
    text-align: center;
  }
  .contentCard {
    max-width: 630px;
    padding: 30px;
    margin-bottom: 40px;
    margin-left: auto;
    margin-right: auto;
    background: var(--bgclr);
    .minipageHeader {
      margin-bottom: 22px !important;
    }
    .explText.n1 {
      margin-bottom: 32px;
    }
    .badged.n1 {
      margin-bottom: 27px;
    }
    .badged.n2 {
      margin-bottom: 32px;
    }
    .xInRoot {
      margin-bottom: 40px;
    }
  }
}
</style>
